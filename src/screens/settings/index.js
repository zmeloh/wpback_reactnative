import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Avatar, Card, Title, Button, Portal, Dialog, FAB } from 'react-native-paper';
import { Share } from 'react-native';
import { WebView } from 'react-native-webview';


const SettingsScreen = () => {
  const [aboutUsVisible, setAboutUsVisible] = useState(false);

  const cardData = [
    // { title: 'Info', subtitle: 'App information', icon: 'information', onPress: handleInfoPress },
    { title: 'Contact Us', subtitle: 'Get in touch with us', icon: 'email', onPress: handleContactUsPress },
  ];

  const settingsData = [
    { title: 'Notifications', icon: 'bell', onPress: handleSettingsPress },
    { title: 'Language', icon: 'earth', onPress: handleSettingsPress },
  ];

  const accountData = [
    { title: 'Account', icon: 'account', onPress: handleAccountPress },
  ];

  const handleCardClick = (index, section) => {
    const card = getCardData(section)[index];
    if (card.onPress) {
      card.onPress();
    }
  };

  const handleSharePress = async () => {
    try {
      await Share.share({
        message: 'Check out this awesome app!',
        url: 'https://sportpassioninfo.com',  // Replace with your app link
      });
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  const handleContactUsPress = () => {
    console.log('Opening Contact Us link');
    // Ouvrir le lien externe dans un navigateur
    const contactUsUrl = 'https://sportpassioninfo.com/contact/';
    Linking.openURL(contactUsUrl).catch((err) => console.error('Error opening link:', err));
  };

  const handleSettingsPress = () => {
    // Ajoutez ici le code pour gérer les paramètres de l'application
    console.log('Settings pressed');
  };

  const handleAccountPress = () => {
    // Ajoutez ici le code pour gérer le compte utilisateur
    console.log('Account pressed');
  };

  const getCardData = (section) => {
    switch (section) {
      case 'Settings':
        return settingsData;
      case 'Account':
        return accountData;
      default:
        return cardData;
    }
  };

  const openAboutUsDialog = () => {
    setAboutUsVisible(true);
  };

  const closeAboutUsDialog = () => {
    setAboutUsVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Account</Title>
          {accountData.map((data, index) => (
            <TouchableOpacity key={index} onPress={() => handleCardClick(index, 'Account')}>
              <Card style={styles.card}>
                <Card.Title
                  title={data.title}
                  left={(props) => <Avatar.Icon {...props} icon={data.icon} />}
                />
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Settings</Title>
          {settingsData.map((data, index) => (
            <TouchableOpacity key={index} onPress={() => handleCardClick(index, 'Settings')}>
              <Card style={styles.card}>
                <Card.Title
                  title={data.title}
                  left={(props) => <Avatar.Icon {...props} icon={data.icon} />}
                />
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Title style={styles.sectionTitle}>General</Title>
          {cardData.map((data, index) => (
            <TouchableOpacity key={index} onPress={() => handleCardClick(index, 'General')}>
              <Card style={styles.card}>
                <Card.Title
                  title={data.title}
                  subtitle={data.subtitle}
                  left={(props) => <Avatar.Icon {...props} icon={data.icon} />}
                />
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Share Dialog */}
      <Portal>
        <Dialog visible={aboutUsVisible} onDismiss={closeAboutUsDialog}>
          <Dialog.Title>About Us</Dialog.Title>
          <Dialog.Content>
            <WebView source={{ uri: 'https://sportpassioninfo.com/qui-sommes-nous/' }} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeAboutUsDialog}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Share FAB */}
      <FAB
        style={styles.fab}
        icon="share-variant"
        onPress={handleSharePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    width: '100%',
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default SettingsScreen;
