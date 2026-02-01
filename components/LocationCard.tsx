import { Colors } from '@/constants/Colors';
import { DiningLocation } from '@/data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LocationCardProps {
    location: DiningLocation;
}

export function LocationCard({ location }: LocationCardProps) {
    return (
        <Link href={`/location/${location.id}` as any} asChild>
            <TouchableOpacity style={styles.card} activeOpacity={0.8}>
                <Image source={{ uri: location.image }} style={styles.image} contentFit="cover" />
                <View style={styles.overlay}>
                    <View style={styles.header}>
                        <Text style={styles.name}>{location.name}</Text>
                        <View style={[styles.badge, location.isOpen ? styles.openBadge : styles.closedBadge]}>
                            <Text style={styles.badgeText}>{location.isOpen ? 'Open' : 'Closed'}</Text>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.infoRow}>
                            <Ionicons name="time-outline" size={16} color="white" />
                            <Text style={styles.infoText}>{location.waitTime} min wait</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="people-outline" size={16} color="white" />
                            <Text style={styles.infoText}>{location.crowdLevel}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: Colors.light.card,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    name: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
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
    footer: {
        flexDirection: 'row',
        gap: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    infoText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});
