import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';

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
    const NoteCard = ({ note }) => (
        <View className="w-1/2 p-2">
            <View className="bg-gray-200 p-4 rounded-lg mb-4">
                <Text className="text-gray-800 font-bold mb-1">{note.title}</Text>
                <Text className="text-gray-600 text-sm">{note.subject}</Text>
                <Text className="text-gray-500 text-xs mt-1">By {note.sharedBy}</Text>
                <View className="flex-row items-center justify-end mt-2">
                    {/* Icons from MaterialIcons, FontAwesome, and Feather */}
                    <TouchableOpacity className="ml-2">
                        <MaterialIcons name="favorite-border" size={16} color="#888" />
                    </TouchableOpacity>
                    <TouchableOpacity className="ml-2">
                        <FontAwesome name="commenting-o" size={16} color="#888" />
                    </TouchableOpacity>
                    <TouchableOpacity className="ml-2">
                        <Feather name="share-2" size={16} color="#888" />
                    </TouchableOpacity>
                    {/* Bookmark Icon */}
                    <TouchableOpacity className="ml-2">
                        <FontAwesome name="bookmark-o" size={16} color="#888" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    // A mapping to get the correct icon for each subject
    const getSubjectIcon = (subjectName) => {
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

    return (
        <View className="flex-1 bg-gray-100">
            {/* Dark Blue Header */}
            <SafeAreaView className="bg-blue-900 h-24 w-full pt-8 pb-4">
                <TouchableOpacity onPress={handleLogout} className="ml-4 justify-around">
                    <MaterialIcons name="logout" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                {/* This header is now just for the top area, no search bar here anymore */}
            </SafeAreaView>

            {/* Search bar section, now placed below the header */}
            <View className="mx-4 mt-4 z-10">
                <View className="bg-white p-4 rounded-xl shadow-sm">
                    <View className="flex-row items-center">
                        <Feather name="search" size={20} color="#6B7280" />
                        <TextInput
                            className="flex-1 text-gray-800 text-base ml-2"
                            placeholder="Search notes..."
                            placeholderTextColor="#6B7280"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={handleSearch}
                        />
                    </View>
                </View>
            </View>

            {/* Main scrollable content with padding */}
            <ScrollView className="flex-1 p-5">
                {/* Subjects and Add Note button */}
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-bold text-blue-900">SUBJECTS</Text>
                    <View className="flex-row">
                        <TouchableOpacity onPress={handleAddNote} className="bg-blue-900 rounded-full px-4 py-2 mr-2">
                            <Text className="text-white text-sm font-semibold">ADD NOTE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('Upload a Note pressed')} className="border-2 border-blue-900 rounded-full px-4 py-2">
                            <Text className="text-blue-900 text-sm font-semibold">Upload a Note</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Subject tabs with icons */}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mb-4">
                    {['ALL', 'Subject 1', 'Subject 2', 'Subject 3', 'Subject 4'].map(subject => (
                        <TouchableOpacity
                            key={subject}
                            onPress={() => setActiveSubject(subject)}
                            className={`h-12 py-2 px-4 rounded-full mr-2 flex-row items-center ${activeSubject === subject ? 'bg-blue-900' : 'bg-gray-300'}`}
                        >
                            {getSubjectIcon(subject)}
                            <Text className={`ml-1 ${activeSubject === subject ? 'text-white' : 'text-gray-700'}`}>
                                {subject}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Notes content in a grid */}
                <View className="flex-row flex-wrap justify-between">
                    {myNotes.map(note => (
                        <NoteCard key={note.id} note={note} />
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Navigation Bar */}
            <SafeAreaView className="bg-blue-900 shadow-lg">
                <View className="flex-row justify-around items-center h-17">
                    {/* Home Icon */}
                    <TouchableOpacity className="items-center">
                        <MaterialIcons name="home" size={24} color="#FFFFFF" />
                        <Text className="text-white text-xs mt-1">Home</Text>
                    </TouchableOpacity>

                    {/* Discussion Icon */}
                    <TouchableOpacity className="items-center">
                        <MaterialIcons name="groups" size={24} color="#FFFFFF" />
                        <Text className="text-white text-xs mt-1">Discussion</Text>
                    </TouchableOpacity>

                    {/* Notes Icon */}
                    <TouchableOpacity className="items-center">
                        <MaterialIcons name="notes" size={24} color="#FFFFFF" />
                        <Text className="text-white text-xs mt-1">Notes</Text>
                    </TouchableOpacity>

                    {/* Files Icon */}
                    <TouchableOpacity className="items-center">
                        <MaterialIcons name="folder" size={24} color="#FFFFFF" />
                        <Text className="text-white text-xs mt-1">Files</Text>
                    </TouchableOpacity>

                    {/* Profile Icon */}
                    <TouchableOpacity className="items-center">
                        <MaterialIcons name="person" size={24} color="#FFFFFF" />
                        <Text className="text-white text-xs mt-1">Profile</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
