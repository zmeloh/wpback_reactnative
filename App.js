import React from 'react';
import { StyleSheet } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import AppNavigator from './src/components/navigator/navigator';

export default function Main() {
  const theme = useTheme();

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}
