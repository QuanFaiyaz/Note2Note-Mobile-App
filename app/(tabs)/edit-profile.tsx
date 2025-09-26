import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { getUserProfile, updateUserProfile } from '../lib/api';

export default function EditProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        MiddleName: '',
        Mobile_No: '',
        Course: '',
        Account_Type: '',
        date_of_birth: '',
        gender: '',
        address: '',
        emergency_contact: '',
    });

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            setIsLoading(true);
            const currentUserData = await AsyncStorage.getItem('currentUser');
            if (currentUserData) {
                const currentUser = JSON.parse(currentUserData);
                console.log('Loading profile for editing, user ID:', currentUser.user_id);
                
                const response = await getUserProfile(currentUser.user_id);
                console.log('Profile API response:', response);
                
                if (response.ok && response.user) {
                    setUser(response.user);
                    setFormData({
                        FirstName: response.user.FirstName || '',
                        LastName: response.user.LastName || '',
                        MiddleName: response.user.MiddleName || '',
                        Mobile_No: response.user.Mobile_No || '',
                        Course: response.user.Course || '',
                        Account_Type: response.user.Account_Type || '',
                        date_of_birth: response.user.date_of_birth || '',
                        gender: response.user.gender || '',
                        address: response.user.address || '',
                        emergency_contact: response.user.emergency_contact || '',
                    });
                } else {
                    Alert.alert('Error', 'Failed to load profile data.');
                    router.replace('/profile');
                }
            } else {
                Alert.alert('Error', 'Please log in to edit your profile.');
                router.replace('/login');
            }
        } catch (error) {
            console.error('Failed to load user data:', error);
            Alert.alert('Error', 'Failed to load profile data. Please try again.');
            router.replace('/profile');
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        if (!formData.FirstName.trim()) {
            Alert.alert('Error', 'First name is required');
            return false;
        }
        if (!formData.LastName.trim()) {
            Alert.alert('Error', 'Last name is required');
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        setIsSaving(true);
        try {
            const currentUserData = await AsyncStorage.getItem('currentUser');
            if (!currentUserData) {
                Alert.alert('Error', 'Please log in to update your profile.');
                router.replace('/login');
                return;
            }

            const currentUser = JSON.parse(currentUserData);
            const userId = currentUser.user_id;

            console.log('Updating profile for user ID:', userId);
            console.log('Form data:', formData);

            const response = await updateUserProfile(userId, formData);
            console.log('Update response:', response);

            if (response.ok) {
                Alert.alert(
                    'Success',
                    'Profile updated successfully!',
                    [
                        {
                            text: 'OK',
                            onPress: () => router.replace('/profile')
                        }
                    ]
                );
            } else {
                Alert.alert('Error', response.error || 'Failed to update profile');
            }
        } catch (error: any) {
            console.error('Failed to update profile:', error);
            Alert.alert('Error', error.message || 'Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#1E3A8A" />
                    <Text style={styles.loadingText}>Loading profile...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.replace('/profile')}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <View style={styles.placeholder} />
            </SafeAreaView>

            {/* Form */}
            <ScrollView style={styles.formContainer}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>First Name *</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.FirstName}
                        onChangeText={(value) => handleInputChange('FirstName', value)}
                        placeholder="Enter first name"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Last Name *</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.LastName}
                        onChangeText={(value) => handleInputChange('LastName', value)}
                        placeholder="Enter last name"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Middle Name</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.MiddleName}
                        onChangeText={(value) => handleInputChange('MiddleName', value)}
                        placeholder="Enter middle name"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Mobile Number</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.Mobile_No}
                        onChangeText={(value) => handleInputChange('Mobile_No', value)}
                        placeholder="Enter mobile number"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Course</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.Course}
                        onChangeText={(value) => handleInputChange('Course', value)}
                        placeholder="Enter course"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Date of Birth</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.date_of_birth}
                        onChangeText={(value) => handleInputChange('date_of_birth', value)}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Gender</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.gender}
                        onChangeText={(value) => handleInputChange('gender', value)}
                        placeholder="Enter gender"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={formData.address}
                        onChangeText={(value) => handleInputChange('address', value)}
                        placeholder="Enter address"
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={3}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Emergency Contact</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.emergency_contact}
                        onChangeText={(value) => handleInputChange('emergency_contact', value)}
                        placeholder="Enter emergency contact"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={[styles.saveButton, isSaving && styles.disabledButton]}
                    onPress={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    header: {
        backgroundColor: '#1E3A8A',
        paddingTop: 32,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 16,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeholder: {
        width: 60, // To balance the header layout
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#1F2937',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#1E3A8A',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    disabledButton: {
        backgroundColor: '#9CA3AF',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    loadingText: {
        color: '#1E3A8A',
        fontSize: 16,
        marginTop: 16,
    },
});
