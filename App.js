import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Text } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import BottomNavigator from './src/components/navigationbottom';
import AppBar from './src/components/appbar';
import { blueTheme } from './src/styles';
import { NavigationContainer } from '@react-navigation/native';
import DrawerApp from './src/components/drawer';
import AppNavigator from './src/components/navigator/navigator';

export default function Main() {
  const [isAppReady, setAppReady] = useState(false);
  const theme = useTheme();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  // Simulate an asynchronous operation, e.g., fetching your logo
  const loadAssetsAsync = async () => {
    // You may replace the require statement with the actual path to your logo
    await require('./assets/logo-spi.png');

    // Additional async operations if needed

    return Promise.resolve();
  };

  useEffect(() => {
    const loadData = async () => {
      await loadAssetsAsync();
      setAppReady(true);
    };

    loadData();
  }, []);

  if (!isAppReady) {
    return (
      <View style={styles.loadingContainer}>
        {/* Replace Image with Text for testing */}
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <PaperProvider theme={blueTheme}>
      <AppNavigator />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Set the background color if necessary
  },
  logo: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
  },
});
