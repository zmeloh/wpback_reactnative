// HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import AppBar from '../../components/appbar';

const API_URL = 'https://sportpassioninfo.com/wp-json/wp/v2/posts?per_page=12';

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await axios.get(API_URL);
        setArticles(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des articles :', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

    loadArticles();
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const navigateToPost = (postId) => {
    navigation.navigate('Post', { articleId: postId }); // Utilisez "articleId" au lieu de "postId"
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

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderArticle}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          style={styles.flatList}
        />
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
});

export default HomeScreen;
