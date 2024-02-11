import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { List } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const CommunityScreen = () => {
  const [expanded1, setExpanded1] = useState(true);
  const [expanded2, setExpanded2] = useState(true);
  const [expanded3, setExpanded3] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);

  const handlePress1 = () => setExpanded1(!expanded1);
  const handlePress2 = () => setExpanded2(!expanded2);
  const handlePress3 = () => setExpanded3(!expanded3);

  const handleLoadEnd1 = () => setLoading1(false);
  const handleLoadEnd2 = () => setLoading2(false);
  const handleLoadEnd3 = () => setLoading3(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section /*title="Accordions"*/ style={{ width: '100%' }}>
          {/* Accordion 1 */}
          <List.Accordion
            title="Facebook Community"
            left={props => <List.Icon {...props} icon="facebook" />}
            expanded={expanded1}
            onPress={handlePress1}
            style={styles.accordion}>
            <TouchableOpacity onPress={() => console.log('Facebook Webview clicked')}>
              {loading1 && <ActivityIndicator style={styles.loader} size="large" />}
              <WebView
                source={{ uri: 'https://www.facebook.com/sportpassioninfo/' }}
                style={styles.webview}
                onLoadEnd={handleLoadEnd1}
              />
            </TouchableOpacity>
          </List.Accordion>

          {/* Accordion 2 */}
          <List.Accordion
            title="Instagram Community"
            left={props => <List.Icon {...props} icon="instagram" />}
            expanded={expanded2}
            onPress={handlePress2}
            style={styles.accordion}>
            <TouchableOpacity onPress={() => console.log('Instagram Webview clicked')}>
              {loading2 && <ActivityIndicator style={styles.loader} size="large" />}
              <WebView
                source={{ uri: 'https://www.instagram.com/sportpassioninfo_' }}
                style={styles.webview}
                onLoadEnd={handleLoadEnd2}
              />
            </TouchableOpacity>
          </List.Accordion>

          {/* Accordion 3 */}
          <List.Accordion
            title="Twitter Community"
            left={props => <List.Icon {...props} icon="twitter" />}
            expanded={expanded3}
            onPress={handlePress3}
            style={styles.accordion}>
            <TouchableOpacity onPress={() => console.log('Twitter Webview clicked')}>
              {loading3 && <ActivityIndicator style={styles.loader} size="large" />}
              <WebView
                source={{ uri: 'https://twitter.com/sportspassioni1' }}
                style={styles.webview}
                onLoadEnd={handleLoadEnd3}
              />
            </TouchableOpacity>
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accordion: {
    alignSelf: 'stretch',
  },
  webview: {
    flex: 1,
    height: 800, // Set the height as per your requirement
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)', // Adjust the background color and opacity
  },
});

export default CommunityScreen;
