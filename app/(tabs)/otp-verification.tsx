import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { sendOTP, verifyOTP } from "../lib/api";

interface OTPVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

export default function OTPVerification({ email, onVerificationSuccess, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [otpSent, setOtpSent] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    // Send OTP when component mounts
    sendOTPToEmail();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const sendOTPToEmail = async () => {
    console.log('sendOTPToEmail called for:', email);
    setIsResending(true);
    try {
      console.log('Calling sendOTP API...');
      const response = await sendOTP(email);
      console.log('Send OTP response:', response);
      setOtpSent(true);
      setTimeLeft(600); // Reset timer
      Alert.alert("OTP Sent", `Verification code sent to ${email}`);
    } catch (error: any) {
      console.error('Send OTP error:', error);
      Alert.alert("Error", error.message || "Failed to send OTP");
    } finally {
      setIsResending(false);
    }
  };

  const handleOTPChange = (value: string, index: number) => {
    const newOtp = otp.split("");
    newOtp[index] = value;
    const updatedOtp = newOtp.join("").slice(0, 6);
    setOtp(updatedOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    console.log('handleVerifyOTP called with OTP:', otp);
    console.log('Email:', email);
    
    if (otp.length !== 6) {
      console.log('OTP length invalid:', otp.length);
      Alert.alert("Error", "Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      console.log('Calling verifyOTP API...');
      const response = await verifyOTP(email, otp);
      console.log('OTP verification response:', response);
      
      if (response.ok) {
        console.log('OTP verification successful, calling onVerificationSuccess');
        // Automatically proceed with account creation
        onVerificationSuccess();
      } else {
        console.log('OTP verification failed:', response);
        Alert.alert("Error", response.message || "Invalid OTP code");
        setOtp("");
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      Alert.alert("Error", error.message || "Invalid OTP code");
      setOtp("");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={40} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image
            source={require("../../assets/images/n2nlogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Verify Email</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="mail" size={60} color="#1E3A8A" />
        </View>

        <Text style={styles.title}>Check Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent a 6-digit verification code to:
        </Text>
        <Text style={styles.email}>{email}</Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {Array.from({ length: 6 }, (_, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={styles.otpInput}
              value={otp[index] || ""}
              onChangeText={(value) => handleOTPChange(value, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Timer */}
        {timeLeft > 0 && (
          <Text style={styles.timer}>
            Code expires in {formatTime(timeLeft)}
          </Text>
        )}

        {/* Verify Button */}
        <TouchableOpacity
          style={[styles.verifyButton, isLoading && styles.disabledButton]}
          onPress={handleVerifyOTP}
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify Code</Text>
          )}
        </TouchableOpacity>

        {/* Resend OTP */}
        <TouchableOpacity
          style={styles.resendButton}
          onPress={sendOTPToEmail}
          disabled={isResending || timeLeft > 0}
        >
          {isResending ? (
            <ActivityIndicator color="#1E3A8A" size="small" />
          ) : (
            <Text style={[styles.resendText, timeLeft > 0 && styles.disabledText]}>
              Resend Code
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.helpText}>
          Didn't receive the code? Check your spam folder or try resending.
        </Text>
      </View>
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
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  iconContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
    maxWidth: 300,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#fff",
  },
  timer: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  verifyButton: {
    backgroundColor: "#1E3A8A",
    borderRadius: 8,
    padding: 15,
    width: "100%",
    maxWidth: 300,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  resendButton: {
    marginBottom: 20,
  },
  resendText: {
    fontSize: 16,
    color: "#1E3A8A",
    fontWeight: "bold",
  },
  disabledText: {
    color: "#ccc",
  },
  helpText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});
