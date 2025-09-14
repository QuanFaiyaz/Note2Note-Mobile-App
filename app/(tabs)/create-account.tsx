import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function CreateAccount() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "teacher" | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    course: "",
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignUp = () => {
    if (!role) {
      alert("Please select a role");
      return;
    }
    console.log("Signup data:", { ...formData, role });
  };

  return (
    <View style={styles.container}>
      {/* Blue Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/login")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
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
        <TextInput
          style={styles.input}
          placeholder="Course"
          value={formData.course}
          onChangeText={(val) => handleChange("course", val)}
        />
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
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Sign Up</Text>
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
  signUpText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  loginText: { textAlign: "center", color: "#555" },
});
