import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { registerUserWithEmail } from '@/lib/api';

export default function CreateAccountPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Missing info', 'Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match', 'Please make sure both passwords are the same.');
            return;
        }
        try {
            await registerUserWithEmail({ email, password });
            Alert.alert('Success', 'Account created! You can now sign in.', [
                { text: 'OK', onPress: () => router.replace('/login') }
            ]);
        } catch (e: any) {
            const message = e?.message || 'Registration failed';
            Alert.alert('Registration failed', message);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.logoRow}>
                    <Image
                        source={require('../../assets/images/n2nlogo.png')}
                        style={styles.logoImage}
                    />
                    <Text style={styles.logoText}>Note2Note</Text>
                </View>
                <Text style={styles.title}>Welcome Aboard!</Text>
                <Text style={styles.subtitle}>Let's get you set up in just minute</Text>
                <Text style={styles.sectionTitle}>Sign up your account</Text>
                <Text style={styles.sectionSubtitle}>Please enter info to create account</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#9CA3AF"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign in to account</Text>
                </TouchableOpacity>

                <View style={{ flex: 1 }} />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Connect with your fellow NU-D BSIT students and share knowledge through our collaborative note-sharing platform
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingVertical: 40,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    logoImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 8,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3B82F6',
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 8,
        marginTop: 8,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        width: '100%',
        height: 48,
        borderColor: '#D1D5DB',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#F9FAFB',
    },
    button: {
        backgroundColor: '#1E3A8A',
        borderRadius: 8,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        marginBottom: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: '#1E3A8A',
        padding: 20,
        borderRadius: 8,
        marginTop: 40,
    },
    footerText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
});