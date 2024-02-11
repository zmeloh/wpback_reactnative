import * as React from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';
import HomeScreen from '../../screens/home';
import SearchScreen from '../../screens/search';
import CommunityScreen from '../../screens/community';
import SettingsScreen from '../../screens/settings';
import PostScreen from '../../screens/post';

const BottomNavigator = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'search', title: 'Search', focusedIcon: 'magnify' },
    { key: 'community', title: 'Community', focusedIcon: 'link' },
    { key: 'setting', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <HomeScreen theme={useTheme()} navigation={navigation} />,
    search: () => <SearchScreen theme={useTheme()} navigation={navigation} />,
    community: () => <CommunityScreen theme={useTheme()} navigation={navigation} />,
    setting: () => <SettingsScreen theme={useTheme()} navigation={navigation} />,
    post: () => <PostScreen theme={useTheme()} navigation={navigation} />,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavigator;
