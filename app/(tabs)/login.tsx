import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { loginWithEmail } from '../lib/api';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email address');
            return false;
        }
        if (!password.trim()) {
            Alert.alert('Error', 'Please enter your password');
            return false;
        }
        if (!email.includes('@')) {
            Alert.alert('Error', 'Please enter a valid email address');
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            console.log('Attempting login with:', { email: email.trim(), password });
            const response = await loginWithEmail({
                email: email.trim(),
                password: password
            });
            
            console.log('Login successful:', response);
            console.log('User data to store:', response.user);
            
            // Store user data in AsyncStorage
            await AsyncStorage.setItem('currentUser', JSON.stringify(response.user));
            console.log('User data stored in AsyncStorage');
            
            Alert.alert(
                'Success',
                'Login successful! Welcome back.',
                [
                    {
                        text: 'OK',
                        onPress: () => router.replace('/home')
                    }
                ]
            );
        } catch (error: any) {
            console.error('Login error:', error);
            Alert.alert('Error', error.message || 'Login failed. Please check your credentials and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        router.push('/forgot-password');
    };

    const handleCreateAccount = () => {
        router.push('/create-account');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/images/n2nlogo.png')}
                            style={styles.logo}
                        />
                    </View>
                    <Text style={styles.welcomeTitle}>Welcome Back</Text>
                    <Text style={styles.welcomeSubtitle}>
                        Sign in to access your account and continue learning
                    </Text>
                </View>

                {/* Login Form Card */}
                <View style={styles.formCard}>
                    <View style={styles.formHeader}>
                        <Text style={styles.formTitle}>Sign In</Text>
                        <Text style={styles.formSubtitle}>Enter your credentials to continue</Text>
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email Address</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder="your-email@nu-dasma.edu.ph"
                                placeholderTextColor="#9CA3AF"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter your password"
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.passwordToggle}
                            >
                                <Ionicons 
                                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                                    size={20} 
                                    color="#666" 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Remember + Forgot */}
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity
                            style={styles.rememberContainer}
                            onPress={() => setRemember(!remember)}
                        >
                            <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
                                {remember && <Ionicons name="checkmark" size={14} color="#fff" />}
                            </View>
                            <Text style={styles.rememberText}>Remember me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleForgotPassword}>
                            <Text style={styles.forgotText}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Sign In Button */}
                    <TouchableOpacity
                        style={[styles.signInButton, isLoading && styles.signInButtonDisabled]}
                        onPress={handleLogin}
                        disabled={isLoading}
                        activeOpacity={0.8}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <>
                                <Text style={styles.signInButtonText}>Sign In</Text>
                                <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
                            </>
                        )}
                    </TouchableOpacity>


                    {/* Create Account */}
                    <View style={styles.createAccountContainer}>
                        <Text style={styles.createAccountText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={handleCreateAccount}>
                            <Text style={styles.createAccountLink}>Create one</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },

    // Header Section
    headerSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    welcomeTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
        textAlign: 'center',
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },

    // Form Card
    formCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 12,
    },
    formHeader: {
        marginBottom: 32,
        alignItems: 'center',
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    formSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },

    // Input Styles
    inputContainer: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        paddingHorizontal: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#1a1a1a',
        paddingVertical: 0,
    },
    passwordToggle: {
        padding: 4,
    },

    // Options Container
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#d1d5db',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#1E3A8A',
        borderColor: '#1E3A8A',
    },
    rememberText: {
        fontSize: 14,
        color: '#666',
    },
    forgotText: {
        fontSize: 14,
        color: '#1E3A8A',
        fontWeight: '600',
    },

    // Sign In Button
    signInButton: {
        backgroundColor: '#1E3A8A',
        borderRadius: 16,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        shadowColor: '#1E3A8A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    signInButtonDisabled: {
        backgroundColor: '#9ca3af',
        shadowOpacity: 0,
        elevation: 0,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonIcon: {
        marginLeft: 8,
    },


    // Create Account
    createAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    createAccountText: {
        fontSize: 14,
        color: '#666',
    },
    createAccountLink: {
        fontSize: 14,
        color: '#1E3A8A',
        fontWeight: '600',
    },
});
