import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DiscussionPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [activeYear, setActiveYear] = useState('ALL');

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
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/home')} style={{ position: 'absolute', left: 16, top: 40 }}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
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
                        <TouchableOpacity style={styles.addDiscussionButton}>
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
                        <View key={d.id} style={styles.discussionCard}>
                            <Text style={styles.discussionTitle}>{d.title}</Text>
                            <Text style={styles.discussionContent}>{d.content}</Text>
                            <View style={styles.discussionFooter}>
                                <Text style={styles.discussionDate}>{d.date}</Text>
                                <Text style={styles.discussionReplies}>{d.replies} replies</Text>
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
                    <TouchableOpacity style={styles.bottomNavItem}>
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
});