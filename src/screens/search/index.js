import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Searchbar, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (searchQuery.trim() !== '') {
          const response = await fetch(`https://sportpassioninfo.com/wp-json/wp/v2/posts?search=${searchQuery}`);
          const data = await response.json();
          setSearchResults(data);

          // Ajouter la recherche à l'historique
          addToSearchHistory(searchQuery);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    // Récupérer l'historique de recherche au chargement de la page
    getSearchHistory();
  }, []);

  const addToSearchHistory = async (query) => {
    try {
      const history = [...searchHistory];
      if (!history.includes(query)) {
        history.unshift(query);
        // Limiter la taille de l'historique (facultatif)
        if (history.length > 10) {
          history.pop();
        }
        setSearchHistory(history);
        // Stocker l'historique dans AsyncStorage
        await AsyncStorage.setItem('@searchHistory', JSON.stringify(history));
      }
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const getSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('@searchHistory');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error getting search history:', error);
    }
  };

  const removeFromSearchHistory = async (query) => {
    try {
      const history = searchHistory.filter(item => item !== query);
      setSearchHistory(history);
      await AsyncStorage.setItem('@searchHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error removing from search history:', error);
    }
  };

  const onChangeSearch = (query) => setSearchQuery(query);

  const navigateToArticle = (articleId) => {
    navigation.navigate('Post', { articleId });
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          {searchResults.length > 0 && (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const coverImage = item.jetpack_featured_media_url;
                const formattedDate = new Date(item.date).toLocaleDateString();

                return (
                  <TouchableOpacity onPress={() => navigateToArticle(item.id)}>
                    <Card style={styles.card}>
                      {coverImage && <Card.Cover style={styles.cardCover} source={{ uri: coverImage }} />}
                      <Card.Content>
                        <Title>{item.title.rendered}</Title>
                        <Paragraph>Date: {formattedDate}</Paragraph>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                );
              }}
            />
          )}

          {/* Historique de recherche */}
          {searchResults.length === 0 && (
            <View style={styles.historyContainer}>
              <Title>Search History</Title>
              <FlatList
                data={searchHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Card style={styles.historyCard}>
                    <Card.Content>
                      <Title>{item}</Title>
                      <IconButton
                        icon="delete"
                        size={20}
                        color="#000"
                        onPress={() => removeFromSearchHistory(item)}
                        style={styles.deleteHistoryButton}
                      />
                    </Card.Content>
                  </Card>
                )}
                ListEmptyComponent={<Paragraph>No search history.</Paragraph>}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  historyContainer: {
    marginTop: 16,
  },
  historyCard: {
    marginBottom: 8,
  },
  deleteHistoryButton: {
    position: 'absolute',
    right: 0,
  },
});

export default SearchScreen;
