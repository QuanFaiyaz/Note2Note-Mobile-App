import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotesPage() {
    const router = useRouter();

    const notes = [
        {
            id: 1,
            title: 'Multimedia',
            category: 'Computer Science',
            author: 'By Juan dela',
            status: 'Verified',
            isVerified: true,
            rating: 4.9,
            reviewCount: 7,
            dateCreated: 'Oct 25, 2024',
            content: {
                summary: 'Multimedia - Summary',
                description: 'A comprehensive guide covering multimedia concepts, digital media types, compression techniques, and interactive media development.',
                keyPoints: [
                    'Digital media formats and standards',
                    'Audio and video processing techniques',
                    'Interactive multimedia applications',
                    'Web-based multimedia integration'
                ]
            }
        },
        {
            id: 2,
            title: 'Data Structure',
            category: 'Computer Science',
            author: 'By Juan dela',
            status: 'Verified',
            isVerified: true,
            rating: 4.8,
            reviewCount: 12,
            dateCreated: 'Oct 20, 2024',
            content: {
                summary: 'Data Structures - Binary Trees',
                description: 'A binary tree is a hierarchical data structure where each node has at most two children: left and right.',
                keyPoints: [
                    'Structure: Each node holds data plus pointers to children; root is the top node; leaf nodes have no children; height is the longest root-to-leaf path.',
                    'Types: Full: Every node has 0 or 2 children. Complete: All levels filled except possibly the last. Perfect: All internal nodes have 2 children and leaves are at the same level.',
                    'Operations: Insertion, Deletion, Traversal (In-order, Pre-order, Post-order)',
                    'Applications: Expression trees, Binary Search Trees (BST), heaps, file directories, decision trees.'
                ]
            }
        },
        {
            id: 3,
            title: 'Discrete',
            category: 'Computer Science',
            author: 'By Juan dela',
            status: 'Verified',
            isVerified: true,
            rating: 4.7,
            reviewCount: 9,
            dateCreated: 'Oct 15, 2024',
            content: {
                summary: 'Discrete Mathematics - Summary',
                description: 'Fundamental concepts in discrete mathematics including set theory, logic, combinatorics, and graph theory.',
                keyPoints: [
                    'Set theory and operations',
                    'Propositional and predicate logic',
                    'Combinatorics and counting principles',
                    'Graph theory and algorithms'
                ]
            }
        },
    ];

    const handleNotePress = (note: any) => {
        // Navigate to note details page with the note data
        router.push({
            pathname: '/note-details',
            params: {
                noteId: note.id.toString(),
                title: note.title,
                category: note.category,
                author: note.author,
                status: note.status,
                rating: note.rating.toString(),
                reviewCount: note.reviewCount.toString(),
                dateCreated: note.dateCreated,
                summary: note.content.summary,
                description: note.content.description,
                keyPoints: JSON.stringify(note.content.keyPoints)
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
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <MaterialIcons name="description" size={24} color="#fff" />
                    <Text style={styles.headerTitle}>My notes</Text>
                </View>
            </View>

            <ScrollView style={styles.content}>
                {/* Main Title */}
                <Text style={styles.mainTitle}>Notes</Text>

                {/* Notes List */}
                <View style={styles.notesContainer}>
                    {notes.map((note, index) => (
                        <TouchableOpacity 
                            key={`note-${note.id}`} 
                            style={styles.noteCard}
                            onPress={() => handleNotePress(note)}
                            activeOpacity={0.7}
                        >
                            {/* Note Header with Action Icons */}
                            <View style={styles.noteHeader}>
                                <View style={styles.noteInfo}>
                                    <Text style={styles.noteTitle}>{note.title}</Text>
                                    <Text style={styles.noteCategory}>{note.category}</Text>
                                    <Text style={styles.noteAuthor}>{note.author}</Text>
                                </View>
                                <View style={styles.noteActions}>
                                    <TouchableOpacity 
                                        style={styles.menuButton}
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            // Handle menu action
                                            console.log('Menu pressed for note:', note.id);
                                        }}
                                    >
                                        <MaterialIcons name="more-vert" size={20} color="#666" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={styles.deleteButton}
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            // Handle delete action
                                            console.log('Delete pressed for note:', note.id);
                                        }}
                                    >
                                        <MaterialIcons name="close" size={20} color="#ff4444" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Status Tag */}
                            <View style={styles.statusContainer}>
                                <View style={styles.verifiedTag}>
                                    <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                                    <Text style={styles.verifiedText}>{note.status}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
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
                    <TouchableOpacity style={styles.bottomNavItem}>
                        <FontAwesome5 name="folder" size={22} color="#fff" />
                        <Text style={styles.bottomNavText}>Folder</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomNavItem}>
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
});