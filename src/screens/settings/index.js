import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Card, Title } from 'react-native-paper';

const SettingsScreen = () => {
    // Données des cartes
    const cardData = [
        { title: 'Share', subtitle: 'Share your app', icon: 'share-variant' },
        { title: 'Info', subtitle: 'App information', icon: 'information' },
        { title: 'Contact Us', subtitle: 'Get in touch with us', icon: 'email' },
    ];

    const settingsData = [
        { title: 'Notifications', icon: 'bell' },
        { title: 'Language', icon: 'earth' },
    ];

    const accountData = [
        { title: 'Account', icon: 'account' },
    ];

    // Fonction à exécuter lorsqu'une carte est cliquée
    const handleCardClick = (index, section) => {
        console.log(`Card ${index + 1} in ${section} clicked`);
        // Ajoutez ici le code à exécuter lorsqu'une carte est cliquée
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
        width: '100%', // Occupera toute la largeur disponible
        marginBottom: 16, // Espacement entre les cartes
    },
});

export default SettingsScreen;
