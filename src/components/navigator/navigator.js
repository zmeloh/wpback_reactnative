import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PostScreen from '../../screens/post';
import AppBar from '../../components/appbar';
import BottomNavigator from '../../components/navigationbottom';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
    <AppBar/>
      <Stack.Navigator
        screenOptions={{
          
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigator;

