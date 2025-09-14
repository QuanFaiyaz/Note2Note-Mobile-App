import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker'; // ✅ Import DocumentPicker
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function UploadNotePage() {
  const router = useRouter();
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

  // 📂 File Picker function
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf', // PDF
          'application/msword', // DOC
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
          'image/*', // Images
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        console.log('User canceled file picker');
      } else {
        const file = result.assets[0];
        setSelectedFile(file);
        console.log('Picked file:', file);
      }
    } catch (err) {
      console.error('Error picking file:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔵 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/home')} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Note</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Upload & Earn */}
        <View style={styles.sectionBox}>
          <Text style={styles.uploadEarnTitle}>Upload & Earn!</Text>
          <Text style={styles.uploadEarnText}>
            Share your knowledge and earn 10 points for each note upload
          </Text>
        </View>

        {/* File Upload */}
        <View style={styles.sectionBox}>
          <Text style={styles.label}>Upload File (Optional)</Text>
          <View style={styles.uploadBox}>
            <Text style={styles.smallText}>Choose a file to upload (PDF, DOCX, Images)</Text>
            <TouchableOpacity style={styles.chooseFileBtn} onPress={pickFile}>
              <Text style={styles.chooseFileText}>Choose File</Text>
            </TouchableOpacity>

            {/* Show selected file */}
            {selectedFile && (
              <Text style={styles.selectedFileText}>
                Selected: {selectedFile.name}
              </Text>
            )}
          </View>
        </View>

        {/* Note Title */}
        <View style={styles.sectionBox}>
          <Text style={styles.label}>Note Title*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Note Title"
            value={noteTitle}
            onChangeText={setNoteTitle}
          />
        </View>

        {/* Note Content */}
        <View style={styles.sectionBox}>
          <Text style={styles.label}>Note Content</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Type your note content here..."
            multiline
            value={noteContent}
            onChangeText={setNoteContent}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => router.replace('/home')}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.uploadBtn}
            onPress={() => console.log("Uploading note:", { noteTitle, noteContent, selectedFile })}
          >
            <Text style={styles.uploadText}>Upload Note +10</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ✅ Wrap styles in StyleSheet.create
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  // 🔵 Header
  header: {
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  backButton: { marginRight: 12 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#fff' },

  scroll: { padding: 16 },
  sectionBox: { marginBottom: 16 },
  uploadEarnTitle: { fontWeight: 'bold', color: 'green', fontSize: 18 },
  uploadEarnText: { color: 'green', marginTop: 4, fontSize: 14 },
  uploadBox: { borderWidth: 1, borderStyle: 'dashed', padding: 16, alignItems: 'center', borderRadius: 8, marginTop: 8 },
  smallText: { fontSize: 12, color: '#555', marginBottom: 8, textAlign: 'center' },
  chooseFileBtn: { backgroundColor: '#1E3A8A', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6 },
  chooseFileText: { color: '#fff', fontWeight: '600' },
  label: { fontWeight: '600', marginBottom: 6, fontSize: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, backgroundColor: '#f9f9f9', fontSize: 14 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelBtn: { flex: 1, padding: 14, backgroundColor: '#ccc', borderRadius: 8, marginRight: 10, alignItems: 'center' },
  cancelText: { color: '#000', fontWeight: '600' },
  uploadBtn: { flex: 2, padding: 14, backgroundColor: '#1E3A8A', borderRadius: 8, alignItems: 'center' },
  uploadText: { color: '#fff', fontWeight: '600' },
  selectedFileText: {
    marginTop: 8,
    fontSize: 13,
    color: '#1E3A8A',
    fontStyle: 'italic',
  },
});
