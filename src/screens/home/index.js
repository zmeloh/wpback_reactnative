import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Text, FAB, Button } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'https://sportpassioninfo.com/wp-json/wp/v2';

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const loadArticles = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`, {
        params: {
          per_page: 12,
          page: currentPage,
          categories: selectedCategoryId,
        },
      });

      if (currentPage === 1) {
        setArticles(response.data);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...response.data]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des articles :', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [refreshing, currentPage, selectedCategoryId]);

  const loadCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories :', error);
    }
  }, []);

  useEffect(() => {
    loadArticles();
    loadCategories();
  }, [loadArticles, loadCategories]);

  const onRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
  };

  const navigateToPost = (postId) => {
    navigation.navigate('Post', { articleId: postId });
  };

  const handleCategoryPress = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(1);
  };

  const renderArticle = ({ item }) => {
    const coverImage = item.jetpack_featured_media_url;
    const formattedDate = new Date(item.date).toLocaleDateString();

    return (
      <TouchableOpacity onPress={() => navigateToPost(item.id)}>
        <Card style={styles.card}>
          {coverImage && <Card.Cover style={styles.cardCover} source={{ uri: coverImage }} />}
          <Card.Content>
            <Title>{item.title.rendered}</Title>
            <Paragraph>Date: {formattedDate}</Paragraph>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleScrollToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const flatListRef = React.createRef();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScrollView}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategoryId === category.id && styles.selectedCategoryItem,
            ]}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategoryId === category.id && styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={articles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderArticle}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={styles.flatList}
            // Pagination
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
          />

          <FAB
            style={styles.fab}
            icon="arrow-up"
            onPress={handleScrollToTop}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  flatList: {
    padding: 8,
  },
  card: {
    marginBottom: 16,
  },
  cardCover: {
    flex: 1,
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  categoryScrollView: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  categoryItem: {
    backgroundColor: '#DDDDDD90',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 16

  },
  categoryText: {
    color: '#333333',
    fontWeight: 'bold',
    lineHeight: 36,
    paddingBottom: 5
  },
  selectedCategoryItem: {
    backgroundColor: '#333333',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
});

export default HomeScreen;