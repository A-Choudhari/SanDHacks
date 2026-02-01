import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export default function TabBarBackground() {
    return (
        <View style={styles.background} />
    );
}

const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Platform.select({
            ios: 'rgba(255,255,255,0.85)',
            default: '#fff',
        }),
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    }
});

export function useBottomTabOverflow() {
    return 0;
}
