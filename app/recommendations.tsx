import { MenuItem } from '@/components/MenuItem';
import { Colors } from '@/constants/Colors';
import { MOCK_LOCATIONS } from '@/data/mockData';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RecommendationsScreen() {
    const recommendedItems = [
        { ...MOCK_LOCATIONS[0].menu[0], locationName: '64 Degrees' },
        { ...MOCK_LOCATIONS[1].menu[0], locationName: 'Pines' },
        { ...MOCK_LOCATIONS[5].menu[0], locationName: 'Sixth College' },
    ];

    return (
        <>
            <Stack.Screen options={{ title: 'Recommendations', headerBackTitle: 'Home' }} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Recommended for You</Text>
                    <Text style={styles.subtitle}>Based on your recent orders.</Text>
                </View>
                <View style={styles.list}>
                    {recommendedItems.map((item, index) => (
                        <View key={index} style={styles.recommendationCard}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.locationTag}>{item.locationName}</Text>
                                <Text style={styles.matchTag}>9{8 - index}% Match</Text>
                            </View>
                            <MenuItem item={item} />
                        </View>
                    ))}
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.light.textSecondary,
    },
    list: {
        gap: 16,
    },
    recommendationCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 4,
    },
    locationTag: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Colors.light.textSecondary,
        textTransform: 'uppercase',
    },
    matchTag: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
});
