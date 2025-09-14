import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const files = [
  {
    id: '1',
    title: 'System Integration',
    notes: 2,
    category: 'Programming and algorithm',
  },
  {
    id: '2',
    title: 'Networking',
    notes: 2,
    category: 'Programming and algorithm',
  },
  {
    id: '3',
    title: 'Research Paper',
    notes: 2,
    category: 'Programming and algorithm',
  },
];

export default function MyFilesScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#1A2A4B', '#4A7BD9']}/*use npx expo-linear-gradient to create gradient*/
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace('/home')}>
            <Ionicons name="arrow-back" size={40} color="#fff" />
          </TouchableOpacity>
          <Ionicons name="document-text-outline" size={24} color="#fff" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>My Files</Text>
        </View>

        {/* Title */}
        <Text style={styles.organizeTitle}>Organize by Files</Text>

        {/* Files List */}
        <FlatList
          data={files}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardIcons}>
                  <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={20} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteIcon}>
                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 18, marginTop: 16 }}>✖</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.cardNotes}>{item.notes} notes</Text>
              <Text style={styles.cardCategory}>{item.category}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
  },
  headerIcon: {
    marginLeft: 20,
    marginRight: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    backgroundColor: '#2C3E5D',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  organizeTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    marginLeft: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    elevation: 2,
    position: 'relative',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  cardIcons: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  cardNotes: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  cardCategory: {
    fontSize: 13,
    color: '#888',
  },
  deleteIcon: {
    marginTop: 16, // Increased spacing between icons
  },
});