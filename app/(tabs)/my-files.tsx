import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const files = [
  {
    id: '1',
    title: 'System Integration',
    notes: 2,
    category: 'Programming and algorithm',
    lastModified: '2 days ago',
    size: '2.4 MB',
    type: 'pdf',
    color: '#3B82F6',
  },
  {
    id: '2',
    title: 'Networking Fundamentals',
    notes: 2,
    category: 'Programming and algorithm',
    lastModified: '1 week ago',
    size: '1.8 MB',
    type: 'docx',
    color: '#10B981',
  },
  {
    id: '3',
    title: 'Research Paper Template',
    notes: 2,
    category: 'Programming and algorithm',
    lastModified: '3 days ago',
    size: '3.2 MB',
    type: 'pdf',
    color: '#F59E0B',
  },
  {
    id: '4',
    title: 'Database Design Notes',
    notes: 1,
    category: 'Database Management',
    lastModified: '5 days ago',
    size: '1.5 MB',
    type: 'pptx',
    color: '#8B5CF6',
  },
  {
    id: '5',
    title: 'Web Development Guide',
    notes: 3,
    category: 'Web Technologies',
    lastModified: '1 day ago',
    size: '4.1 MB',
    type: 'pdf',
    color: '#EF4444',
  },
];

export default function MyFilesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredFiles, setFilteredFiles] = useState(files);

  const categories = ['All', 'Programming and algorithm', 'Database Management', 'Web Technologies'];

  // Filter files based on search and category
  React.useEffect(() => {
    let filtered = [...files];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(file =>
        file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(file => file.category === selectedCategory);
    }

    setFilteredFiles(filtered);
  }, [searchQuery, selectedCategory]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'document-text';
      case 'docx':
        return 'document';
      case 'pptx':
        return 'easel';
      default:
        return 'document-outline';
    }
  };

  const handleFilePress = (file: any) => {
    Alert.alert(
      file.title,
      `Category: ${file.category}\nSize: ${file.size}\nLast Modified: ${file.lastModified}\nNotes: ${file.notes}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open', onPress: () => console.log('Opening file:', file.title) },
        { text: 'Share', onPress: () => console.log('Sharing file:', file.title) },
      ]
    );
  };

  const handleDeleteFile = (fileId: string) => {
    Alert.alert(
      'Delete File',
      'Are you sure you want to delete this file? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
              setIsLoading(false);
              Alert.alert('Success', 'File deleted successfully');
            }, 1000);
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity 
              onPress={() => router.replace('/home')} 
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Files</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Ionicons name="folder" size={32} color="#fff" />
            </View>
            <Text style={styles.welcomeText}>Organize Your Files</Text>
            <Text style={styles.subtitleText}>Keep your documents organized and accessible</Text>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Ionicons name="document-text" size={24} color="#1E3A8A" />
                <Text style={styles.statNumber}>{filteredFiles.length}</Text>
                <Text style={styles.statLabel}>Total Files</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="folder" size={24} color="#10B981" />
                <Text style={styles.statNumber}>{categories.length - 1}</Text>
                <Text style={styles.statLabel}>Categories</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="cloud-download" size={24} color="#F59E0B" />
                <Text style={styles.statNumber}>
                  {filteredFiles.reduce((sum, file) => sum + file.notes, 0)}
                </Text>
                <Text style={styles.statLabel}>Total Notes</Text>
              </View>
            </View>
          </View>

          {/* Search Section */}
          <View style={styles.searchSection}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search files by name or category..."
                placeholderTextColor="#9CA3AF"
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

          {/* Category Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Filter by Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
              contentContainerStyle={styles.filterContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonActive,
                  ]}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.categoryButtonTextActive,
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Files Section */}
          <View style={styles.filesSection}>
            <View style={styles.filesHeader}>
              <Text style={styles.filesTitle}>
                {searchQuery || selectedCategory !== 'All' ? 'Search Results' : 'All Files'}
              </Text>
              {(searchQuery || selectedCategory !== 'All') && (
                <Text style={styles.resultsText}>
                  {filteredFiles.length} file{filteredFiles.length !== 1 ? 's' : ''} found
                </Text>
              )}
            </View>

            <View style={styles.filesContainer}>
              {filteredFiles.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <View style={styles.emptyIconContainer}>
                    <Ionicons name="folder-open-outline" size={64} color="#d1d5db" />
                  </View>
                  <Text style={styles.emptyText}>
                    {searchQuery || selectedCategory !== 'All' ? 'No files found' : 'No files available'}
                  </Text>
                  <Text style={styles.emptySubtext}>
                    {searchQuery || selectedCategory !== 'All' 
                      ? 'Try adjusting your search or filter' 
                      : 'Upload your first file to get started!'
                    }
                  </Text>
                  {!searchQuery && selectedCategory === 'All' && (
                    <TouchableOpacity style={styles.emptyActionButton}>
                      <Text style={styles.emptyActionText}>Upload File</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                filteredFiles.map((file) => (
                  <TouchableOpacity
                    key={file.id}
                    style={styles.fileCard}
                    onPress={() => handleFilePress(file)}
                    activeOpacity={0.7}
                  >
                    {/* File Header */}
                    <View style={styles.fileCardHeader}>
                      <View style={styles.fileIconContainer}>
                        <View style={[styles.fileIcon, { backgroundColor: file.color }]}>
                          <Ionicons name={getFileIcon(file.type)} size={24} color="#fff" />
                        </View>
                        <View style={styles.fileInfo}>
                          <Text style={styles.fileTitle} numberOfLines={1}>{file.title}</Text>
                          <Text style={styles.fileCategory}>{file.category}</Text>
                        </View>
                      </View>
                      <View style={styles.fileActions}>
                        <TouchableOpacity 
                          style={styles.actionButton}
                          onPress={() => handleFilePress(file)}
                        >
                          <Ionicons name="eye" size={16} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.actionButton}
                          onPress={() => handleDeleteFile(file.id)}
                        >
                          <Ionicons name="trash" size={16} color="#ef4444" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* File Details */}
                    <View style={styles.fileCardContent}>
                      <View style={styles.fileDetails}>
                        <View style={styles.detailItem}>
                          <Ionicons name="document-text" size={14} color="#666" />
                          <Text style={styles.detailText}>{file.notes} notes</Text>
                        </View>
                        <View style={styles.detailItem}>
                          <Ionicons name="time" size={14} color="#666" />
                          <Text style={styles.detailText}>{file.lastModified}</Text>
                        </View>
                        <View style={styles.detailItem}>
                          <Ionicons name="cloud-download" size={14} color="#666" />
                          <Text style={styles.detailText}>{file.size}</Text>
                        </View>
                      </View>
                    </View>

                    {/* File Footer */}
                    <View style={styles.fileCardFooter}>
                      <View style={styles.fileTypeBadge}>
                        <Text style={styles.fileTypeText}>{file.type.toUpperCase()}</Text>
                      </View>
                      <TouchableOpacity style={styles.shareButton}>
                        <Ionicons name="share" size={16} color="#1E3A8A" />
                        <Text style={styles.shareButtonText}>Share</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </View>
        </ScrollView>

        {/* Loading Overlay */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1E3A8A" />
              <Text style={styles.loadingText}>Processing...</Text>
            </View>
          </View>
        )}

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
            <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.replace('/notes')}>
              <MaterialIcons name="notes" size={24} color="#fff" />
              <Text style={styles.bottomNavText}>Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomNavItem}>
              <MaterialIcons name="folder" size={24} color="#fff" />
              <Text style={styles.bottomNavText}>Files</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.replace('/profile')}>
              <MaterialIcons name="person" size={24} color="#fff" />
              <Text style={styles.bottomNavText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  gradient: {
    flex: 1,
  },

  // Header Styles
  header: {
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
    paddingBottom: 20,
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
  categoryButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryButtonActive: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  // Files Section
  filesSection: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  filesHeader: {
    marginBottom: 16,
  },
  filesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
  },
  filesContainer: {
    gap: 16,
  },

  // File Cards
  fileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  fileCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  fileIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  fileInfo: {
    flex: 1,
  },
  fileTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  fileCategory: {
    fontSize: 12,
    color: '#666',
  },
  fileActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileCardContent: {
    marginBottom: 16,
  },
  fileDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  fileCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileTypeBadge: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  fileTypeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  shareButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E3A8A',
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

  // Loading Overlay
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 12,
  },

  // Bottom Navigation
  bottomNav: {
    backgroundColor: '#1E3A8A',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bottomNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 68,
    paddingBottom: 8,
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