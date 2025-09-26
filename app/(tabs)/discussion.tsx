import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DiscussionPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [activeYear, setActiveYear] = useState('ALL');
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [replyModalVisible, setReplyModalVisible] = useState(false);
    const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
    const [replyText, setReplyText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredDiscussions, setFilteredDiscussions] = useState<any[]>([]);

    const years = ['ALL', '1st year', '2nd year', '3rd year', '4th year'];

    const discussions = [
        {
            id: 1,
            title: 'What are you?',
            content: "I'm looking for somebody that you used to know",
            date: '2 days ago',
            replies: 5,
            author: 'John Doe',
            year: '1st year',
            likes: 12,
            views: 45,
        },
        {
            id: 2,
            title: 'What is Github?',
            content: 'By Malupiton\nHow can I move on ?',
            date: '1 week ago',
            replies: 5,
            author: 'Jane Smith',
            year: '2nd year',
            likes: 8,
            views: 32,
        },
        {
            id: 3,
            title: 'Best practices for React Native development',
            content: 'Looking for tips and tricks from experienced developers',
            date: '3 days ago',
            replies: 12,
            author: 'Mike Johnson',
            year: '3rd year',
            likes: 25,
            views: 78,
        },
    ];

    // Filter discussions based on search and year
    React.useEffect(() => {
        let filtered = [...discussions];

        // Apply search filter
        if (search.trim()) {
            filtered = filtered.filter(discussion =>
                discussion.title.toLowerCase().includes(search.toLowerCase()) ||
                discussion.content.toLowerCase().includes(search.toLowerCase()) ||
                discussion.author.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply year filter
        if (activeYear !== 'ALL') {
            filtered = filtered.filter(discussion => discussion.year === activeYear);
        }

        setFilteredDiscussions(filtered);
    }, [search, activeYear]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
            {/* Add Discussion Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={styles.modalContainer}
                    >
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Start New Discussion</Text>
                                <TouchableOpacity
                                    style={styles.modalClose}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Ionicons name="close" size={24} color="#666" />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.modalBody}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.modalLabel}>Discussion Title</Text>
                                    <TextInput
                                        style={styles.modalInput}
                                        placeholder="What would you like to discuss?"
                                        placeholderTextColor="#9CA3AF"
                                        value={newTitle}
                                        onChangeText={setNewTitle}
                                    />
                                </View>
                                
                                <View style={styles.inputGroup}>
                                    <Text style={styles.modalLabel}>Description</Text>
                                    <TextInput
                                        style={styles.modalTextarea}
                                        placeholder="Share your thoughts, ask questions, or start a conversation..."
                                        placeholderTextColor="#9CA3AF"
                                        value={newDesc}
                                        onChangeText={setNewDesc}
                                        multiline
                                        numberOfLines={6}
                                        textAlignVertical="top"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.modalFooter}>
                                <TouchableOpacity
                                    style={styles.modalCancelBtn}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.modalCancelBtnText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalSaveBtn, (!newTitle.trim() || !newDesc.trim()) && styles.modalSaveBtnDisabled]}
                                    onPress={() => {
                                        if (newTitle.trim() && newDesc.trim()) {
                                            setIsLoading(true);
                                            // Simulate API call
                                            setTimeout(() => {
                                                setIsLoading(false);
                                                setModalVisible(false);
                                                setNewTitle('');
                                                setNewDesc('');
                                            }, 1000);
                                        }
                                    }}
                                    disabled={!newTitle.trim() || !newDesc.trim() || isLoading}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color="#fff" size="small" />
                                    ) : (
                                        <Text style={styles.modalSaveBtnText}>Start Discussion</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>

            {/* Reply Modal */}
            <Modal
                visible={replyModalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setReplyModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={styles.replyModalContainer}
                    >
                        <View style={styles.replyModalContent}>
                            <View style={styles.replyModalHeader}>
                                <Text style={styles.replyModalTitle}>
                                    {selectedDiscussion?.title}
                                </Text>
                                <TouchableOpacity
                                    style={styles.replyModalClose}
                                    onPress={() => {
                                        setReplyModalVisible(false);
                                        setReplyText('');
                                    }}
                                >
                                    <Ionicons name="close" size={24} color="#666" />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.replyModalBody}>
                                <View style={styles.originalPost}>
                                    <View style={styles.originalPostHeader}>
                                        <View style={styles.originalAuthorAvatar}>
                                            <Text style={styles.originalAuthorInitial}>
                                                {selectedDiscussion?.author?.charAt(0)}
                                            </Text>
                                        </View>
                                        <View style={styles.originalAuthorInfo}>
                                            <Text style={styles.originalAuthorName}>
                                                {selectedDiscussion?.author}
                                            </Text>
                                            <Text style={styles.originalPostDate}>
                                                {selectedDiscussion?.date}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.originalPostContent}>
                                        {selectedDiscussion?.content}
                                    </Text>
                                </View>
                                
                                <View style={styles.replySection}>
                                    <Text style={styles.replyLabel}>Your Reply</Text>
                                    <TextInput
                                        style={styles.replyInput}
                                        placeholder="Share your thoughts..."
                                        placeholderTextColor="#9CA3AF"
                                        value={replyText}
                                        onChangeText={setReplyText}
                                        multiline
                                        numberOfLines={4}
                                        textAlignVertical="top"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.replyModalFooter}>
                                <TouchableOpacity
                                    style={styles.replyModalCancelBtn}
                                    onPress={() => {
                                        setReplyModalVisible(false);
                                        setReplyText('');
                                    }}
                                >
                                    <Text style={styles.replyModalCancelBtnText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.replyModalReplyBtn, !replyText.trim() && styles.replyModalReplyBtnDisabled]}
                                    onPress={() => {
                                        if (replyText.trim()) {
                                            setIsLoading(true);
                                            // Simulate API call
                                            setTimeout(() => {
                                                setIsLoading(false);
                                                setReplyModalVisible(false);
                                                setReplyText('');
                                            }, 1000);
                                        }
                                    }}
                                    disabled={!replyText.trim() || isLoading}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color="#fff" size="small" />
                                    ) : (
                                        <Text style={styles.replyModalReplyBtnText}>Post Reply</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity 
                        onPress={() => router.replace('/home')} 
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Discussion</Text>
                    <TouchableOpacity 
                        onPress={() => setModalVisible(true)} 
                        style={styles.addButton}
                    >
                        <Ionicons name="add" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerContent}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/images/n2nlogo.png')}
                            style={styles.logoImage}
                        />
                    </View>
                    <Text style={styles.welcomeText}>Join the conversation</Text>
                    <Text style={styles.subtitleText}>Share ideas, ask questions, and learn together</Text>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Stats Section */}
                <View style={styles.statsSection}>
                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <Ionicons name="chatbubbles" size={24} color="#1E3A8A" />
                            <Text style={styles.statNumber}>{filteredDiscussions.length}</Text>
                            <Text style={styles.statLabel}>Discussions</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Ionicons name="people" size={24} color="#10B981" />
                            <Text style={styles.statNumber}>
                                {filteredDiscussions.reduce((sum, d) => sum + d.replies, 0)}
                            </Text>
                            <Text style={styles.statLabel}>Total Replies</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Ionicons name="eye" size={24} color="#F59E0B" />
                            <Text style={styles.statNumber}>
                                {filteredDiscussions.reduce((sum, d) => sum + d.views, 0)}
                            </Text>
                            <Text style={styles.statLabel}>Total Views</Text>
                        </View>
                    </View>
                </View>

                {/* Search and Filter Section */}
                <View style={styles.searchSection}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search discussions, topics, or authors..."
                            placeholderTextColor="#9CA3AF"
                            value={search}
                            onChangeText={setSearch}
                        />
                        {search.length > 0 && (
                            <TouchableOpacity onPress={() => setSearch('')}>
                                <Ionicons name="close-circle" size={20} color="#666" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Year Filter */}
                <View style={styles.filterSection}>
                    <Text style={styles.filterTitle}>Filter by Year</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.filterScroll}
                        contentContainerStyle={styles.filterContainer}
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
                    </ScrollView>
                </View>

                {/* Discussion List */}
                <View style={styles.discussionsSection}>
                    <View style={styles.discussionsHeader}>
                        <Text style={styles.discussionsTitle}>
                            {search || activeYear !== 'ALL' ? 'Search Results' : 'Recent Discussions'}
                        </Text>
                        {(search || activeYear !== 'ALL') && (
                            <Text style={styles.resultsText}>
                                {filteredDiscussions.length} result{filteredDiscussions.length !== 1 ? 's' : ''} found
                            </Text>
                        )}
                    </View>

                    <View style={styles.discussionsContainer}>
                        {filteredDiscussions.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <View style={styles.emptyIconContainer}>
                                    <Ionicons name="chatbubbles-outline" size={64} color="#d1d5db" />
                                </View>
                                <Text style={styles.emptyText}>
                                    {search || activeYear !== 'ALL' ? 'No discussions found' : 'No discussions available'}
                                </Text>
                                <Text style={styles.emptySubtext}>
                                    {search || activeYear !== 'ALL' 
                                        ? 'Try adjusting your search or filter' 
                                        : 'Be the first to start a discussion!'
                                    }
                                </Text>
                                {!search && activeYear === 'ALL' && (
                                    <TouchableOpacity 
                                        onPress={() => setModalVisible(true)} 
                                        style={styles.emptyActionButton}
                                    >
                                        <Text style={styles.emptyActionText}>Start Discussion</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ) : (
                            filteredDiscussions.map((d) => (
                                <TouchableOpacity 
                                    key={`discussion-${d.id}`} 
                                    style={styles.discussionCard}
                                    onPress={() => {
                                        setSelectedDiscussion(d);
                                        setReplyModalVisible(true);
                                    }}
                                    activeOpacity={0.7}
                                >
                                    {/* Card Header */}
                                    <View style={styles.discussionCardHeader}>
                                        <View style={styles.authorInfo}>
                                            <View style={styles.authorAvatar}>
                                                <Text style={styles.authorInitial}>
                                                    {d.author.charAt(0)}
                                                </Text>
                                            </View>
                                            <View style={styles.authorDetails}>
                                                <Text style={styles.authorName}>{d.author}</Text>
                                                <Text style={styles.discussionDate}>{d.date}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.yearBadge}>
                                            <Text style={styles.yearBadgeText}>{d.year}</Text>
                                        </View>
                                    </View>

                                    {/* Card Content */}
                                    <View style={styles.discussionCardContent}>
                                        <Text style={styles.discussionTitle} numberOfLines={2}>{d.title}</Text>
                                        <Text style={styles.discussionContent} numberOfLines={3}>{d.content}</Text>
                                    </View>

                                    {/* Card Footer */}
                                    <View style={styles.discussionCardFooter}>
                                        <View style={styles.discussionStats}>
                                            <View style={styles.statItem}>
                                                <Ionicons name="chatbubble" size={16} color="#666" />
                                                <Text style={styles.statText}>{d.replies}</Text>
                                            </View>
                                            <View style={styles.statItem}>
                                                <Ionicons name="heart" size={16} color="#666" />
                                                <Text style={styles.statText}>{d.likes}</Text>
                                            </View>
                                            <View style={styles.statItem}>
                                                <Ionicons name="eye" size={16} color="#666" />
                                                <Text style={styles.statText}>{d.views}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.replyButton}>
                                            <Ionicons name="arrow-forward" size={16} color="#1E3A8A" />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
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
    // Header Styles
    header: {
        backgroundColor: '#1E3A8A',
        paddingTop: 50,
        paddingBottom: 32,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContent: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    logoImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    subtitleText: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },

    // Content Styles
    content: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },

    // Stats Section
    statsSection: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },

    // Search Section
    searchSection: {
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        paddingHorizontal: 16,
        height: 56,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1a1a1a',
        paddingVertical: 0,
    },

    // Filter Section
    filterSection: {
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    filterTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
    },
    filterScroll: {
        marginBottom: 8,
    },
    filterContainer: {
        paddingRight: 24,
    },
    yearButton: {
        backgroundColor: '#f3f4f6',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    yearButtonActive: {
        backgroundColor: '#1E3A8A',
        borderColor: '#1E3A8A',
    },
    yearButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    yearButtonTextActive: {
        color: '#fff',
        fontWeight: '600',
    },

    // Discussions Section
    discussionsSection: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    discussionsHeader: {
        marginBottom: 16,
    },
    discussionsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    resultsText: {
        fontSize: 14,
        color: '#666',
    },
    discussionsContainer: {
        gap: 16,
    },

    // Discussion Cards
    discussionCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },
    discussionCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    authorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    authorAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1E3A8A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    authorInitial: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    authorDetails: {
        flex: 1,
    },
    authorName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 2,
    },
    discussionDate: {
        fontSize: 12,
        color: '#666',
    },
    yearBadge: {
        backgroundColor: '#f0f9ff',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    yearBadgeText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#1E3A8A',
    },
    discussionCardContent: {
        marginBottom: 16,
    },
    discussionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
        lineHeight: 24,
    },
    discussionContent: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    discussionCardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    discussionStats: {
        flexDirection: 'row',
        gap: 16,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    replyButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f0f9ff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Empty State
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 40,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f9fafb',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    emptyActionButton: {
        backgroundColor: '#1E3A8A',
        borderRadius: 16,
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    emptyActionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
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
    bottomNavText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
        fontFamily: 'sans-serif',
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 12,
    },
    modalContent: {
        padding: 24,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    modalClose: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBody: {
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    modalInput: {
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#1a1a1a',
    },
    modalTextarea: {
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#1a1a1a',
        minHeight: 120,
        textAlignVertical: 'top',
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    modalCancelBtn: {
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    modalCancelBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    modalSaveBtn: {
        backgroundColor: '#1E3A8A',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 12,
        minWidth: 120,
        alignItems: 'center',
    },
    modalSaveBtnDisabled: {
        backgroundColor: '#9ca3af',
    },
    modalSaveBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },

    // Reply Modal Styles
    replyModalContainer: {
        width: '90%',
        maxWidth: 500,
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 12,
    },
    replyModalContent: {
        flex: 1,
        padding: 24,
    },
    replyModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    replyModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        flex: 1,
        marginRight: 16,
    },
    replyModalClose: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    replyModalBody: {
        flex: 1,
    },
    originalPost: {
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    originalPostHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    originalAuthorAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#1E3A8A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    originalAuthorInitial: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    originalAuthorInfo: {
        flex: 1,
    },
    originalAuthorName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 2,
    },
    originalPostDate: {
        fontSize: 12,
        color: '#666',
    },
    originalPostContent: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    replySection: {
        marginBottom: 20,
    },
    replyLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    replyInput: {
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#1a1a1a',
        minHeight: 100,
        textAlignVertical: 'top',
    },
    replyModalFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    replyModalCancelBtn: {
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    replyModalCancelBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    replyModalReplyBtn: {
        backgroundColor: '#1E3A8A',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 12,
        minWidth: 120,
        alignItems: 'center',
    },
    replyModalReplyBtnDisabled: {
        backgroundColor: '#9ca3af',
    },
    replyModalReplyBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
});