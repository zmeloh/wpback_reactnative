// AppBar.js
import React from 'react';
import { Appbar, useTheme, Text } from 'react-native-paper';

const AppBar = ({ openDrawer }) => {
  const theme = useTheme();

  return (
    <Appbar.Header theme={theme}>
      <Appbar.Action icon="view-grid" onPress={openDrawer} />
      <Appbar.Content
        title={<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sport Passion Info</Text>}
      />
    </Appbar.Header>
  );
};

export default AppBar;
