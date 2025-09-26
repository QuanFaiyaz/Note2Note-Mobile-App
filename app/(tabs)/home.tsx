import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUserCount, listNotes } from '../lib/api';


// This is the main component for your home page, designed to match the provided image.
export default function HomePage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSubject, setActiveSubject] = useState('ALL');
    const [notes, setNotes] = useState<any[]>([]);
    const [filteredNotes, setFilteredNotes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [userCount, setUserCount] = useState<number>(0);
    const [newNotesToday, setNewNotesToday] = useState<number>(0);

    useEffect(() => {
        loadUserData();
        loadNotes();
        loadStats();
    }, []);

    // Filter notes based on search query and subject filter
    useEffect(() => {
        let filtered = [...notes];

        // Apply search filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(note =>
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (note.subject_name && note.subject_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (note.course_name && note.course_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (note.FirstName && note.FirstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (note.LastName && note.LastName.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Apply subject filter
        if (activeSubject !== 'ALL') {
            filtered = filtered.filter(note =>
                note.subject_name === activeSubject || note.course_name === activeSubject
            );
        }

        setFilteredNotes(filtered);
    }, [notes, searchQuery, activeSubject]);

    const loadUserData = async () => {
        try {
            const currentUserData = await AsyncStorage.getItem('currentUser');
            if (currentUserData) {
                const currentUser = JSON.parse(currentUserData);
                setUser(currentUser);
            }
        } catch (error) {
            console.error('Failed to load user data:', error);
        }
    };

    const loadStats = async () => {
        try {
            // Get user count
            const userResponse = await getUserCount();
            if (userResponse.data) {
                setUserCount(userResponse.data.length);
            }

            // Calculate new notes today
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const notesResponse = await listNotes();
            if (notesResponse.data) {
                const todayNotes = notesResponse.data.filter(note => {
                    const noteDate = new Date(note.created_at);
                    noteDate.setHours(0, 0, 0, 0);
                    return noteDate.getTime() === today.getTime();
                });
                setNewNotesToday(todayNotes.length);
            }
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    };

    // Add auto-refresh to check for new notes periodically
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Auto-refreshing home notes...');
            loadNotes();
            loadStats();
        }, 100000); 

        return () => clearInterval(interval);
    }, []);

    const loadNotes = async () => {
        try {
            setIsLoading(true);
            console.log('Loading all public notes for home tab...');
            const response = await listNotes(); // Get all public notes
            console.log('Home notes loaded:', response.data?.length || 0, 'notes');
            setNotes(response.data || []);
        } catch (error) {
            console.error('Failed to load notes:', error);
            Alert.alert('Error', 'Failed to load notes. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle the search logic
    const handleSearch = () => {
        console.log(`Searching for: ${searchQuery}`);
        // Search is now handled automatically by the useEffect filter
        // This function can be used for additional search features if needed
    };

    // Function to handle adding a new note
    const handleAddNote = () => {
        console.log("Add new note button pressed.");
        // Navigate to the note creation page here.
    };


    // Helper component for the note cards
    // The w-1/2 class is applied here to ensure two columns.
    type Note = {
        note_id: string;
        title: string;
        subject_name?: string;
        course_name?: string;
        FirstName: string;
        LastName: string;
    };

    const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleComment = () => {
        // Replace this with actual comment screen navigation later
        Alert.alert("Comments", `Open comments for "${note.title}"`);
    };

    const handleNotePress = () => {
        // Navigate to note details page
        router.push({
            pathname: '/note-details',
            params: {
                noteId: note.note_id.toString(),
                title: note.title,
                category: note.subject_name || note.course_name || 'General',
                author: `By ${note.FirstName} ${note.LastName}`,
                status: 'Public',
                rating: '0',
                reviewCount: '0',
                dateCreated: new Date().toLocaleDateString(),
                summary: note.title,
                description: note.title,
                keyPoints: JSON.stringify([note.title])
            }
        });
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this note: "${note.title}" shared by ${note.FirstName} ${note.LastName}`,
            });
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.noteCardContainer} key={note.note_id}>
            <TouchableOpacity style={styles.noteCard} onPress={handleNotePress} activeOpacity={0.7}>
                {/* Card Header */}
                <View style={styles.noteCardHeader}>
                    <View style={styles.noteCardBadge}>
                        <Text style={styles.noteCardBadgeText}>{note.subject_name || note.course_name || 'General'}</Text>
                    </View>
                    <TouchableOpacity style={styles.moreButton}>
                        <Ionicons name="ellipsis-horizontal" size={16} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Card Content */}
                <View style={styles.noteCardContent}>
                    <Text style={styles.noteTitle} numberOfLines={2}>{note.title}</Text>
                    <View style={styles.noteAuthorRow}>
                        <View style={styles.authorAvatar}>
                            <Text style={styles.authorInitial}>
                                {note.FirstName?.charAt(0) || 'U'}
                            </Text>
                        </View>
                        <View style={styles.authorInfo}>
                            <Text style={styles.noteAuthorName}>{note.FirstName} {note.LastName}</Text>
                            <Text style={styles.noteDate}>2 hours ago</Text>
                        </View>
                    </View>
                </View>

                {/* Card Footer */}
                <View style={styles.noteCardFooter}>
                    <View style={styles.noteStats}>
                        <View style={styles.statItem}>
                            <Ionicons name="eye" size={14} color="#666" />
                            <Text style={styles.statText}>24</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="heart" size={14} color="#666" />
                            <Text style={styles.statText}>8</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="chatbubble" size={14} color="#666" />
                            <Text style={styles.statText}>3</Text>
                        </View>
                    </View>
                    
                    <View style={styles.noteActions}>
                        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
                            <Ionicons
                                name={isLiked ? "heart" : "heart-outline"}
                                size={18}
                                color={isLiked ? "#ef4444" : "#666"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
                            <Ionicons
                                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                                size={18}
                                color={isBookmarked ? "#1E3A8A" : "#666"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                            <Ionicons name="share-outline" size={18} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};


    // A mapping to get the correct icon for each subject
    const getSubjectIcon = (subjectName: string) => {
        const color = activeSubject === subjectName ? 'white' : 'gray';
        switch(subjectName) {
            case 'ALL':
                return <Ionicons name="apps-outline" size={20} color={color} />;
            case 'Subject 1':
                return <Ionicons name="book-outline" size={20} color={color} />;
            case 'Subject 2':
                return <Ionicons name="flask-outline" size={20} color={color} />;
            case 'Subject 3':
                return <Ionicons name="calculator-outline" size={20} color={color} />;
            case 'Subject 4':
                return <Ionicons name="code-slash-outline" size={20} color={color} />;
            default:
                return <Ionicons name="apps-outline" size={20} color={color} />;
        }
    };

    const subjects = ['ALL', 'Subject 1', 'Subject 2', 'Subject 3', 'Subject 4'];

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.headerLeft}>
                        <View style={styles.welcomeSection}>
                            <Text style={styles.welcomeText}>Welcome back,</Text>
                            <Text style={styles.userNameText}>
                                {user ? `${user.FirstName} ${user.LastName}` : 'User'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={() => {
                            loadNotes();
                            loadStats();
                        }} style={styles.reloadButton}>
                            <MaterialIcons name="refresh" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.notificationButton}>
                            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {/* Search Bar */}
            <View style={styles.searchBarWrapper}>
                <View style={styles.searchBar}>
                    <View style={styles.searchBarRow}>
                        <Feather name="search" size={20} color="#6B7280" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search notes, subjects, or authors..."
                            placeholderTextColor="#6B7280"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={handleSearch}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={20} color="#6B7280" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                {/* Quick Stats Section */}
                <View style={styles.statsSection}>
                    <Text style={styles.sectionTitle}>Today's Overview</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <Ionicons name="document-text" size={24} color="#1E3A8A" />
                            <Text style={styles.statNumber}>{filteredNotes.length}</Text>
                            <Text style={styles.statLabel}>
                                {searchQuery || activeSubject !== 'ALL' ? 'Filtered Notes' : 'Total Notes'}
                            </Text>
                        </View>
                        <View style={styles.statCard}>
                            <Ionicons name="trending-up" size={24} color="#10B981" />
                            <Text style={styles.statNumber}>{newNotesToday}</Text>
                            <Text style={styles.statLabel}>New Today</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Ionicons name="people" size={24} color="#F59E0B" />
                            <Text style={styles.statNumber}>{userCount}</Text>
                            <Text style={styles.statLabel}>Total Users</Text>
                        </View>
                    </View>
                </View>

                {/* Action Section */}
                <View style={styles.actionSection}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity 
                            onPress={() => router.push('/upload-note')} 
                            style={styles.primaryActionButton}
                        >
                            <Ionicons name="add-circle" size={24} color="#fff" />
                            <Text style={styles.primaryActionText}>Upload Note</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => router.push('/notes')} 
                            style={styles.secondaryActionButton}
                        >
                            <Ionicons name="document-outline" size={24} color="#1E3A8A" />
                            <Text style={styles.secondaryActionText}>My Notes</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Subjects Section */}
                <View style={styles.subjectsSection}>
                    <View style={styles.subjectsHeaderRow}>
                        <Text style={styles.sectionTitle}>Browse by Subject</Text>
                        <TouchableOpacity onPress={() => router.push('/notes')} style={styles.viewAllButton}>
                            <Text style={styles.viewAllText}>View All</Text>
                            <Ionicons name="arrow-forward" size={16} color="#1E3A8A" />
                        </TouchableOpacity>
                    </View>

                    {/* Subject Tabs */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjectTabsScroll}>
                        {subjects.map(subject => (
                            <TouchableOpacity
                                key={subject}
                                onPress={() => setActiveSubject(subject)}
                                style={[
                                    styles.subjectTab,
                                    activeSubject === subject ? styles.subjectTabActive : styles.subjectTabInactive
                                ]}
                            >
                                {getSubjectIcon(subject)}
                                <Text style={[
                                    styles.subjectTabText,
                                    activeSubject === subject ? styles.subjectTabTextActive : styles.subjectTabTextInactive
                                ]}>
                                    {subject}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Notes Section */}
                <View style={styles.notesSection}>
                    <View style={styles.notesHeaderRow}>
                        <View style={styles.notesHeaderLeft}>
                            <Text style={styles.sectionTitle}>
                                {searchQuery || activeSubject !== 'ALL' ? 'Search Results' : 'Recent Notes'}
                            </Text>
                            {(searchQuery || activeSubject !== 'ALL') && (
                                <Text style={styles.searchResultsText}>
                                    {filteredNotes.length} result{filteredNotes.length !== 1 ? 's' : ''} found
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => router.push('/notes')} style={styles.viewAllButton}>
                            <Text style={styles.viewAllText}>View All</Text>
                            <Ionicons name="arrow-forward" size={16} color="#1E3A8A" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.notesGrid}>
                        {isLoading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#1E3A8A" />
                                <Text style={styles.loadingText}>Loading notes...</Text>
                            </View>
                        ) : filteredNotes.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <View style={styles.emptyIconContainer}>
                                    <Ionicons name="document-text-outline" size={64} color="#d1d5db" />
                                </View>
                                <Text style={styles.emptyText}>
                                    {searchQuery || activeSubject !== 'ALL' ? 'No notes found' : 'No notes available'}
                                </Text>
                                <Text style={styles.emptySubtext}>
                                    {searchQuery || activeSubject !== 'ALL' 
                                        ? 'Try adjusting your search or filter' 
                                        : 'Be the first to upload a note!'
                                    }
                                </Text>
                                {!searchQuery && activeSubject === 'ALL' && (
                                    <TouchableOpacity 
                                        onPress={() => router.push('/upload-note')} 
                                        style={styles.emptyActionButton}
                                    >
                                        <Text style={styles.emptyActionText}>Upload Note</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ) : (
                            filteredNotes.map(note => (
                                <NoteCard key={note.note_id} note={note} />
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <SafeAreaView style={styles.bottomNav}>
                <View style={styles.bottomNavRow}>
                    <TouchableOpacity style={styles.bottomNavItem}>
                        <MaterialIcons name="home" size={24} color="#FFFFFF" />
                        <Text style={styles.bottomNavText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.replace('/discussion')}>
                        <MaterialIcons name="groups" size={24} color="#FFFFFF" />
                        <Text style={styles.bottomNavText}>Discussion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.replace('/notes')}>
                        <MaterialIcons name="notes" size={24} color="#FFFFFF" />
                        <Text style={styles.bottomNavText}>Notes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.replace('/my-files')}>
                    <FontAwesome5 name="folder" size={22} color="#fff" />
                    <Text style={styles.bottomNavText}>Files</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.replace('/profile')}>
                    <MaterialIcons name="person" size={24} color="#FFFFFF" />
                    <Text style={styles.bottomNavText}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#f8fafc' 
    },
    
    // Header Styles
    header: { 
        backgroundColor: '#1E3A8A', 
        paddingTop: 50, 
        paddingBottom: 20 
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    welcomeSection: {
        marginBottom: 8,
    },
    welcomeText: {
        color: '#e2e8f0',
        fontSize: 14,
        fontWeight: '500',
    },
    userNameText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    reloadButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginRight: 12,
    },
    notificationButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
    },

    // Search Bar Styles
    searchBarWrapper: { 
        marginHorizontal: 20, 
        marginTop: 20, 
        zIndex: 10 
    },
    searchBar: { 
        backgroundColor: '#fff', 
        paddingHorizontal: 16,
        paddingVertical: 12, 
        borderRadius: 16, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    searchBarRow: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    searchInput: { 
        flex: 1, 
        color: '#1F2937', 
        fontSize: 16, 
        marginLeft: 12,
        marginRight: 8,
    },

    // Main Content Styles
    mainScroll: { 
        flex: 1, 
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    // Section Styles
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 16,
    },

    // Stats Section
    statsSection: {
        marginBottom: 24,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
        textAlign: 'center',
    },

    // Action Section
    actionSection: {
        marginBottom: 24,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    primaryActionButton: {
        backgroundColor: '#1E3A8A',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        flex: 1,
        marginRight: 8,
        shadowColor: '#1E3A8A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    primaryActionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    secondaryActionButton: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        flex: 1,
        marginLeft: 8,
        borderWidth: 2,
        borderColor: '#1E3A8A',
    },
    secondaryActionText: {
        color: '#1E3A8A',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },

    // Subjects Section
    subjectsSection: {
        marginBottom: 24,
    },
    subjectsHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        color: '#1E3A8A',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 4,
    },
    subjectTabsScroll: { 
        marginBottom: 20 
    },
    subjectTab: { 
        height: 48, 
        paddingVertical: 8, 
        paddingHorizontal: 20, 
        borderRadius: 24, 
        marginRight: 12, 
        flexDirection: 'row', 
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    subjectTabActive: { 
        backgroundColor: '#1E3A8A' 
    },
    subjectTabInactive: { 
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    subjectTabText: { 
        marginLeft: 8, 
        fontSize: 14,
        fontWeight: '500',
    },
    subjectTabTextActive: { 
        color: '#fff' 
    },
    subjectTabTextInactive: { 
        color: '#374151' 
    },

    // Notes Section
    notesSection: {
        marginBottom: 24,
    },
    notesHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    notesHeaderLeft: {
        flex: 1,
    },
    searchResultsText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    notesGrid: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between' 
    },
    noteCardContainer: { 
        width: '48%', 
        marginBottom: 16 
    },
    noteCard: { 
        backgroundColor: '#fff', 
        borderRadius: 16, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
    },
    noteCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    noteCardBadge: {
        backgroundColor: '#f0f4ff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    noteCardBadgeText: {
        color: '#1E3A8A',
        fontSize: 12,
        fontWeight: '600',
    },
    moreButton: {
        padding: 4,
    },
    noteCardContent: {
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    noteTitle: { 
        color: '#1a1a1a', 
        fontWeight: 'bold', 
        fontSize: 16,
        marginBottom: 12,
        lineHeight: 22,
    },
    noteAuthorRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#1E3A8A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    authorInitial: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    authorInfo: {
        flex: 1,
    },
    noteAuthorName: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '500',
    },
    noteDate: {
        color: '#9ca3af',
        fontSize: 12,
    },
    noteCardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    noteStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    statText: {
        color: '#666',
        fontSize: 12,
        marginLeft: 4,
    },
    noteActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        padding: 8,
        marginLeft: 4,
    },

    // Loading & Empty States
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
        width: '100%',
    },
    loadingText: {
        color: '#1E3A8A',
        fontSize: 16,
        marginTop: 16,
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
        width: '100%',
    },
    emptyIconContainer: {
        marginBottom: 16,
    },
    emptyText: {
        color: '#1a1a1a',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    emptySubtext: {
        color: '#666',
        fontSize: 14,
        marginBottom: 20,
    },
    emptyActionButton: {
        backgroundColor: '#1E3A8A',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    emptyActionText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },

    // Bottom Navigation
    bottomNav: { 
        backgroundColor: '#1E3A8A', 
        elevation: 8 
    },
    bottomNavRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        height: 68 
    },
    bottomNavItem: { 
        alignItems: 'center' 
    },
    bottomNavText: { 
        color: '#fff', 
        fontSize: 12, 
        marginTop: 4 
    },
});
