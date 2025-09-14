import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DiscussionPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [activeYear, setActiveYear] = useState('ALL');
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [replyModalVisible, setReplyModalVisible] = useState(false);
    const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
    const [replyText, setReplyText] = useState(''); // <-- Add this

    const years = ['ALL', '1st year', '2nd year', '3rd year', '4th year'];

    const discussions = [
        {
            id: 1,
            title: 'What are you?',
            content: "I'm looking for somebody that you used to know",
            date: '2 days ago',
            replies: 5,
        },
        {
            id: 2,
            title: 'What is Github?',
            content: 'By Malupiton\nHow can I move on ?',
            date: '',
            replies: 5,
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
            {/* Add Discussion Modal */}
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={styles.modalContainer}
                    >
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>ADD NEW DISCUSSION</Text>
                            <TouchableOpacity
                                style={styles.modalClose}
                                onPress={() => setModalVisible(false)}
                            >
                                <Ionicons name="close" size={28} color="#222" />
                            </TouchableOpacity>
                            <Text style={styles.modalLabel}>Title</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="Enter discussion title"
                                placeholderTextColor="#444"
                                value={newTitle}
                                onChangeText={setNewTitle}
                            />
                            <Text style={styles.modalLabel}>Description</Text>
                            <TextInput
                                style={styles.modalTextarea}
                                placeholder="Write your discussion description here..."
                                placeholderTextColor="#444"
                                value={newDesc}
                                onChangeText={setNewDesc}
                                multiline
                                numberOfLines={5}
                                textAlignVertical="top"
                            />
                            <TouchableOpacity
                                style={styles.modalSaveBtn}
                                onPress={() => {
                                    // Save logic here
                                    setModalVisible(false);
                                    setNewTitle('');
                                    setNewDesc('');
                                }}
                            >
                                <Text style={styles.modalSaveBtnText}>Save discussion</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>

            {/* Reply Modal */}
            <Modal
                visible={replyModalVisible}
                animationType="fade"
                transparent
                onRequestClose={() => setReplyModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.replyModalContainer}>
                        <Text style={styles.replyModalTitle}>
                            {selectedDiscussion?.title}
                        </Text>
                        <Text style={styles.replyModalContent}>
                            {selectedDiscussion?.content}
                        </Text>
                        <TextInput
                            style={styles.replyInput}
                            placeholder="Write a reply..."
                            placeholderTextColor="#aaa"
                            value={replyText}
                            onChangeText={setReplyText}
                            multiline
                        />
                        <View style={styles.replyModalButtonRow}>
                            <TouchableOpacity
                                style={styles.replyModalCloseBtn}
                                onPress={() => {
                                    setReplyModalVisible(false);
                                    setReplyText('');
                                }}
                            >
                                <Text style={styles.replyModalCloseBtnText}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.replyModalReplyBtn}
                                onPress={() => {
                                    
                                    setReplyModalVisible(false);
                                    setReplyText('');
                                }}
                            >
                                <Text style={styles.replyModalReplyBtnText}>Reply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/home')} style={{ position: 'absolute', left: 16, top: 40 }}>
                    <Ionicons name="arrow-back" size={40} color="#fff" />
                </TouchableOpacity>
                <View style={styles.logoRow}>
                    <Image
                        source={require('../../assets/images/n2nlogo.png')}
                        style={styles.logoImage}
                    />
                    <Text style={styles.logoText}>Note2Note</Text>
                </View>
                <Text style={styles.headerTitle}>DISCUSSION</Text>
            </View>

            <ScrollView style={{ flex: 1 }}>
                {/* Subjects */}
                <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
                    <Text style={styles.subjectsLabel}>SUBJECTS</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: 8, marginBottom: 16 }}
                        contentContainerStyle={{ alignItems: 'center' }}
                    >
                        {years.map((year) => (
                            <TouchableOpacity
                                key={year}
                                onPress={() => setActiveYear(year)}
                                style={[
                                    styles.yearButton,
                                    activeYear === year && styles.yearButtonActive,
                                ]}
                            >
                                <Text style={[
                                    styles.yearButtonText,
                                    activeYear === year && styles.yearButtonTextActive,
                                ]}>
                                    {year}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.addDiscussionButton}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.addDiscussionButtonText}>+ADD DISCUSSION</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    {/* Search */}
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={18} color="#6B7280" style={{ marginRight: 8 }} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Discussion"
                            placeholderTextColor="#6B7280"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>

                {/* Discussion List */}
                <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 }}>
                    {discussions.map((d) => (
                        <View key={`discussion-${d.id}`} style={styles.discussionCard}>
                            <Text style={styles.discussionTitle}>{d.title}</Text>
                            <Text style={styles.discussionContent}>{d.content}</Text>
                            <View style={styles.discussionFooter}>
                                <Text style={styles.discussionDate}>{d.date}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedDiscussion(d);
                                        setReplyModalVisible(true);
                                    }}
                                >
                                    <Text style={styles.discussionReplies}>{d.replies} replies</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
                    <TouchableOpacity style={styles.bottomNavItem}>
                        <MaterialIcons name="groups" size={24} color="#fff" />
                        <Text style={styles.bottomNavText}>Discussion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.replace('/notes')}>
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
    header: {
        backgroundColor: '#1E3A8A',
        paddingTop: 40,
        paddingBottom: 24,
        alignItems: 'center',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    logoImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 6,
    },
    logoText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#7B89C2',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 2,
        marginTop: 2,
    },
    subjectsLabel: {
        color: '#7B89C2',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    yearButton: {
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
    },
    yearButtonActive: {
        backgroundColor: '#7B89C2',
    },
    yearButtonText: {
        color: '#22223B',
        fontSize: 14,
    },
    yearButtonTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addDiscussionButton: {
        backgroundColor: '#7B89C2',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginLeft: 8,
        alignSelf: 'center',
    },
    addDiscussionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 12,
        height: 40,
        marginBottom: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#22223B',
    },
    discussionCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
    },
    discussionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#22223B',
        marginBottom: 6,
    },
    discussionContent: {
        color: '#6B7280',
        fontSize: 14,
        marginBottom: 10,
    },
    discussionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    discussionDate: {
        color: '#9CA3AF',
        fontSize: 12,
    },
    discussionReplies: {
        color: '#9CA3AF',
        fontSize: 12,
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
    bottomNavText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
        fontFamily: 'sans-serif',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 24,
        alignSelf: 'center',
    },
    modalContent: {
        position: 'relative',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 18,
        letterSpacing: 1,
    },
    modalClose: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 4,
    },
    modalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 6,
    },
    modalInput: {
        backgroundColor: '#e5e5e5',
        borderRadius: 2,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 15,
        marginBottom: 8,
    },
    modalTextarea: {
        backgroundColor: '#e5e5e5',
        borderRadius: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 15,
        minHeight: 100,
        marginBottom: 18,
    },
    modalSaveBtn: {
        backgroundColor: '#7B89C2',
        borderRadius: 2,
        paddingVertical: 10,
        paddingHorizontal: 18,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    modalSaveBtnText: {
        color: '#fff',
        fontSize: 15,
    },
    replyModalContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 24,
        width: 320,
        alignSelf: 'center',
        alignItems: 'flex-start',
    },
    replyModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#22223B',
    },
    replyModalContent: {
        fontSize: 15,
        color: '#9CA3AF',
        marginBottom: 28,
    },
    replyModalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    replyModalCloseBtn: {
        backgroundColor: '#e5e5e5',
        borderRadius: 2,
        paddingVertical: 10,
        paddingHorizontal: 24,
        marginRight: 12,
    },
    replyModalCloseBtnText: {
        color: '#22223B',
        fontSize: 15,
    },
    replyModalReplyBtn: {
        backgroundColor: '#7B89C2',
        borderRadius: 2,
        paddingVertical: 10,
        paddingHorizontal: 24,
    },
    replyModalReplyBtnText: {
        color: '#fff',
        fontSize: 15,
    },
    replyInput: {
        backgroundColor: '#f3f4f6',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 15,
        color: '#22223B',
        width: '100%',
        minHeight: 40,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
});