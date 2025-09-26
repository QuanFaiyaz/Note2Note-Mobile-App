import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
    TouchableOpacity,
    View,
} from 'react-native';
import { getUserProfile } from '../lib/api';

export default function PersonalDataPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            setIsLoading(true);
            const currentUserData = await AsyncStorage.getItem('currentUser');
            if (currentUserData) {
                const currentUser = JSON.parse(currentUserData);
                console.log('Loading personal data for user ID:', currentUser.user_id);
                
                const response = await getUserProfile(currentUser.user_id);
                console.log('Personal data API response:', response);
                
                if (response.ok && response.user) {
                    setUser(response.user);
                } else {
                    Alert.alert('Error', 'Failed to load personal data.');
                    router.replace('/profile');
                }
            } else {
                Alert.alert('Error', 'Please log in to view personal data.');
                router.replace('/login');
            }
        } catch (error) {
            console.error('Failed to load user data:', error);
            Alert.alert('Error', 'Failed to load personal data. Please try again.');
            router.replace('/profile');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Not provided';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return 'Not provided';
        }
    };

    const formatDateTime = (dateString: string | null) => {
        if (!dateString) return 'Never';
        try {
            const date = new Date(dateString);
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Never';
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#1E3A8A" />
                    <Text style={styles.loadingText}>Loading personal data...</Text>
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
                <Text style={styles.headerTitle}>Personal Data</Text>
                <TouchableOpacity
                    onPress={loadUserData}
                    style={styles.refreshButton}
                >
                    <MaterialIcons name="refresh" size={24} color="#fff" />
                </TouchableOpacity>
            </SafeAreaView>

            {/* Content */}
            <ScrollView style={styles.content}>
                {/* Basic Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Basic Information</Text>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>First Name</Text>
                        <Text style={styles.value}>{user?.FirstName || 'Not provided'}</Text>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Last Name</Text>
                        <Text style={styles.value}>{user?.LastName || 'Not provided'}</Text>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Middle Name</Text>
                        <Text style={styles.value}>{user?.MiddleName || 'Not provided'}</Text>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Email Address</Text>
                        <Text style={styles.value}>{user?.Email || 'Not provided'}</Text>
                    </View>
                </View>

                {/* Contact Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Information</Text>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <Text style={styles.value}>{user?.Mobile_No || 'Not provided'}</Text>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Emergency Contact</Text>
                        <Text style={styles.value}>{user?.emergency_contact || 'Not provided'}</Text>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Address</Text>
                        <Text style={styles.value}>{user?.address || 'Not provided'}</Text>
                    </View>
                </View>

                {/* Academic Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Academic Information</Text>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Course</Text>
                        <Text style={styles.value}>{user?.Course || 'Not provided'}</Text>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Account Type</Text>
                        <Text style={styles.value}>{user?.Account_Type || 'Not provided'}</Text>
                    </View>
                </View>

                {/* Personal Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <Text style={styles.value}>{formatDate(user?.date_of_birth)}</Text>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Gender</Text>
                        <Text style={styles.value}>{user?.gender || 'Not provided'}</Text>
                    </View>
                </View>

                {/* Account Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account Information</Text>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>User ID</Text>
                        <Text style={styles.value}>{user?.user_id || 'N/A'}</Text>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Account Status</Text>
                        <View style={styles.statusContainer}>
                            <Text style={[
                                styles.statusText,
                                user?.status === 'Active' ? styles.activeStatus : styles.inactiveStatus
                            ]}>
                                {user?.status || 'Unknown'}
                            </Text>
                        </View>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Email Verified</Text>
                        <View style={styles.statusContainer}>
                            <Text style={[
                                styles.statusText,
                                user?.email_verified == 1 ? styles.verifiedStatus : styles.unverifiedStatus
                            ]}>
                                {user?.email_verified == 1 ? 'Verified' : 'Not Verified'}
                            </Text>
                        </View>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Admin Status</Text>
                        <View style={styles.statusContainer}>
                            <Text style={[
                                styles.statusText,
                                user?.is_Admin == 1 ? styles.adminStatus : styles.userStatus
                            ]}>
                                {user?.is_Admin == 1 ? 'Administrator' : 'Regular User'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Activity Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Activity Information</Text>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Notes Created</Text>
                        <Text style={styles.value}>{user?.note_count || 0}</Text>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Bookmarks Saved</Text>
                        <Text style={styles.value}>{user?.bookmark_count || 0}</Text>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Account Created</Text>
                        <Text style={styles.value}>{formatDateTime(user?.created_at)}</Text>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.label}>Last Login</Text>
                        <Text style={styles.value}>{formatDateTime(user?.last_login)}</Text>
                    </View>
                </View>

                {/* Edit Button */}
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => router.push('/edit-profile')}
                >
                    <MaterialIcons name="edit" size={20} color="#fff" />
                    <Text style={styles.editButtonText}>Edit Profile</Text>
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
    refreshButton: {
        padding: 8,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E3A8A',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 8,
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        flex: 1,
    },
    value: {
        fontSize: 14,
        color: '#1F2937',
        flex: 2,
        textAlign: 'right',
        flexWrap: 'wrap',
    },
    statusContainer: {
        flex: 2,
        alignItems: 'flex-end',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        textAlign: 'center',
    },
    activeStatus: {
        backgroundColor: '#D1FAE5',
        color: '#065F46',
    },
    inactiveStatus: {
        backgroundColor: '#FEE2E2',
        color: '#991B1B',
    },
    verifiedStatus: {
        backgroundColor: '#D1FAE5',
        color: '#065F46',
    },
    unverifiedStatus: {
        backgroundColor: '#FEF3C7',
        color: '#92400E',
    },
    adminStatus: {
        backgroundColor: '#DBEAFE',
        color: '#1E40AF',
    },
    userStatus: {
        backgroundColor: '#F3F4F6',
        color: '#374151',
    },
    editButton: {
        backgroundColor: '#1E3A8A',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 40,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
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
