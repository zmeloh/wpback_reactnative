import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Searchbar, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (searchQuery.trim() !== '') {
          const response = await fetch(`https://sportpassioninfo.com/wp-json/wp/v2/posts?search=${searchQuery}`);
          const data = await response.json();
          setSearchResults(data);
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
          ListEmptyComponent={
            <Card style={styles.resultCard}>
              <Card.Content>
                <Title>Search results</Title>
                <Paragraph>No results found.</Paragraph>
              </Card.Content>
            </Card>
          }
        />
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
  resultCard: {
    marginTop: 16,
  },
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

export default SearchScreen;
