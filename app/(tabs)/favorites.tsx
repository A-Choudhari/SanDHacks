import { Colors } from '@/constants/Colors';
import { useDining } from '@/context/DiningContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
    const { favorites, locations } = useDining();
    const insets = useSafeAreaInsets();

    // Helper to find item details
    const favoriteItems = locations.flatMap(loc => loc.menu).filter(item => favorites.includes(item.id));

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.title}>Favorites</Text>
            </View>

            {favoriteItems.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="heart-outline" size={64} color={Colors.light.textSecondary} />
                    <Text style={styles.emptyText}>No favorites yet!</Text>
                    <Text style={styles.emptySubText}>Star items from the menu to see them here.</Text>
                </View>
            ) : (
                <FlatList
                    data={favoriteItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemRow}>
                            <View>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                            </View>
                            <Ionicons name="heart" size={24} color={Colors.light.danger} />
                        </View>
                    )}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginTop: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.textSecondary,
        marginTop: 16,
    },
    emptySubText: {
        fontSize: 16,
        color: Colors.light.textSecondary,
        textAlign: 'center',
        marginTop: 8,
    },
    listContent: {
        padding: 20,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        marginBottom: 12,
        borderRadius: 8,
        elevation: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    itemPrice: {
        fontSize: 14,
        color: Colors.light.textSecondary,
        marginTop: 4,
    },
});
