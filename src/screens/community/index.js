import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { List } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const CommunityScreen = () => {
  const [loading, setLoading] = useState([true, true, true]);

  const handleLoadEnd = (index) => {
    setLoading((prevLoading) => {
      const updatedLoading = [...prevLoading];
      updatedLoading[index] = false;
      return updatedLoading;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {[
          {
            title: 'Facebook Community',
            uri: 'https://www.facebook.com/sportpassioninfo/',
            icon: 'facebook',
          },
          {
            title: 'Instagram Community',
            uri: 'https://www.instagram.com/sportpassioninfo_',
            icon: 'instagram',
          },
          {
            title: 'Twitter Community',
            uri: 'https://twitter.com/sportspassioni1',
            icon: 'twitter',
          },
        ].map((community, index) => (
          <List.Accordion
            key={index}
            title={community.title}
            left={(props) => <List.Icon {...props} icon={community.icon} />}
          >
            <View style={{ flex: 1, height: 800 }}>
              {loading[index] && <ActivityIndicator style={styles.loader} size="large" />}
              {!loading[index] && (
                <WebView
                  source={{ uri: community.uri }}
                  style={{ flex: 1 }}
                  onLoadEnd={() => handleLoadEnd(index)}
                />
              )}
            </View>
          </List.Accordion>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
});

export default CommunityScreen;
