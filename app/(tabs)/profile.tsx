import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUserData = await AsyncStorage.getItem('currentUser');
      if (currentUserData) {
        const currentUser = JSON.parse(currentUserData);
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.replace('/home')}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={40} color="#fff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: "https://i.pinimg.com/1200x/c0/8e/f4/c08ef497e2d0ce221a343cb7e5ccf320.jpg" }} // 👈 Replace with user profile pic
              style={styles.profilePic}
            />
            <Text style={styles.profileName}>
              {user ? `${user.FirstName} ${user.LastName}` : 'Loading...'}
            </Text>
            <Text style={styles.profileEmail}>
              {user ? user.Email : 'Loading...'}
            </Text>
            <Text style={styles.profileTitle}>My Profile</Text>

            {/* Points Badge */}
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>20 pts ⭐</Text>
            </View>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-circle-outline" size={28} color="black" />
            <Text style={styles.menuText}>Personal Data</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="black"
              style={styles.arrow}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="create-outline" size={28} color="black" />
            <Text style={styles.menuText}>Edit Profile Details</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="black"
              style={styles.arrow}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="stats-chart-outline" size={28} color="black" />
            <Text style={styles.menuText}>My Dashboard</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="black"
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    backgroundColor: "#fff",
    paddingBottom: 68, // prevent overlap with nav
  },

  /* Header */
  header: {
    backgroundColor: "#1E3A8A",
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: { color: "#fff", marginLeft: 5, fontSize: 14 },
  profileInfo: { alignItems: "center" },
  profilePic: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  profileName: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  profileEmail: { color: "#fff", fontSize: 12 },
  profileTitle: { color: "#fff", fontWeight: "bold", marginTop: 5 },
  pointsBadge: {
    backgroundColor: "#FFD700",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 6,
  },
  pointsText: { color: "#000", fontWeight: "bold", fontSize: 12 },

  /* Menu */
  menu: { marginTop: 20 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  menuText: { flex: 1, fontSize: 16, marginLeft: 10, color: "#000" },
  arrow: { marginLeft: "auto" },

  /* Logout */
  logoutButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 6,
    alignSelf: "flex-start",
    margin: 20,
  },
  logoutText: { color: "#fff", fontWeight: "bold" },

  /* Bottom Nav */
  bottomNav: {
    backgroundColor: "#1E3A8A",
    position: "absolute", // stick it to bottom
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
  bottomNavItem: { alignItems: "center" },
  bottomNavText: { color: "#fff", fontSize: 12, marginTop: 4 },
});
