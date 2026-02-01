
// Get backend URL from environment variables
const BACKEND_URL = "https://7a87a294961a47fa-128-54-132-165.serveousercontent.com";

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
        console.log('[API] Fetching recommendations:', url);
        const response = await fetch(url);

        const contentType = response.headers.get("content-type");
        if (!response.ok) {
            const errorText = await response.text();
            console.error('[API] Error Response:', errorText);
            throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
        }

        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            console.error('[API] Expected JSON but received:', contentType);
            if (text.includes("serveo")) {
                throw new Error("Tunnel Interstitial: Please visit the backend URL in a browser first.");
            }
            throw new Error("Invalid response format from server.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[API] Fetch error (Recommendations):', error);
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
        console.log('[API] Fetching dislikes:', url);
        const response = await fetch(url);

        const contentType = response.headers.get("content-type");
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
        }

        if (!contentType || !contentType.includes("application/json")) {
            if (contentType?.includes("text/html")) {
                throw new Error("Tunnel Interstitial: Visit backend URL in browser to bypass.");
            }
            throw new Error("Invalid response format.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[API] Fetch error (Dislikes):', error);
        throw error;
    }
}
