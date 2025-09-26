import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { listCourses, registerUser } from "../lib/api";
import OTPVerification from "./otp-verification";

export default function CreateAccount() {
  const router = useRouter();
  const [role, setRole] = useState("Student");
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    course: "",
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await listCourses();
      setCourses(response.data || []);
    } catch (error) {
      console.error("Failed to load courses:", error);
    }
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return false;
    }
    if (!formData.password.trim()) {
      Alert.alert("Error", "Please enter your password");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    if (!formData.firstName.trim()) {
      Alert.alert("Error", "Please enter your first name");
      return false;
    }
    if (!formData.lastName.trim()) {
      Alert.alert("Error", "Please enter your last name");
      return false;
    }
    if (!formData.email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    console.log("handleSignUp called, isEmailVerified:", isEmailVerified);
    if (!validateForm()) return;

    // If email is not verified, show OTP verification
    if (!isEmailVerified) {
      console.log("Email not verified, showing OTP verification");
      setShowOTPVerification(true);
      return;
    }

    // Proceed with registration if email is verified
    console.log("Email verified, proceeding with registration...");
    setIsLoading(true);
    try {
      const registrationData = {
        email: formData.email.trim(),
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        middleName: formData.middleName.trim() || undefined,
        mobileNo: formData.phone.trim() || undefined,
        course: formData.course.trim() || undefined,
        otp_verified: true,
      };
      console.log("Registration data:", registrationData);
      
      const response = await registerUser(registrationData);
      console.log("Registration response:", response);

      Alert.alert(
        "Success", 
        "Account created successfully! You can now log in.",
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

  const handleOTPVerificationSuccess = () => {
    console.log("OTP verification successful, proceeding with account creation...");
    setIsEmailVerified(true);
    setShowOTPVerification(false);
    // Automatically proceed with registration
    handleSignUp();
  };

  const handleOTPBack = () => {
    setShowOTPVerification(false);
    setIsEmailVerified(false);
  };

  if (showOTPVerification) {
    return (
      <OTPVerification
        email={formData.email.trim()}
        onVerificationSuccess={handleOTPVerificationSuccess}
        onBack={handleOTPBack}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/n2nlogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Note2Note today</Text>
      </View>

      <View style={styles.form}>
        {/* Email Input */}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="your-email@nu-dasma.edu.ph"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
        />

        {/* Confirm Password Input */}
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          secureTextEntry
        />

        {/* First Name Input */}
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        />

        {/* Last Name Input */}
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your last name"
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        />

        {/* Middle Name Input */}
        <Text style={styles.label}>Middle Name (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your middle name"
          value={formData.middleName}
          onChangeText={(text) => setFormData({ ...formData, middleName: text })}
        />

        {/* Phone Input */}
        <Text style={styles.label}>Phone Number (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
        />

        {/* Role Selection */}
        <Text style={styles.label}>Account Type</Text>
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === "Student" && styles.roleButtonActive,
            ]}
            onPress={() => setRole("Student")}
          >
            <Text
              style={[
                styles.roleButtonText,
                role === "Student" && styles.roleButtonTextActive,
              ]}
            >
              Student
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === "Teacher" && styles.roleButtonActive,
            ]}
            onPress={() => setRole("Teacher")}
          >
            <Text
              style={[
                styles.roleButtonText,
                role === "Teacher" && styles.roleButtonTextActive,
              ]}
            >
              Teacher
            </Text>
          </TouchableOpacity>
        </View>

        {/* Course Selection */}
        <Text style={styles.label}>Course (Optional)</Text>
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdown}
            placeholder="Select your course"
            value={formData.course}
            onChangeText={(text) => setFormData({ ...formData, course: text })}
          />
          <TouchableOpacity style={styles.dropdownIcon}>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.signUpButton, isLoading && styles.disabledButton]}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signUpText}>
              {isEmailVerified ? "Create Account" : "Verify Email & Sign Up"}
            </Text>
          )}
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginText}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  roleContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  roleButtonActive: {
    backgroundColor: "#1E3A8A",
    borderColor: "#1E3A8A",
  },
  roleButtonText: {
    fontSize: 16,
    color: "#666",
  },
  roleButtonTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    paddingRight: 50,
  },
  dropdownIcon: {
    position: "absolute",
    right: 16,
    top: 12,
  },
  signUpButton: {
    backgroundColor: "#1E3A8A",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  signUpText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  loginLink: {
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    textAlign: "center",
    color: "#555",
  },
});