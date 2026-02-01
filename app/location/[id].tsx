import { MenuItem } from '@/components/MenuItem';
import { Colors } from '@/constants/Colors';
import { useDining } from '@/context/DiningContext';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LocationDetailsScreen() {
    const { id } = useLocalSearchParams();
    const { locations } = useDining();
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const location = locations.find(loc => loc.id === id);

    if (!location) {
        return (
            <View style={styles.center}>
                <Text>Location not found</Text>
            </View>
        );
    }

    const filters = ['Vegan', 'Vegetarian', 'Gluten-Free'];

    // Filter menu items
    const filteredMenu = location.menu.filter(item => {
        if (!activeFilter) return true;
        // In a real app we'd need stronger typing here or check if tags exist
        return item.dietaryTags.includes(activeFilter as any);
    });

    // Group menu by station
    const sections = Object.values(filteredMenu.reduce((acc, item) => {
        if (!acc[item.station]) {
            acc[item.station] = { title: item.station, data: [] };
        }
        acc[item.station].data.push(item);
        return acc;
    }, {} as Record<string, { title: string, data: typeof location.menu }>));

    return (
        <>
            <Stack.Screen options={{ headerBackTitle: 'Home', title: location.name }} />
            <ScrollView style={styles.container} stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
                <View style={styles.hero}>
                    <Image source={{ uri: location.image }} style={styles.image} />
                    <View style={styles.overlay}>
                        <View style={styles.statusContainer}>
                            <View style={[styles.badge, location.isOpen ? styles.openBadge : styles.closedBadge]}>
                                <Text style={styles.badgeText}>{location.isOpen ? 'Open' : 'Closed'}</Text>
                            </View>
                            <Text style={styles.hoursText}>Closes at {location.closingTime}</Text>
                        </View>
                        <Text style={styles.title}>{location.name}</Text>
                    </View>
                </View>

                <View style={styles.filterBar}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                        <TouchableOpacity
                            style={[styles.filterChip, activeFilter === null && styles.activeChip]}
                            onPress={() => setActiveFilter(null)}
                        >
                            <Text style={[styles.filterText, activeFilter === null && styles.activeFilterText]}>All</Text>
                        </TouchableOpacity>
                        {filters.map(filter => (
                            <TouchableOpacity
                                key={filter}
                                style={[styles.filterChip, activeFilter === filter && styles.activeChip]}
                                onPress={() => setActiveFilter(activeFilter === filter ? null : filter)}
                            >
                                <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>{filter}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.infoBar}>
                    <Text style={styles.menuTitle}>Today's Menu</Text>
                    <View style={styles.crowdIndicator}>
                        <Ionicons name="people" size={16} color={Colors.light.textSecondary} />
                        <Text style={styles.crowdText}>{location.crowdLevel} ({location.waitTime}m wait)</Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    {sections.map(section => (
                        <View key={section.title} style={styles.section}>
                            <Text style={styles.sectionHeader}>{section.title}</Text>
                            {section.data.map(item => (
                                <MenuItem key={item.id} item={item} />
                            ))}
                        </View>
                    ))}
                    {sections.length === 0 && (
                        <View style={styles.emptyMenu}>
                            <Text style={styles.emptyMenuText}>No items match your filter.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hero: {
        height: 250,
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 8,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    openBadge: {
        backgroundColor: Colors.light.success,
    },
    closedBadge: {
        backgroundColor: Colors.light.danger,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    hoursText: {
        color: 'white',
        fontWeight: '600',
    },
    filterBar: {
        backgroundColor: Colors.light.background,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 12,
    },
    filterScroll: {
        paddingHorizontal: 16,
        gap: 10,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    activeChip: {
        backgroundColor: Colors.light.primary,
        borderColor: Colors.light.primary,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.textSecondary,
    },
    activeFilterText: {
        color: 'white',
    },
    infoBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.light.background,
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    crowdIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#eee',
    },
    crowdText: {
        fontSize: 14,
        color: Colors.light.textSecondary,
    },
    menuContainer: {
        paddingBottom: 40,
    },
    section: {
        marginBottom: 0,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.primary,
        backgroundColor: '#eee',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    emptyMenu: {
        padding: 40,
        alignItems: 'center',
    },
    emptyMenuText: {
        color: Colors.light.textSecondary,
        fontSize: 16,
    }
});
