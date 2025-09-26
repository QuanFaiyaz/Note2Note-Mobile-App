import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { getUserProfile } from '../lib/api';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const currentUserData = await AsyncStorage.getItem('currentUser');
      if (currentUserData) {
        const currentUser = JSON.parse(currentUserData);
        console.log('Loading profile for user ID:', currentUser.user_id);
        
        // Fetch detailed profile data from API
        const response = await getUserProfile(currentUser.user_id);
        console.log('Profile API response:', response);
        
        if (response.ok && response.user) {
          setUser(response.user);
        } else {
          // Fallback to basic user data from AsyncStorage
          setUser(currentUser);
        }
      } else {
        Alert.alert('Error', 'Please log in to view your profile.');
        router.replace('/login');
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
      Alert.alert('Error', 'Failed to load profile data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('currentUser');
      console.log("User logged out successfully.");
      Alert.alert('Success', 'Logged out successfully!');
      router.replace("/login");
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E3A8A" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => router.replace('/home')}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Profile</Text>

            <TouchableOpacity
              onPress={loadUserData}
              style={styles.refreshButton}
            >
              <MaterialIcons name="refresh" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            {/* Profile Picture */}
            <View style={styles.profilePictureContainer}>
              <View style={styles.profilePicture}>
                <Ionicons name="person" size={40} color="#1E3A8A" />
              </View>
              <TouchableOpacity style={styles.editPictureButton}>
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Profile Info */}
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user ? `${user.FirstName} ${user.LastName}` : 'Unknown User'}
              </Text>
              <Text style={styles.profileEmail}>
                {user ? user.Email : 'No email'}
              </Text>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Ionicons name="document-text" size={20} color="#1E3A8A" />
                <Text style={styles.statNumber}>{user?.note_count || 0}</Text>
                <Text style={styles.statLabel}>Notes</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="bookmark" size={20} color="#1E3A8A" />
                <Text style={styles.statNumber}>{user?.bookmark_count || 0}</Text>
                <Text style={styles.statLabel}>Bookmarks</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="star" size={20} color="#1E3A8A" />
                <Text style={styles.statNumber}>
                  {user ? ((user.note_count || 0) * 10 + (user.bookmark_count || 0) * 5) : 0}
                </Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/personal-data')}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="person-circle-outline" size={24} color="#1E3A8A" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuText}>Personal Data</Text>
                  <Text style={styles.menuSubtext}>View your personal information</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/edit-profile')}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="create-outline" size={24} color="#1E3A8A" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuText}>Edit Profile</Text>
                  <Text style={styles.menuSubtext}>Update your profile details</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/my-dashboard')}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="stats-chart-outline" size={24} color="#1E3A8A" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuText}>My Dashboard</Text>
                  <Text style={styles.menuSubtext}>View your activity and stats</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="notifications-outline" size={24} color="#1E3A8A" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuText}>Notifications</Text>
                  <Text style={styles.menuSubtext}>Manage your notifications</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="shield-checkmark-outline" size={24} color="#1E3A8A" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuText}>Privacy & Security</Text>
                  <Text style={styles.menuSubtext}>Manage your privacy settings</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <SafeAreaView style={styles.bottomNav}>
        <View style={styles.bottomNavRow}>
          <TouchableOpacity
            style={styles.bottomNavItem}
            onPress={() => router.replace("/home")}
          >
            <MaterialIcons name="home" size={24} color="#fff" />
            <Text style={styles.bottomNavText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomNavItem}
            onPress={() => router.replace("/discussion")}
          >
            <MaterialIcons name="groups" size={24} color="#fff" />
            <Text style={styles.bottomNavText}>Discussion</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomNavItem}
            onPress={() => router.replace("/notes")}
          >
            <MaterialIcons name="notes" size={24} color="#fff" />
            <Text style={styles.bottomNavText}>Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomNavItem}
            onPress={() => router.replace("/my-files")}
          >
            <FontAwesome5 name="folder" size={22} color="#fff" />
            <Text style={styles.bottomNavText}>Files</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingBottom: 68,
  },

  /* Header */
  header: {
    backgroundColor: "#1E3A8A",
    paddingTop: 50,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  refreshButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  /* Profile Card */
  profileCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f4ff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#1E3A8A",
  },
  editPictureButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1E3A8A",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f5e8",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4caf50",
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: "#4caf50",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statCard: {
    alignItems: "center",
    backgroundColor: "#f8f9ff",
    padding: 16,
    borderRadius: 12,
    minWidth: 80,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  /* Loading */
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  loadingText: {
    color: "#1E3A8A",
    fontSize: 16,
    marginTop: 16,
  },

  /* Menu Sections */
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  menu: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f4ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  menuSubtext: {
    fontSize: 12,
    color: "#666",
  },

  /* Logout */
  logoutSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#dc3545",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  /* Bottom Nav */
  bottomNav: {
    backgroundColor: "#1E3A8A",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 68,
  },
  bottomNavItem: {
    alignItems: "center",
  },
  bottomNavText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});
