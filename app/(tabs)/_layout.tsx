import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{ headerShown: false }} // Keep headers hidden on all screens
            tabBar={() => null} // This line hides the entire tab bar
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="home" />
            <Tabs.Screen name="login" />
        </Tabs>
    );
}
