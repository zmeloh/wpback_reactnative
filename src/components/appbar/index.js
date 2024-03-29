import React from 'react';
import { Appbar, useTheme, Text } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';

const AppBar = () => {
  const theme = useTheme();

  return (
    <Appbar.Header theme={theme} style={styles.appbar}>
      <Appbar.Content
        titleStyle={styles.titleContainer}
        title={
          <React.Fragment>
            <Image source={require('../../../assets/logo-spi.png')} style={styles.logo} />
          </React.Fragment>
        }
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appbar: {
    padding: 10,
    elevation: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Assure le centrage vertical
    flex: 1, // Assure que le titre et le logo occupent tout l'espace horizontal
  },
  logo: {
    width: 48,
    height: 48,
    position: 'absolute', 
    left: '50%', 
    bottom:-24,
    marginLeft: -24, 
  },
  title: {
    color: '#00008B',
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AppBar;
