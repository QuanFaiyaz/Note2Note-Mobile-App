import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NoteDetailsPage() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Parse the parameters
    const noteData = {
        id: params.noteId,
        title: params.title,
        category: params.category,
        author: params.author,
        status: params.status,
        rating: parseFloat(params.rating as string) || 0,
        reviewCount: parseInt(params.reviewCount as string) || 0,
        dateCreated: params.dateCreated,
        summary: params.summary,
        description: params.description,
        keyPoints: params.keyPoints ? JSON.parse(params.keyPoints as string) : []
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <MaterialIcons key={i} name="star" size={16} color="#FFD700" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <MaterialIcons key="half" name="star-half" size={16} color="#FFD700" />
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <MaterialIcons key={`empty-${i}`} name="star-border" size={16} color="#FFD700" />
            );
        }

        return stars;
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => router.replace('/notes')} 
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Note Details</Text>
                </View>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.saveButton}>
                        <MaterialIcons name="bookmark-border" size={24} color="#fff" />
                        <Text style={styles.saveText}>Save to library</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.downloadButton}>
                        <MaterialIcons name="file-download" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.content}>
                {/* App Title */}
                <Text style={styles.appTitle}>Note2Note</Text>

                {/* Note Info Card */}
                <View style={styles.noteCard}>
                    <View style={styles.noteHeader}>
                        <View style={styles.noteMainInfo}>
                            <Text style={styles.noteTitle}>{noteData.title}</Text>
                            <Text style={styles.noteAuthor}>{noteData.author}</Text>
                            <Text style={styles.noteDate}>{noteData.dateCreated}</Text>
                            
                            {/* Verified Badge */}
                            <View style={styles.verifiedBadge}>
                                <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                                <Text style={styles.verifiedText}>Verified</Text>
                            </View>
                        </View>
                    </View>

                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        <View style={styles.ratingStars}>
                            <MaterialIcons name="star" size={16} color="#FFD700" />
                            <Text style={styles.ratingText}>{noteData.rating} (reviews)</Text>
                        </View>
                        <Text style={styles.rateText}>Rate this note:</Text>
                        <View style={styles.starsContainer}>
                            {renderStars(5)}
                        </View>
                    </View>
                </View>

                {/* Note Content */}
                <View style={styles.contentCard}>
                    <Text style={styles.contentTitle}>Note Content</Text>
                    
                    {/* Summary */}
                    <View style={styles.summarySection}>
                        <Text style={styles.summaryTitle}>{noteData.summary}</Text>
                        <Text style={styles.summaryText}>{noteData.description}</Text>
                        
                        {/* Key Points */}
                        <Text style={styles.keyPointsTitle}>Key points:</Text>
                        {noteData.keyPoints.map((point: string, index: number) => (
                            <View key={index} style={styles.bulletPoint}>
                                <Text style={styles.bulletText}>• {point}</Text>
                            </View>
                        ))}
                        
                        <Text style={styles.conceptNote}>
                            It's a core concept in computer science, forming the basis for many algorithms and advanced data structures.
                        </Text>
                    </View>
                </View>
            </ScrollView>
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
    },
    backButton: {
        padding: 4,
    },
    headerContent: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
    },
    saveText: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 4,
    },
    downloadButton: {
        padding: 4,
    },
    content: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E3A8A',
        textAlign: 'center',
        paddingVertical: 16,
    },
    noteCard: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    noteHeader: {
        marginBottom: 16,
    },
    noteMainInfo: {
        marginBottom: 16,
    },
    noteTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    noteAuthor: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    noteDate: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E8',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    verifiedText: {
        color: '#4CAF50',
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 4,
    },
    ratingContainer: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 16,
    },
    ratingStars: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    rateText: {
        fontSize: 14,
        color: '#000',
        marginBottom: 8,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    contentCard: {
        backgroundColor: '#fff',
        margin: 16,
        marginTop: 0,
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    contentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
    },
    summarySection: {
        marginBottom: 16,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 12,
    },
    summaryText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        marginBottom: 16,
    },
    keyPointsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    bulletPoint: {
        marginBottom: 6,
    },
    bulletText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    conceptNote: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        marginTop: 12,
        fontStyle: 'italic',
    },
});