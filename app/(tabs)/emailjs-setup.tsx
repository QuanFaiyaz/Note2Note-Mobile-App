import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { EmailJSService } from "../lib/emailjs-service";

export default function EmailJSSetup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTestEmail = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter an email address");
      return;
    }

    setIsLoading(true);
    try {
      const success = await EmailJSService.sendOTPEmail({
        to_email: email.trim(),
        otp_code: "123456",
        user_name: "Test User",
        app_name: "Note2Note",
        expiry_minutes: 10,
      });

      if (success) {
        Alert.alert(
          "Success!",
          `Test email sent to ${email}. Check your inbox (and spam folder).`
        );
      } else {
        Alert.alert("Error", "Failed to send test email. Check your EmailJS configuration.");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to send test email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={40} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image
            source={require("../../assets/images/n2nlogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>EmailJS Setup</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail" size={60} color="#1E3A8A" />
          </View>

          <Text style={styles.title}>EmailJS Configuration</Text>
          <Text style={styles.subtitle}>
            Set up EmailJS to send OTP verification emails
          </Text>

          <View style={styles.stepsContainer}>
            <Text style={styles.stepsTitle}>Setup Steps:</Text>
            
            <View style={styles.step}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepText}>
                Go to{" "}
                <Text style={styles.link}>https://dashboard.emailjs.com</Text>
              </Text>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepText}>
                Add an email service (Gmail, Outlook, etc.)
              </Text>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepText}>
                Create an email template for OTP verification
              </Text>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNumber}>4</Text>
              <Text style={styles.stepText}>
                Update the configuration in{" "}
                <Text style={styles.code}>app/lib/emailjs-config.ts</Text>
              </Text>
            </View>
          </View>

          <View style={styles.testContainer}>
            <Text style={styles.testTitle}>Test Email Sending:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={[styles.testButton, isLoading && styles.disabledButton]}
              onPress={handleTestEmail}
              disabled={isLoading}
            >
              <Text style={styles.testButtonText}>
                {isLoading ? "Sending..." : "Send Test Email"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.templateContainer}>
            <Text style={styles.templateTitle}>Email Template Variables:</Text>
            <Text style={styles.templateText}>
              Use these variables in your EmailJS template:
            </Text>
            <View style={styles.variablesContainer}>
              <Text style={styles.variable}>{"{{to_email}}"}</Text>
              <Text style={styles.variable}>{"{{otp_code}}"}</Text>
              <Text style={styles.variable}>{"{{user_name}}"}</Text>
              <Text style={styles.variable}>{"{{app_name}}"}</Text>
              <Text style={styles.variable}>{"{{expiry_minutes}}"}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#1E3A8A",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 10,
  },
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
  scrollContainer: {
    paddingBottom: 30,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  iconContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  stepsContainer: {
    width: "100%",
    marginBottom: 30,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#1E3A8A",
    color: "#fff",
    textAlign: "center",
    lineHeight: 30,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 15,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  link: {
    color: "#1E3A8A",
    fontWeight: "bold",
  },
  code: {
    fontFamily: "monospace",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  testContainer: {
    width: "100%",
    marginBottom: 30,
  },
  testTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  testButton: {
    backgroundColor: "#1E3A8A",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  testButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  templateContainer: {
    width: "100%",
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  templateText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  variablesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  variable: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontFamily: "monospace",
  },
});
