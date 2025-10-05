import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { listNotes } from '../lib/api';

export default function NotesPage() {
    const router = useRouter();
    const [notes, setNotes] = React.useState<any[]>([]);
    const [filteredNotes, setFilteredNotes] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [sortBy, setSortBy] = React.useState<'date' | 'title' | 'subject'>('date');
    const [showSortMenu, setShowSortMenu] = React.useState(false);

    React.useEffect(() => {
        loadNotes();
    }, []);

    // Filter and sort notes when notes, searchQuery, or sortBy changes
    React.useEffect(() => {
        let filtered = [...notes];

        // Apply search filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(note =>
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (note.subject_name && note.subject_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (note.course_name && note.course_name.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'subject':
                    const aSubject = a.subject_name || a.course_name || '';
                    const bSubject = b.subject_name || b.course_name || '';
                    return aSubject.localeCompare(bSubject);
                case 'date':
                default:
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
        });

        setFilteredNotes(filtered);
    }, [notes, searchQuery, sortBy]);

    // Add focus listener to reload notes when tab is focused
    React.useEffect(() => {
        const handleFocus = () => {
            console.log('Notes tab focused, reloading notes...');
            loadNotes();
        };

        // Use a simple interval to check for updates
        const interval = setInterval(handleFocus, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const clearUserData = async () => {
        try {
            await AsyncStorage.removeItem('currentUser');
            console.log('User data cleared from AsyncStorage');
            Alert.alert('Success', 'User data cleared. Please log in again.');
            router.replace('/login');
        } catch (error) {
            console.error('Failed to clear user data:', error);
        }
    };

    const loadNotes = async () => {
        try {
            setIsLoading(true);
            
            // Get current user from AsyncStorage
            const currentUserData = await AsyncStorage.getItem('currentUser');
            console.log('Raw AsyncStorage data:', currentUserData);
            
            if (!currentUserData) {
                Alert.alert('Error', 'Please log in to view your notes.');
                router.replace('/login');
                return;
            }
            
            const currentUser = JSON.parse(currentUserData);
            const userId = currentUser.user_id;
            
            console.log('Current user data:', currentUser);
            console.log('Loading notes for user ID:', userId);
            console.log('User ID type:', typeof userId);
            
            const response = await listNotes(userId); // Get only current user's notes
            console.log('API response:', response);
            setNotes(response.data || []);
        } catch (error) {
            console.error('Failed to load notes:', error);
            Alert.alert('Error', 'Failed to load notes. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNotePress = (note: any) => {
        // Navigate to note details page with the note data
        router.push({
            pathname: '/note-details',
            params: {
                noteId: note.note_id.toString(),
                title: note.title,
                category: note.subject_name || note.course_name || 'General',
                author: `By ${note.FirstName} ${note.LastName}`,
                status: note.is_public ? 'Public' : 'Private',
                rating: (note.upvotes || 0).toString(),
                reviewCount: (note.download_count || 0).toString(),
                dateCreated: new Date(note.created_at).toLocaleDateString(),
                summary: note.title,
                description: note.content,
                keyPoints: JSON.stringify([note.content]),
                filePath: note.file_path || '',
                fileType: note.file_type || '',
                fileSize: note.file_size ? note.file_size.toString() : '',
                viewCount: note.view_count ? note.view_count.toString() : '0'
            }
        });
    };
 
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity 
                        onPress={() => router.replace('/home')} 
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Notes</Text>
                    <View style={styles.headerActions}>
                        <TouchableOpacity 
                            onPress={() => setShowSortMenu(!showSortMenu)} 
                            style={styles.sortButton}
                        >
                            <MaterialIcons name="sort" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={loadNotes} 
                            style={styles.refreshButton}
                        >
                            <MaterialIcons name="refresh" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color="#666" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search notes..."
                            placeholderTextColor="#666"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={20} color="#666" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Sort Menu */}
                {showSortMenu && (
                    <View style={styles.sortMenu}>
                        <TouchableOpacity 
                            style={[styles.sortOption, sortBy === 'date' && styles.sortOptionActive]}
                            onPress={() => {
                                setSortBy('date');
                                setShowSortMenu(false);
                            }}
                        >
                            <MaterialIcons name="schedule" size={20} color={sortBy === 'date' ? '#1E3A8A' : '#666'} />
                            <Text style={[styles.sortOptionText, sortBy === 'date' && styles.sortOptionTextActive]}>
                                Sort by Date
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.sortOption, sortBy === 'title' && styles.sortOptionActive]}
                            onPress={() => {
                                setSortBy('title');
                                setShowSortMenu(false);
                            }}
                        >
                            <MaterialIcons name="title" size={20} color={sortBy === 'title' ? '#1E3A8A' : '#666'} />
                            <Text style={[styles.sortOptionText, sortBy === 'title' && styles.sortOptionTextActive]}>
                                Sort by Title
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.sortOption, sortBy === 'subject' && styles.sortOptionActive]}
                            onPress={() => {
                                setSortBy('subject');
                                setShowSortMenu(false);
                            }}
                        >
                            <MaterialIcons name="category" size={20} color={sortBy === 'subject' ? '#1E3A8A' : '#666'} />
                            <Text style={[styles.sortOptionText, sortBy === 'subject' && styles.sortOptionTextActive]}>
                                Sort by Subject
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Stats Section */}
                <View style={styles.statsSection}>
                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <MaterialIcons name="description" size={24} color="#1E3A8A" />
                            <Text style={styles.statNumber}>{filteredNotes.length}</Text>
                            <Text style={styles.statLabel}>Total Notes</Text>
                        </View>
                        <View style={styles.statCard}>
                            <MaterialIcons name="visibility" size={24} color="#10B981" />
                            <Text style={styles.statNumber}>
                                {filteredNotes.reduce((sum, note) => sum + (note.view_count || 0), 0)}
                            </Text>
                            <Text style={styles.statLabel}>Total Views</Text>
                        </View>
                        <View style={styles.statCard}>
                            <MaterialIcons name="download" size={24} color="#F59E0B" />
                            <Text style={styles.statNumber}>
                                {filteredNotes.reduce((sum, note) => sum + (note.download_count || 0), 0)}
                            </Text>
                            <Text style={styles.statLabel}>Downloads</Text>
                        </View>
                    </View>
                </View>

                {/* Notes List */}
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#1E3A8A" />
                        <Text style={styles.loadingText}>Loading notes...</Text>
                    </View>
                ) : filteredNotes.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyIconContainer}>
                            <MaterialIcons name="description" size={64} color="#d1d5db" />
                        </View>
                        <Text style={styles.emptyText}>
                            {searchQuery ? 'No notes found' : 'No notes available'}
                        </Text>
                        <Text style={styles.emptySubtext}>
                            {searchQuery ? 'Try adjusting your search' : 'Be the first to upload a note!'}
                        </Text>
                        {!searchQuery && (
                            <TouchableOpacity 
                                onPress={() => router.push('/upload-note')} 
                                style={styles.emptyActionButton}
                            >
                                <Text style={styles.emptyActionText}>Upload Note</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ) : (
                    <View style={styles.notesContainer}>
                        {filteredNotes.map((note, index) => (
                            <TouchableOpacity 
                                key={`note-${note.note_id}`} 
                                style={styles.noteCard}
                                onPress={() => handleNotePress(note)}
                                activeOpacity={0.7}
                            >
                                {/* Card Header */}
                                <View style={styles.noteCardHeader}>
                                    <View style={styles.noteCardBadge}>
                                        <Text style={styles.noteCardBadgeText}>
                                            {note.subject_name || note.course_name || 'General'}
                                        </Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={styles.moreButton}
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            console.log('Menu pressed for note:', note.note_id);
                                        }}
                                    >
                                        <MaterialIcons name="more-vert" size={20} color="#666" />
                                    </TouchableOpacity>
                                </View>

                                {/* Card Content */}
                                <View style={styles.noteCardContent}>
                                    <Text style={styles.noteTitle} numberOfLines={2}>{note.title}</Text>
                                    <View style={styles.noteMeta}>
                                        <View style={styles.authorInfo}>
                                            <View style={styles.authorAvatar}>
                                                <Text style={styles.authorInitial}>
                                                    {note.FirstName?.charAt(0) || 'U'}
                                                </Text>
                                            </View>
                                            <View style={styles.authorDetails}>
                                                <Text style={styles.authorName}>
                                                    {note.FirstName} {note.LastName}
                                                </Text>
                                                <Text style={styles.noteDate}>
                                                    {new Date(note.created_at).toLocaleDateString()}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.statusBadge}>
                                            <MaterialIcons 
                                                name={note.is_featured ? "star" : "public"} 
                                                size={16} 
                                                color={note.is_featured ? "#FFD700" : "#4CAF50"} 
                                            />
                                            <Text style={styles.statusText}>
                                                {note.is_featured ? 'Featured' : 'Public'}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Card Footer */}
                                <View style={styles.noteCardFooter}>
                                    <View style={styles.noteStats}>
                                        <View style={styles.statItem}>
                                            <MaterialIcons name="visibility" size={16} color="#666" />
                                            <Text style={styles.statText}>{note.view_count || 0}</Text>
                                        </View>
                                        <View style={styles.statItem}>
                                            <MaterialIcons name="download" size={16} color="#666" />
                                            <Text style={styles.statText}>{note.download_count || 0}</Text>
                                        </View>
                                        <View style={styles.statItem}>
                                            <MaterialIcons name="star" size={16} color="#666" />
                                            <Text style={styles.statText}>{note.rating || 0}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.noteActions}>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <MaterialIcons name="share" size={18} color="#666" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <MaterialIcons name="bookmark-border" size={18} color="#666" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* Bottom Navigation */}
            <SafeAreaView style={styles.bottomNav}>
                <View style={styles.bottomNavRow}>
                    <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.replace('/home')}>
                        <MaterialIcons name="home" size={24} color="#fff" />
                        <Text style={styles.bottomNavText}>HOME</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.replace('/discussion')}>
                        <MaterialIcons name="groups" size={24} color="#fff" />
                        <Text style={styles.bottomNavText}>Discussion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bottomNavItem, styles.activeNavItem]}>
                        <MaterialIcons name="notes" size={24} color="#fff" />
                        <Text style={styles.bottomNavText}>Notes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.replace('/my-files')}>
                        <MaterialIcons name="folder" size={24} color="#fff" />
                        <Text style={styles.bottomNavText}>Files</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.replace('/profile')}>
                        <MaterialIcons name="person" size={24} color="#fff" />
                        <Text style={styles.bottomNavText}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    
    // Header Styles
    header: {
        backgroundColor: '#1E3A8A',
        paddingTop: 50,
        paddingBottom: 20,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    sortButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginRight: 8,
    },
    refreshButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },

    // Search Styles
    searchContainer: {
        paddingHorizontal: 20,
    },
    searchBar: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        color: '#1F2937',
        fontSize: 16,
        marginLeft: 12,
        marginRight: 8,
    },

    // Sort Menu Styles
    sortMenu: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
    },
    sortOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    sortOptionActive: {
        backgroundColor: '#f0f4ff',
    },
    sortOptionText: {
        fontSize: 16,
        color: '#666',
        marginLeft: 12,
    },
    sortOptionTextActive: {
        color: '#1E3A8A',
        fontWeight: '600',
    },

    // Content Styles
    content: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },

    // Stats Section
    statsSection: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
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
        fontSize: 20,
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

    // Notes Container
    notesContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    noteCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 12,
        lineHeight: 24,
    },
    noteMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    authorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
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
    authorDetails: {
        flex: 1,
    },
    authorName: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '500',
    },
    noteDate: {
        color: '#9ca3af',
        fontSize: 12,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f9ff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        color: '#1E3A8A',
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 4,
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
        marginRight: 16,
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
        elevation: 8,
    },
    bottomNavRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 68,
    },
    bottomNavItem: {
        alignItems: 'center',
    },
    activeNavItem: {
        opacity: 1,
    },
    bottomNavText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
    },
});