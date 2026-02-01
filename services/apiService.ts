import Constants from 'expo-constants';

// Get backend URL from environment variables
const BACKEND_URL = Constants.expoConfig?.extra?.BACKEND_URL || "https://0dc051accb2b26f7-128-54-151-89.serveousercontent.com";

// TypeScript interfaces for API responses
export interface Recommendation {
    name: string;
    match_percentage: number;
    image_url: string;
    category: string;
    description: string;
    confidence: 'high' | 'medium' | 'low';
    tags: string[];
}

export interface RecommendationsResponse {
    success: boolean;
    recommendations: Recommendation[];
    count: number;
}

export interface Dislike {
    name: string;
    frequency: number;
    last_seen: string;
    category: string;
}

export interface DislikesResponse {
    success: boolean;
    dislikes: Dislike[];
    count: number;
}

/**
 * Fetch personalized food recommendations for a user
 * @param userId - The user's unique identifier
 * @param limit - Optional limit on number of recommendations (default: 10)
 * @returns Promise with recommendations data
 */
export async function getRecommendations(
    userId: string,
    limit: number = 10
): Promise<RecommendationsResponse> {
    try {
        const url = `${BACKEND_URL}/api/user/${userId}/recommendations`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
}

/**
 * Fetch list of foods the user dislikes based on waste patterns
 * @param userId - The user's unique identifier
 * @returns Promise with dislikes data
 */
export async function getDislikes(userId: string): Promise<DislikesResponse> {
    try {
        const url = `${BACKEND_URL}/api/user/${userId}/dislikes`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dislikes:', error);
        throw error;
    }
}
