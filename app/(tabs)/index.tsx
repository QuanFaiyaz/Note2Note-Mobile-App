import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function WelcomeScreen() {
    const router = useRouter();

    useEffect(() => {
        // Set a timer to navigate to the login page after 3000 milliseconds (3 seconds)
        const timer = setTimeout(() => {
            router.replace('/login');
        }, 3000);

        // This is a cleanup function. It will clear the timer if the component unmounts
        // before the 3 seconds are up, preventing a memory leak.
        return () => clearTimeout(timer);
    }, []); // The empty dependency array [] ensures this effect runs only once

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000' }}>
                Welcome to Note2Note!
            </Text>
        </View>
    );
}