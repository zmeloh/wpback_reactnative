import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Title, Card, Divider, Button, IconButton, Paragraph, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import HTML from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';

const API_BASE_URL = 'https://sportpassioninfo.com/wp-json/wp/v2/posts/';
const API_RELATED_URL = 'https://sportpassioninfo.com/wp-json/wp/v2/posts?per_page=5&categories=';

const PostScreen = ({ route }) => {
  const { articleId } = route.params;
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const scrollViewRef = useRef();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}${articleId}`);
        setArticle(response.data);

        // Appel à la fonction pour récupérer les articles associés
        fetchRelatedArticles(response.data.categories);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'article :', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedArticles = async (categories) => {
      try {
        const response = await axios.get(`${API_RELATED_URL}${categories[0]}`);
        setRelatedArticles(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des articles associés :', error);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleShareArticle = () => {
    if (article) {
      Share.share({
        title: article.title.rendered,
        message: article.link,
      })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      {article && (
        <Card style={styles.mainCard}>
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
              {/* Bouton de partage */}
              <IconButton
                icon="share"
                size={20}
                onPress={handleShareArticle}
              />
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Section "Articles associés" */}
      <View style={styles.relatedArticlesContainer}>
        <Title>Related Post</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {relatedArticles.map((relatedArticle) => (
            <TouchableOpacity
              key={relatedArticle.id}
              onPress={() => {
                navigation.navigate('Post', { articleId: relatedArticle.id });
                // Ajout de la fonction pour faire remonter vers le haut de la page
                scrollViewRef.current?.scrollTo({ y: 0, animated: true });
              }}
            >
              <Card style={[styles.relatedArticleCard, { width: 250, margin: 10 }]}>
                <Card.Cover source={{ uri: relatedArticle.jetpack_featured_media_url }} style={styles.relatedArticleCover} />
                <Card.Content>
                  <Paragraph numberOfLines={2}>{relatedArticle.title.rendered.substring(0, 150)}...</Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bouton pour remonter en haut de la page */}
      <Button
        icon="arrow-up"
        style={styles.scrollToTopButton}
        onPress={() => {
          scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }}
      >
        Remonter en haut
      </Button>
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
  mainCard: {
    marginBottom: 20,
  },
  coverImage: {
    height: 200,
  },
  divider: {
    marginVertical: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  relatedArticlesContainer: {
    marginTop: 20,
  },
  relatedArticleCard: {
    marginRight: 10,
    width: 180,
  },
  relatedArticleCover: {
    height: 200,
    marginBottom: 10,
  },
  scrollToTopButton: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default PostScreen;
