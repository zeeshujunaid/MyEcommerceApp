import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
} from "react-native";
import Toast from "react-native-toast-message";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const Email = "user@gmail.com";
  const Password = "123456";

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Empty Fields",
        text2: "Please fill all the fields",
      });
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      if (email === Email && password === Password) {
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "Welcome back!",
        });

        await AsyncStorage.setItem("user", JSON.stringify({ email }));
        navigation.replace("Home");
      } else {
        Toast.show({
          type: "error",
          text1: "Invalid Credentials",
          text2: "Please use the correct email and password",
        });
      }
      setLoading(false);
    }, 1200);
  };

  const handleReset = () => {
    Toast.show({
      type: "info",
      text1: "Password Reset",
      text2: "This feature will be available soon!",
    });
  };

  return (
    <LinearGradient colors={["#ffffff", "#e6f7ff"]} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
          <Image
            source={require("../../src/assets/images/logo.jpg")}
            style={styles.logo}
          />
          <Text style={styles.appTitle}>Welcome To Online Shop</Text>
        </Animated.View>

        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="#666"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient colors={["#007bff", "#00bfff"]} style={styles.gradientBtn}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnText}>Login</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Forgot Password?{" "}
            <Text style={styles.link} onPress={handleReset}>
              Reset
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  gradientBtn: {
    padding: 14,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    color: "#666",
    marginTop: 15,
  },
  link: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
