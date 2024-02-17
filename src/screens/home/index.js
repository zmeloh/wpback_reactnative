import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Text, FAB, Button } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'https://sportpassioninfo.com/wp-json/wp/v2/posts';

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const loadArticles = useCallback(async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          per_page: 12,
          page: currentPage,
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
  }, [refreshing, currentPage]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const onRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
  };

  const navigateToPost = (postId) => {
    navigation.navigate('Post', { articleId: postId });
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
});

export default HomeScreen;