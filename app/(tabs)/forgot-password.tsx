import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleReset = () => {
        
        alert('If this email exists, a reset link will be sent.');
        router.replace('/login');
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
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>
                    Enter your email address and we'll send you a link to reset your password.
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="your-email@nu-dasma.edu.ph"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.button} onPress={handleReset}>
                    <Text style={styles.buttonText}>Send Reset Link</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backLink} onPress={() => router.replace('/login')}>
                    <Text style={styles.backLinkText}>Back to Login</Text>
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
    input: {
        width: '100%',
        height: 48,
        borderColor: '#D1D5DB',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 24,
        fontSize: 16,
        backgroundColor: '#F9FAFB',
    },
    button: {
        backgroundColor: '#1E3A8A',
        borderRadius: 8,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backLink: {
        alignItems: 'center',
        marginBottom: 32,
    },
    backLinkText: {
        color: '#1E3A8A',
        fontSize: 15,
        fontWeight: '600',
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