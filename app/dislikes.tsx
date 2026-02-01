import { useDining } from '@/context/DiningContext';
import { Dislike, getDislikes } from '@/services/apiService';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DislikesScreen() {
    const { userId } = useDining();
    const [dislikes, setDislikes] = useState<Dislike[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDislikes = async () => {
        try {
            setError(null);
            const response = await getDislikes(userId);
            if (response.success) {
                setDislikes(response.dislikes);
            } else {
                setError('Failed to retrieve preference data.');
            }
        } catch (err: any) {
            setError(err.message || 'Unable to analyze preferences.');
            console.error('[Dislikes] Error:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchDislikes();
    }, [userId]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchDislikes();
    };

    return (
        <View style={styles.mainContainer}>
            <Stack.Screen options={{
                title: 'Preference Analysis',
                headerBackTitle: 'Home',
                headerStyle: { backgroundColor: '#FFFFFF' },
                headerTintColor: '#000000',
                headerTitleStyle: { fontWeight: '600' }
            }} />
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#000000" />
                }
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Avoidance Trends</Text>
                    <Text style={styles.subtitle}>Items identified with high waste probability or low satisfaction.</Text>
                </View>

                {loading ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="small" color="#000000" />
                        <Text style={styles.loadingText}>Compiling trends...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.centerContainer}>
                        <Ionicons name="alert-circle-outline" size={32} color="#000000" />
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : dislikes.length === 0 ? (
                    <View style={styles.centerContainer}>
                        <Ionicons name="shield-checkmark-outline" size={32} color="#888888" />
                        <Text style={styles.emptyText}>Zero Negative Trends</Text>
                        <Text style={styles.emptyHint}>Preferences appear to be well-aligned with selection history.</Text>
                    </View>
                ) : (
                    <View style={styles.list}>
                        {dislikes.map((item, index) => (
                            <View key={index} style={styles.professionalItem}>
                                <View style={styles.iconBox}>
                                    <Ionicons name="remove-circle-outline" size={24} color="#000000" />
                                </View>
                                <View style={styles.content}>
                                    <View style={styles.topRow}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <View style={styles.freqBadge}>
                                            <Text style={styles.freqText}>{item.frequency}x WASTE</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.categoryText}>{item.category.toUpperCase()}</Text>
                                    <Text style={styles.reasonText}>Frequently discarded in recent meal analysis.</Text>
                                    {item.last_seen && (
                                        <Text style={styles.dateText}>Last identified: {new Date(item.last_seen).toLocaleDateString()}</Text>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                <View style={styles.infoBox}>
                    <Ionicons name="information-circle-outline" size={18} color="#666666" />
                    <Text style={styles.infoText}>
                        These items are prioritized for exclusion from your daily recommendations to minimize resource waste.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
    },
    header: {
        padding: 24,
        backgroundColor: '#000000',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: '#AAAAAA',
        marginTop: 4,
        lineHeight: 20,
    },
    centerContainer: {
        padding: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#666666',
        fontWeight: '500',
    },
    errorText: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
    },
    emptyText: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
    },
    emptyHint: {
        marginTop: 8,
        fontSize: 12,
        color: '#888888',
        textAlign: 'center',
    },
    list: {
        padding: 20,
        gap: 12,
    },
    professionalItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        gap: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
        flexShrink: 1,
        marginRight: 8,
    },
    freqBadge: {
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    freqText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#666666',
    },
    categoryText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#999999',
        letterSpacing: 0.5,
        marginTop: 2,
    },
    reasonText: {
        fontSize: 14,
        color: '#444444',
        marginTop: 8,
        lineHeight: 18,
    },
    dateText: {
        fontSize: 12,
        color: '#AAAAAA',
        marginTop: 12,
        fontStyle: 'italic',
    },
    infoBox: {
        margin: 20,
        padding: 16,
        backgroundColor: '#F9F9F9',
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: '#666666',
        lineHeight: 18,
    }
});
