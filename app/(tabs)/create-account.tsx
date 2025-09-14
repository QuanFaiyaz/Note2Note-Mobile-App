import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { listCourses, registerUser, testConnection } from "../lib/api";

export default function CreateAccount() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "teacher" | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    course: "",
    email: "",
    password: "",
  });

  // Load courses on component mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        // Test connection first
        console.log("Testing API connection...");
        const connectionTest = await testConnection();
        console.log("Connection test result:", connectionTest);
        
        // Load courses
        const response = await listCourses();
        setCourses(response.data);
        console.log("Courses loaded successfully:", response.data.length);
      } catch (error) {
        console.error("Failed to load courses:", error);
        Alert.alert(
          "Connection Error", 
          "Unable to connect to the server. Please check:\n\n1. XAMPP is running\n2. Your device is on the same network\n3. Firewall allows connections\n\nError: " + (error as Error).message
        );
      }
    };
    loadCourses();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    if (!role) {
      Alert.alert("Error", "Please select a role");
      return false;
    }
    if (!formData.firstName.trim()) {
      Alert.alert("Error", "First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      Alert.alert("Error", "Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert("Error", "Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      Alert.alert("Error", "Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await registerUser({
        email: formData.email.trim(),
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        middleName: formData.middleName.trim() || undefined,
        mobileNo: formData.phone.trim() || undefined,
        course: formData.course.trim() || undefined,
      });

      Alert.alert(
        "Success", 
        "Account created successfully! Please check your email for verification.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/login")
          }
        ]
      );
    } catch (error: any) {
      console.error("Registration error:", error);
      Alert.alert("Error", error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Blue Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/login")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={40} color="#fff" />
        </TouchableOpacity>

        {/* Centered Logo + Title */}
        <View style={styles.headerCenter}>
          <Image
            source={require("../../assets/images/n2nlogo.png")} // 👈 your logo
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Create Account</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Role Selector */}
        <View style={styles.roleSelector}>
          <TouchableOpacity
            style={[styles.roleButton, role === "student" && styles.activeRole]}
            onPress={() => setRole("student")}
          >
            <Ionicons
              name="school-outline"
              size={20}
              color={role === "student" ? "#fff" : "#333"}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.roleText,
                role === "student" && styles.activeRoleText,
              ]}
            >
              Student
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleButton, role === "teacher" && styles.activeRole]}
            onPress={() => setRole("teacher")}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color={role === "teacher" ? "#fff" : "#333"}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.roleText,
                role === "teacher" && styles.activeRoleText,
              ]}
            >
              Teacher
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Inputs */}
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(val) => handleChange("firstName", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Middle Name"
          value={formData.middleName}
          onChangeText={(val) => handleChange("middleName", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(val) => handleChange("lastName", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(val) => handleChange("phone", val)}
        />
        {/* Course Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Course (Optional)</Text>
          <ScrollView style={styles.dropdown} nestedScrollEnabled>
            {courses.map((course) => (
              <TouchableOpacity
                key={course.course_id}
                style={[
                  styles.dropdownItem,
                  formData.course === course.course_name && styles.selectedDropdownItem
                ]}
                onPress={() => handleChange("course", course.course_name)}
              >
                <Text style={[
                  styles.dropdownItemText,
                  formData.course === course.course_name && styles.selectedDropdownItemText
                ]}>
                  {course.course_name} ({course.course_code})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(val) => handleChange("email", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(val) => handleChange("password", val)}
        />

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={[styles.signUpButton, isLoading && styles.disabledButton]} 
          onPress={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signUpText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Login Redirect */}
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={{ fontWeight: "bold" }}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#1E3A8A",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  backButton: { marginRight: 10 },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: 5,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContainer: { paddingBottom: 30 },
  roleSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  roleButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  activeRole: { backgroundColor: "#1E3A8A" },
  roleText: { color: "#333", fontWeight: "bold" },
  activeRoleText: { color: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 20,   
    marginBottom: 12,
  },
  signUpButton: {
    backgroundColor: "#1E3A8A",
    borderRadius: 8,
    padding: 15,
    margin: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  signUpText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  loginText: { textAlign: "center", color: "#555" },
  dropdownContainer: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  dropdownLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    maxHeight: 120,
    backgroundColor: "#fff",
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedDropdownItem: {
    backgroundColor: "#1E3A8A",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },
  selectedDropdownItemText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
