import { Stack } from 'expo-router';
import React from 'react';
import './globals.css';

// This is the root layout of your app.
// It defines the main navigation flow.
export default function RootLayout() {
    return (
        <Stack>
            {/* This is the key line.
        It tells the main Stack to not show a header for the (tabs) group.
        Since the login screen is inside (tabs), it will no longer have a header.
      */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* You can add other screens here that are not part of the tabs. */}
        </Stack>
    );
}
