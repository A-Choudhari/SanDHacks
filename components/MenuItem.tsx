import { Colors } from '@/constants/Colors';
import { useDining } from '@/context/DiningContext';
import { MenuItem as MenuItemType } from '@/data/mockData';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MenuItemProps {
    item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
    const { toggleFavorite, isFavorite } = useDining();
    const favorite = isFavorite(item.id);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name}>{item.name}</Text>
                    <TouchableOpacity onPress={() => toggleFavorite(item.id)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons
                            name={favorite ? "heart" : "heart-outline"}
                            size={24}
                            color={favorite ? Colors.light.danger : Colors.light.textSecondary}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

                <View style={styles.footer}>
                    <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                    <View style={styles.tags}>
                        {item.dietaryTags.map(tag => (
                            <View key={tag} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <Text style={styles.calories}>{item.calories} cal</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    content: {
        gap: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.light.text,
        flex: 1,
        marginRight: 10,
    },
    description: {
        fontSize: 14,
        color: Colors.light.textSecondary,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
    tags: {
        flexDirection: 'row',
        gap: 8,
    },
    tag: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    tagText: {
        fontSize: 12,
        color: '#2E7D32',
        fontWeight: '500',
    },
    calories: {
        fontSize: 12,
        color: Colors.light.textSecondary,
    }
});
