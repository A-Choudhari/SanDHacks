import { useDining } from '@/context/DiningContext';
import { getRecommendations, Recommendation } from '@/services/apiService';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RecommendationsScreen() {
    const { userId } = useDining();
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchRecommendations = async () => {
        try {
            setError(null);
            const response = await getRecommendations(userId, 10);
            if (response.success) {
                setRecommendations(response.recommendations);
            } else {
                setError('Failed to load professional selection.');
            }
        } catch (err: any) {
            setError(err.message || 'Unable to connect to analytics server.');
            console.error('[Recommendations] Error:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, [userId]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchRecommendations();
    };

    return (
        <View style={styles.mainContainer}>
            <Stack.Screen options={{
                title: 'Recommendations',
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
                    <Text style={styles.title}>Nutritional Insights</Text>
                    <Text style={styles.subtitle}>Data-driven recommendations optimized for your preferences.</Text>
                </View>

                {loading ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="small" color="#000000" />
                        <Text style={styles.loadingText}>Analyzing preferences...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.centerContainer}>
                        <Ionicons name="alert-circle-outline" size={32} color="#000000" />
                        <Text style={styles.errorText}>{error}</Text>
                        <Text style={styles.errorHint}>Please ensure your network is stable and backend is accessible.</Text>
                    </View>
                ) : recommendations.length === 0 ? (
                    <View style={styles.centerContainer}>
                        <Ionicons name="stats-chart-outline" size={32} color="#888888" />
                        <Text style={styles.emptyText}>Insufficient Data</Text>
                        <Text style={styles.emptyHint}>Continue tracking your meals to generate personalized insights.</Text>
                    </View>
                ) : (
                    <View style={styles.list}>
                        {recommendations.map((item, index) => (
                            <View key={index} style={styles.premiumCard}>
                                <View style={styles.cardHeader}>
                                    <View>
                                        <Text style={styles.locationText}>{item.category.toUpperCase()}</Text>
                                        <Text style={styles.categoryText}>Optimized Choice</Text>
                                    </View>
                                    <View style={styles.matchBadge}>
                                        <Text style={styles.matchText}>{Math.round(item.match_percentage)}% Match</Text>
                                    </View>
                                </View>

                                <View style={styles.imageContainer}>
                                    {item.image_url ? (
                                        <Image
                                            source={{ uri: item.image_url }}
                                            style={styles.foodImage}
                                            resizeMode="cover"
                                            loadingIndicatorSource={require('@/assets/images/icon.png')} // Fallback indicator
                                        />
                                    ) : (
                                        <View style={[styles.foodImage, { justifyContent: 'center', alignItems: 'center' }]}>
                                            <Ionicons name="image-outline" size={48} color="#EEEEEE" />
                                        </View>
                                    )}
                                </View>

                                <View style={styles.cardContent}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.descriptionText}>{item.description}</Text>
                                    <View style={styles.insightRow}>
                                        {item.tags && item.tags.slice(0, 2).map((tag, i) => (
                                            <View key={i} style={styles.tagBadge}>
                                                <Text style={styles.tagText}>{tag.toUpperCase()}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Optimized based on CleanPlate Analytics</Text>
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
        backgroundColor: '#F8F9FA',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#000000',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666666',
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
    errorHint: {
        marginTop: 8,
        fontSize: 12,
        color: '#888888',
        textAlign: 'center',
        lineHeight: 18,
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
        gap: 24,
    },
    premiumCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 16,
    },
    locationText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#888888',
        letterSpacing: 1,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333333',
        marginTop: 2,
    },
    matchBadge: {
        backgroundColor: '#000000',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    matchText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    foodImage: {
        width: '100%',
        height: 180,
        backgroundColor: '#F8F9FA',
    },
    cardContent: {
        padding: 16,
    },
    itemName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 14,
        color: '#444444',
        lineHeight: 20,
        marginBottom: 12,
    },
    insightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    tagBadge: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 2,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#666666',
        letterSpacing: 0.5,
    },
    footer: {
        padding: 40,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#AAAAAA',
        letterSpacing: 0.5,
    }
});
