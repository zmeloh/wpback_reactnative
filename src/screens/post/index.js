// Dans PostScreen.js

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Title, Card, Divider, Button, IconButton } from 'react-native-paper';
import axios from 'axios';
import HTML from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';

const API_BASE_URL = 'https://sportpassioninfo.com/wp-json/wp/v2/posts/';

const PostScreen = ({ route }) => {
  const { articleId } = route.params;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}${articleId}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'article :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        {/* Vous pouvez ajouter ici un composant de chargement ou une animation */}
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {article && (
        <Card>
          <Card.Cover source={{ uri: article.jetpack_featured_media_url }} style={styles.coverImage} />
          <Card.Content>
            <Title>{article.title.rendered}</Title>
            <Divider style={styles.divider} />
            <HTML source={{ html: article.content.rendered }} />
            <Divider style={styles.divider} />
            <View style={styles.dateContainer}>
              <IconButton
                icon="arrow-left"
                size={20}
                onPress={() => navigation.goBack()}
              />
              <Button
                icon="calendar"
                labelStyle={{ marginLeft: 10 }}
                onPress={() => {}}
              >
                {new Date(article.date).toLocaleDateString()}
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    height: 200, // Ajustez la hauteur de l'image de couverture selon vos besoins
  },
  divider: {
    marginVertical: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default PostScreen;
