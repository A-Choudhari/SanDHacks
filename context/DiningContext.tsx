import React, { createContext, ReactNode, useContext, useState } from 'react';
import { DiningLocation, MOCK_LOCATIONS } from '../data/mockData';

interface DiningContextType {
    locations: DiningLocation[];
    favorites: string[]; // List of Item IDs
    toggleFavorite: (itemId: string) => void;
    isFavorite: (itemId: string) => boolean;
}

const DiningContext = createContext<DiningContextType | undefined>(undefined);

export function DiningProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [locations] = useState<DiningLocation[]>(MOCK_LOCATIONS);

    const toggleFavorite = (itemId: string) => {
        setFavorites((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId]
        );
    };

    const isFavorite = (itemId: string) => favorites.includes(itemId);

    return (
        <DiningContext.Provider value={{ locations, favorites, toggleFavorite, isFavorite }}>
            {children}
        </DiningContext.Provider>
    );
}

export function useDining() {
    const context = useContext(DiningContext);
    if (context === undefined) {
        throw new Error('useDining must be used within a DiningProvider');
    }
    return context;
}
