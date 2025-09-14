import { Feather, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


// This is the main component for your home page, designed to match the provided image.
export default function HomePage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSubject, setActiveSubject] = useState('ALL');

    // Placeholder data for demonstration purposes.
    const myNotes = [
        { id: '1', title: 'Data Structures - Binary Trees', subject: 'Data Structures', sharedBy: 'Euri Jiao' },
        { id: '2', title: 'Data Structures - Linked Lists', subject: 'Data Structures', sharedBy: 'Bryan Cancel' },
        { id: '3', title: 'Calculus Notes', subject: 'Mathematics', sharedBy: 'Hero Buta' },
        { id: '4', title: 'Operating Systems - Process Management', subject: 'IT in the Mondern Era', sharedBy: 'Jedd Cornejo' },
        { id: '5', title: 'Linear Algebra - Matrices', subject: 'Mathematics', sharedBy: 'Cedrick Ipong' },
        { id: '6', title: 'Introduction to Java', subject: 'Object Oriented Programming', sharedBy: 'Jennifer Chio' },
    ];

    // Function to handle the search logic
    const handleSearch = () => {
        console.log(`Searching for: ${searchQuery}`);
        // Implement search functionality here.
    };

    // Function to handle adding a new note
    const handleAddNote = () => {
        console.log("Add new note button pressed.");
        // Navigate to the note creation page here.
    };

    const handleLogout = () => {
        // A temporary action to confirm the button works
        console.log("Temporary logout button pressed.");
        router.replace('/login');
        // Implement your actual logout logic here, such as clearing session data or navigating to a login screen.
    };

    // Helper component for the note cards
    // The w-1/2 class is applied here to ensure two columns.
    type Note = {
        id: string;
        title: string;
        subject: string;
        sharedBy: string;
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

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this note: "${note.title}" shared by ${note.sharedBy}`,
            });
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.noteCardContainer} key={note.id}>
            <View style={styles.noteCard}>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.noteSubject}>{note.subject}</Text>
                <Text style={styles.noteSharedBy}>By {note.sharedBy}</Text>

                {/* Icon row */}
                <View style={styles.noteIconsRow}>
                    {/* ❤️ Like */}
                    <TouchableOpacity style={styles.iconButton} onPress={handleLike}>
                        <MaterialIcons
                            name={isLiked ? "favorite" : "favorite-border"}
                            size={16}
                            color={isLiked ? "red" : "#888"}
                        />
                    </TouchableOpacity>

                    {/* 💬 Comment */}
                    <TouchableOpacity style={styles.iconButton} onPress={handleComment}>
                        <FontAwesome name="commenting-o" size={16} color="#888" />
                    </TouchableOpacity>

                    {/* 🔗 Share */}
                    <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
                        <Feather name="share-2" size={16} color="#888" />
                    </TouchableOpacity>

                    {/* 🔖 Bookmark */}
                    <TouchableOpacity style={styles.iconButton} onPress={handleBookmark}>
                        <FontAwesome
                            name={isBookmarked ? "bookmark" : "bookmark-o"}
                            size={16}
                            color={isBookmarked ? "#1E3A8A" : "#888"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
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
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <MaterialIcons name="logout" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </SafeAreaView>

            {/* Search Bar */}
            <View style={styles.searchBarWrapper}>
                <View style={styles.searchBar}>
                    <View style={styles.searchBarRow}>
                        <Feather name="search" size={20} color="#6B7280" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search notes..."
                            placeholderTextColor="#6B7280"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={handleSearch}
                        />
                    </View>
                </View>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.mainScroll}>
                <View style={styles.subjectsHeaderRow}>
                    <Text style={styles.subjectsHeaderText}>SUBJECTS</Text>
                    <View style={styles.subjectsHeaderButtons}>
                        <TouchableOpacity onPress={handleAddNote} style={styles.addNoteButton}>
                            <Text style={styles.addNoteButtonText}>ADD NOTE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
  onPress={() => router.push('/upload-note')} 
  style={styles.uploadNoteButton}>
    <Text style={styles.uploadNoteButtonText}>Upload a Note</Text>
</TouchableOpacity>

                    </View>
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

                {/* Notes Grid */}
                <View style={styles.notesGrid}>
                    {myNotes.map(note => (
                        <NoteCard key={note.id} note={note} />
                    ))}
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

                    <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.replace('/Profile')}>
                    <MaterialIcons name="person" size={24} color="#FFFFFF" />
                    <Text style={styles.bottomNavText}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6' },
    header: { backgroundColor: '#1E3A8A', paddingTop: 32, paddingBottom: 16 },
    logoutButton: { marginLeft: 16 },
    searchBarWrapper: { marginHorizontal: 16, marginTop: 16, zIndex: 10 },
    searchBar: { backgroundColor: '#fff', padding: 16, borderRadius: 16, elevation: 2 },
    searchBarRow: { flexDirection: 'row', alignItems: 'center' },
    searchInput: { flex: 1, color: '#1F2937', fontSize: 16, marginLeft: 8 },
    mainScroll: { flex: 1, padding: 20 },
    subjectsHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    subjectsHeaderText: { fontSize: 20, fontWeight: 'bold', color: '#1E3A8A' },
    subjectsHeaderButtons: { flexDirection: 'row' },
    addNoteButton: { backgroundColor: '#1E3A8A', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8, marginRight: 8 },
    addNoteButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
    uploadNoteButton: { borderWidth: 2, borderColor: '#1E3A8A', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8 },
    uploadNoteButtonText: { color: '#1E3A8A', fontSize: 14, fontWeight: '600' },
    subjectTabsScroll: { marginBottom: 16 },
    subjectTab: { height: 48, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 999, marginRight: 8, flexDirection: 'row', alignItems: 'center' },
    subjectTabActive: { backgroundColor: '#1E3A8A' },
    subjectTabInactive: { backgroundColor: '#D1D5DB' },
    subjectTabText: { marginLeft: 4, fontSize: 14 },
    subjectTabTextActive: { color: '#fff' },
    subjectTabTextInactive: { color: '#374151' },
    notesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    noteCardContainer: { width: '48%', padding: 4 },
    noteCard: { backgroundColor: '#E5E7EB', padding: 16, borderRadius: 12, marginBottom: 16 },
    noteTitle: { color: '#1F2937', fontWeight: 'bold', marginBottom: 4 },
    noteSubject: { color: '#4B5563', fontSize: 14 },
    noteSharedBy: { color: '#6B7280', fontSize: 12, marginTop: 4 },
    noteIconsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 8 },
    iconButton: { marginLeft: 8 },
    bottomNav: { backgroundColor: '#1E3A8A', elevation: 8 },
    bottomNavRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 68 },
    bottomNavItem: { alignItems: 'center' },
    bottomNavText: { color: '#fff', fontSize: 12, marginTop: 4 },
});
