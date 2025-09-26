import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { listNotes } from '../lib/api';

export default function NotesPage() {
    const router = useRouter();
    const [notes, setNotes] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        loadNotes();
    }, []);

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
                status: note.is_featured ? 'Featured' : 'Public',
                rating: (note.rating || 0).toString(),
                reviewCount: (note.download_count || 0).toString(),
                dateCreated: new Date(note.created_at).toLocaleDateString(),
                summary: note.title,
                description: note.content,
                keyPoints: JSON.stringify([note.content])
            }
        });
    };
 
    return (
        <SafeAreaView style={styles.container}>
            {/* Header/Navigation Bar */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => router.replace('/home')} 
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={40} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <MaterialIcons name="description" size={24} color="#fff" />
                    <Text style={styles.headerTitle}>My notes</Text>
                </View>
                <TouchableOpacity 
                    onPress={loadNotes} 
                    style={styles.refreshButton}
                >
                    <MaterialIcons name="refresh" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={clearUserData} 
                    style={styles.clearButton}
                >
                    <MaterialIcons name="clear" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {/* Main Title */}
                <Text style={styles.mainTitle}>Notes</Text>

                {/* Loading State */}
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loadingText}>Loading notes...</Text>
                    </View>
                ) : (
                    /* Notes List */
                    <View style={styles.notesContainer}>
                        {notes.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <MaterialIcons name="description" size={64} color="#ccc" />
                                <Text style={styles.emptyText}>No notes available</Text>
                                <Text style={styles.emptySubtext}>Be the first to upload a note!</Text>
                            </View>
                        ) : (
                            notes.map((note, index) => (
                                <TouchableOpacity 
                                    key={`note-${note.note_id}`} 
                                    style={styles.noteCard}
                                    onPress={() => handleNotePress(note)}
                                    activeOpacity={0.7}
                                >
                                    {/* Note Header with Action Icons */}
                                    <View style={styles.noteHeader}>
                                        <View style={styles.noteInfo}>
                                            <Text style={styles.noteTitle}>{note.title}</Text>
                                            <Text style={styles.noteCategory}>
                                                {note.subject_name || note.course_name || 'General'}
                                            </Text>
                                            <Text style={styles.noteAuthor}>
                                                By {note.FirstName} {note.LastName}
                                            </Text>
                                        </View>
                                        <View style={styles.noteActions}>
                                            <TouchableOpacity 
                                                style={styles.menuButton}
                                                onPress={(e) => {
                                                    e.stopPropagation();
                                                    // Handle menu action
                                                    console.log('Menu pressed for note:', note.note_id);
                                                }}
                                            >
                                                <MaterialIcons name="more-vert" size={20} color="#666" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {/* Status Tag */}
                                    <View style={styles.statusContainer}>
                                        <View style={styles.verifiedTag}>
                                            <MaterialIcons 
                                                name={note.is_featured ? "star" : "check-circle"} 
                                                size={16} 
                                                color={note.is_featured ? "#FFD700" : "#4CAF50"} 
                                            />
                                            <Text style={styles.verifiedText}>
                                                {note.is_featured ? 'Featured' : 'Public'}
                                            </Text>
                                        </View>
                                        <Text style={styles.dateText}>
                                            {new Date(note.created_at).toLocaleDateString()}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        )}
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
        backgroundColor: '#1E3A8A',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    backButton: {
        marginRight: 16,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 8,
    },
    content: {
        flex: 1,
        backgroundColor: '#1E3A8A',
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    notesContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    noteCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    noteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    noteInfo: {
        flex: 1,
    },
    noteTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    noteCategory: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    noteAuthor: {
        fontSize: 16,
        color: '#666',
    },
    noteActions: {
        alignItems: 'center',
    },
    menuButton: {
        padding: 4,
        marginBottom: 8,
    },
    deleteButton: {
        padding: 4,
    },
    statusContainer: {
        alignItems: 'flex-start',
    },
    verifiedTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E8',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    verifiedText: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 4,
    },
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
        fontFamily: 'sans-serif',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    emptySubtext: {
        color: '#ccc',
        fontSize: 14,
        marginTop: 8,
    },
    dateText: {
        color: '#666',
        fontSize: 12,
        marginLeft: 8,
    },
    refreshButton: {
        marginLeft: 16,
        padding: 8,
    },
    clearButton: {
        marginLeft: 8,
        padding: 8,
    },
});