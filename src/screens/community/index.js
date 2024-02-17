import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const CommunityScreen = () => {
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
          {
            title: 'TikTok Community',
            uri: 'https://www.tiktok.com/@sportpassioninfo',
            icon: 'video', // Assurez-vous que votre bibliothèque d'icônes prend en charge TikTok ou utilisez une icône générique
          },
        ].map((community, index) => (
          <List.Accordion
            key={index}
            title={community.title}
            left={(props) => <List.Icon {...props} icon={community.icon} />}
          >
            <View style={{ flex: 1, height: 500 }}>
              <WebView
                source={{ uri: community.uri }}
                style={{ flex: 1, height: 500 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={false}
                scalesPageToFit={false}
                bounces={false} // Cette ligne corrige le problème de défilement sur Android
              />
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
});

export default CommunityScreen;
