import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import BottomNavigator from './src/components/navigationbottom';
import AppBar from './src/components/appbar';
import React, { useState } from 'react';
import { blueTheme } from './src/styles';
import { NavigationContainer } from '@react-navigation/native';
import DrawerApp from './src/components/drawer';

import AppNavigator from './src/components/navigator/navigator';

export default function Main() {
  const theme = useTheme();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <PaperProvider theme={blueTheme}>
      <AppNavigator />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white', // Définissez la couleur de fond si nécessaire
  },
});
