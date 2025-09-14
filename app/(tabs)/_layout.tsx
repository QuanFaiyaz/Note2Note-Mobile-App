import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { display: 'none' }, // Hides the tab bar
            }}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="home" />
            <Tabs.Screen name="login" />
            <Tabs.Screen name="notes" />
            <Tabs.Screen name="discussion" />
            <Tabs.Screen name="create-account" />
            <Tabs.Screen name="forgot-password" />
            <Tabs.Screen name="my-files" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}
