import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { getUserProfile, listNotes } from '../lib/api';

const { width } = Dimensions.get('window');

export default function MyDashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [userNotes, setUserNotes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [apiTestResult, setApiTestResult] = useState<string>('');

    useEffect(() => {
        loadDashboardData();
        testAPI();
    }, []);

    const testAPI = async () => {
        try {
            console.log('Testing API call...');
            const response = await fetch('http://192.168.1.7/note2note/notes/list.php?user_id=10');
            console.log('Response status:', response.status);
            const data = await response.text();
            console.log('Response data:', data);
            setApiTestResult(`Status: ${response.status}, Data: ${data.substring(0, 100)}...`);
        } catch (error: any) {
            console.log('API test error:', error);
            setApiTestResult(`Error: ${error.message}`);
        }
    };

    const loadDashboardData = async () => {
        try {
            setIsLoading(true);
            const currentUserData = await AsyncStorage.getItem('currentUser');
            if (currentUserData) {
                const currentUser = JSON.parse(currentUserData);
                const userId = parseInt(currentUser.user_id);
                
                const [profileResponse, notesResponse] = await Promise.all([
                    getUserProfile(userId),
                    listNotes(userId)
                ]);
                
                if (profileResponse.ok && profileResponse.user) {
                    setUser(profileResponse.user);
                }
                
                if (notesResponse.data) {
                    setUserNotes(notesResponse.data);
                } else {
                    // Fallback: try to get all notes and filter by user
                    try {
                        const allNotesResponse = await listNotes(); // Get all public notes
                        if (allNotesResponse.data) {
                            const userNotes = allNotesResponse.data.filter(note => 
                                parseInt(note.user_id) === userId
                            );
                            setUserNotes(userNotes);
                        }
                    } catch (fallbackError) {
                        console.log('Fallback failed:', fallbackError);
                    }
                }
            } else {
                Alert.alert('Error', 'Please log in to view dashboard.');
                router.replace('/login');
            }
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
            Alert.alert('Error', 'Failed to load dashboard data. Please try again.');
            router.replace('/profile');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Never';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'Never';
        }
    };

    const getRecentNotes = () => {
        return userNotes
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 5);
    };

    const getSubjectStats = () => {
        const subjectCounts: { [key: string]: number } = {};
        userNotes.forEach(note => {
            const subject = note.subject_name || 'General';
            subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
        });
        return Object.entries(subjectCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
    };

    const calculatePoints = () => {
        // Simple points calculation: 10 points per note + 5 points per bookmark
        const notePoints = (user?.note_count || 0) * 10;
        const bookmarkPoints = (user?.bookmark_count || 0) * 5;
        return notePoints + bookmarkPoints;
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#1E3A8A" />
                    <Text style={styles.loadingText}>Loading dashboard...</Text>
                </View>
            </View>
        );
    }

    const recentNotes = getRecentNotes();
    const subjectStats = getSubjectStats();
    const totalPoints = calculatePoints();

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
                <Text style={styles.headerTitle}>My Dashboard</Text>
                <TouchableOpacity
                    onPress={loadDashboardData}
                    style={styles.refreshButton}
                >
                    <MaterialIcons name="refresh" size={24} color="#fff" />
                </TouchableOpacity>
            </SafeAreaView>

            {/* Content */}
            <ScrollView style={styles.content}>
                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeText}>Welcome back,</Text>
                    <Text style={styles.userName}>{user?.FirstName} {user?.LastName}</Text>
                    <Text style={styles.welcomeSubtext}>Here's your activity overview</Text>
                </View>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <View style={styles.statIconContainer}>
                            <MaterialIcons name="description" size={24} color="#1E3A8A" />
                        </View>
                        <Text style={styles.statNumber}>{user?.note_count || 0}</Text>
                        <Text style={styles.statLabel}>Notes Created</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={styles.statIconContainer}>
                            <MaterialIcons name="bookmark" size={24} color="#059669" />
                        </View>
                        <Text style={styles.statNumber}>{user?.bookmark_count || 0}</Text>
                        <Text style={styles.statLabel}>Bookmarks</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={styles.statIconContainer}>
                            <FontAwesome5 name="star" size={20} color="#D97706" />
                        </View>
                        <Text style={styles.statNumber}>{totalPoints}</Text>
                        <Text style={styles.statLabel}>Total Points</Text>
                    </View>
                </View>

                {/* Recent Activity */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Notes</Text>
                    {recentNotes.length > 0 ? (
                        recentNotes.map((note, index) => (
                            <View key={note.note_id} style={styles.activityItem}>
                                <View style={styles.activityIcon}>
                                    <MaterialIcons name="description" size={20} color="#1E3A8A" />
                                </View>
                                <View style={styles.activityContent}>
                                    <Text style={styles.activityTitle}>{note.title}</Text>
                                    <Text style={styles.activitySubtext}>
                                        {note.subject_name || 'General'} • {formatDate(note.created_at)}
                                    </Text>
                                </View>
                                <View style={styles.activityStats}>
                                    <Text style={styles.activityStat}>{note.view_count || 0} views</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <MaterialIcons name="description" size={48} color="#D1D5DB" />
                            <Text style={styles.emptyText}>No notes created yet</Text>
                            <Text style={styles.emptySubtext}>Start creating notes to see them here</Text>
                        </View>
                    )}
                </View>

                {/* Subject Distribution */}
                {subjectStats.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Subject Distribution</Text>
                        {subjectStats.map(([subject, count], index) => (
                            <View key={subject} style={styles.subjectItem}>
                                <View style={styles.subjectInfo}>
                                    <View style={[styles.subjectColor, { backgroundColor: getSubjectColor(index) }]} />
                                    <Text style={styles.subjectName}>{subject}</Text>
                                </View>
                                <View style={styles.subjectStats}>
                                    <Text style={styles.subjectCount}>{count}</Text>
                                    <Text style={styles.subjectLabel}>notes</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Account Overview */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account Overview</Text>
                    
                    <View style={styles.overviewItem}>
                        <MaterialIcons name="person" size={20} color="#6B7280" />
                        <Text style={styles.overviewLabel}>Account Type</Text>
                        <Text style={styles.overviewValue}>{user?.Account_Type || 'Student'}</Text>
                    </View>
                    
                    <View style={styles.overviewItem}>
                        <MaterialIcons name="school" size={20} color="#6B7280" />
                        <Text style={styles.overviewLabel}>Course</Text>
                        <Text style={styles.overviewValue}>{user?.Course || 'Not specified'}</Text>
                    </View>
                    
                    <View style={styles.overviewItem}>
                        <MaterialIcons name="calendar-today" size={20} color="#6B7280" />
                        <Text style={styles.overviewLabel}>Member Since</Text>
                        <Text style={styles.overviewValue}>{formatDate(user?.created_at)}</Text>
                    </View>
                    
                    <View style={styles.overviewItem}>
                        <MaterialIcons name="login" size={20} color="#6B7280" />
                        <Text style={styles.overviewLabel}>Last Login</Text>
                        <Text style={styles.overviewValue}>{formatDate(user?.last_login)}</Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => router.push('/upload-note')}
                    >
                        <MaterialIcons name="add" size={20} color="#fff" />
                        <Text style={styles.actionButtonText}>Create New Note</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.secondaryAction]}
                        onPress={() => router.push('/notes')}
                    >
                        <MaterialIcons name="notes" size={20} color="#1E3A8A" />
                        <Text style={[styles.actionButtonText, styles.secondaryActionText]}>View My Notes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const getSubjectColor = (index: number) => {
    const colors = ['#1E3A8A', '#059669', '#D97706', '#DC2626', '#7C3AED'];
    return colors[index % colors.length];
};

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
    welcomeSection: {
        backgroundColor: '#1E3A8A',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    welcomeText: {
        color: '#93C5FD',
        fontSize: 16,
    },
    userName: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 4,
    },
    welcomeSubtext: {
        color: '#93C5FD',
        fontSize: 14,
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    statLabel: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 4,
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
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    activityIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    activityContent: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    activitySubtext: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    activityStats: {
        alignItems: 'flex-end',
    },
    activityStat: {
        fontSize: 12,
        color: '#6B7280',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 12,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#9CA3AF',
        marginTop: 4,
    },
    subjectItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    subjectInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    subjectColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 12,
    },
    subjectName: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '500',
    },
    subjectStats: {
        alignItems: 'flex-end',
    },
    subjectCount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E3A8A',
    },
    subjectLabel: {
        fontSize: 12,
        color: '#6B7280',
    },
    overviewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    overviewLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 12,
        flex: 1,
    },
    overviewValue: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '500',
    },
    actionButton: {
        backgroundColor: '#1E3A8A',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    secondaryAction: {
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#1E3A8A',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    secondaryActionText: {
        color: '#1E3A8A',
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
    debugText: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 4,
    },
});
