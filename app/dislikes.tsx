import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DislikesScreen() {
    const dislikedItems = [
        { id: '1', name: 'Steak', category: 'Protein' },
        { id: '2', name: 'Rice', category: 'Grains' },
        { id: '3', name: 'Mushrooms', category: 'Vegetables' },
        { id: '4', name: 'Mayonnaise', category: 'Condiments' },
    ];

    return (
        <>
            <Stack.Screen options={{ title: 'Dislikes', headerBackTitle: 'Home' }} />
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Your Dislikes</Text>
                    <Text style={styles.subtitle}>We'll use this to filter your recommendations.</Text>
                </View>
                <View style={styles.list}>
                    {dislikedItems.map((item) => (
                        <View key={item.id} style={styles.itemCard}>
                            <View style={styles.leftSection}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="ban-outline" size={20} color="#FF3B30" />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemCategory}>{item.category}</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name="close-circle-outline" size={24} color={Colors.light.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
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
        gap: 12,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF0F0', // Light red background
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    itemCategory: {
        fontSize: 12,
        color: Colors.light.textSecondary,
    },
});
