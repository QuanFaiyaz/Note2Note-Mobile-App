import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { loginWithEmail } from '../../lib/api';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Missing info', 'Please enter email and password.');
            return;
        }
        try {
            await loginWithEmail({ email, password });
            router.replace('/home');
        } catch (e: any) {
            const message = e?.message || 'Login failed';
            Alert.alert('Invalid credentials', message);
        }
    };

    const handleForgotPassword = () => {
        router.push('/forgot-password');
    };

    const handleCreateAccount = () => {
        router.push('/create-account');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
                <View className="items-center mb-8">
                    {/* Logo */}
                    <Image
                        source={require('../../assets/images/n2nlogo.png')}
                        style={{ width: 100, height: 100, resizeMode: 'contain' }}
                        className="mb-4"
                    />
                    <Text className="text-3xl font-bold text-gray-900 mb-2 text-center">Welcome Back</Text>
                    <Text className="text-gray-500 text-sm text-center">
                        Sign in to access your account
                    </Text>
                </View>

                {/* Login Form */}
                <View className="w-full max-w-sm mx-auto">
                    {/* Email Input */}
                    {/* <Text className="text-gray-700 font-medium mb-1">Email</Text> */}
                    <TextInput
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4"
                        placeholder="your-email@nu-dasma.edu.ph"
                        placeholderTextColor="#9CA3AF"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* Password Input */}
                    <Text className="text-gray-700 font-medium mb-1">Password</Text>
                    <TextInput
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4"
                        placeholder="Enter your password"
                        placeholderTextColor="#9CA3AF"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {/* Remember + Forgot */}
                    <View className="flex-row justify-between items-center mb-6">
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={() => setRemember(!remember)}
                        >
                            <View className={`w-5 h-5 border rounded-md mr-2 items-center justify-center ${remember ? 'bg-blue-900 border-blue-900' : 'border-gray-400'}`}>
                                {remember && <Feather name="check" size={14} color="white" />}
                            </View>
                            <Text className="text-gray-600 text-sm">Remember me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleForgotPassword}>
                            <Text style={{ color: '#1E3A8A', fontWeight: '600', textAlign: 'right', marginBottom: 16 }}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Sign In Button */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        className="w-full bg-blue-900 rounded-lg h-12 items-center justify-center mb-6"
                    >
                        <Text className="text-white text-base font-semibold">Sign in</Text>
                    </TouchableOpacity>

                    {/* Create Account */}
                    <View className="flex-row justify-center items-center">
                        <Text className="text-gray-600 text-sm">Don’t have an account? </Text>
                        <TouchableOpacity onPress={handleCreateAccount}>
                            <Text className="text-blue-600 text-sm font-semibold">Create one</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
