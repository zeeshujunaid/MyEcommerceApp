import React, { useEffect, useContext, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Animated,
  Text,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { AppContext } from '../context/Appcontext';

const LoaderScreen = ({ navigation }) => {
  const { setAllProducts, setProducts, setCategories } = useContext(AppContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in animation for logo
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const loadAppData = async () => {
      try {
        // Fetching products and categories in parallel
        const [productRes, categoryRes] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories'),
        ]);

        setAllProducts(productRes.data);
        setProducts(productRes.data);
        setCategories(categoryRes.data);

        console.log('✅ Products and Categories loaded');
        console.log('Products:', productRes.data);
        console.log('Categories:', categoryRes.data);

        const user = await AsyncStorage.getItem('user');

        // Delay to show loader + animation properly
        setTimeout(() => {
          if (user) {
            Toast.show({
              type: 'success',
              text1: 'Welcome Back!',
              text2: 'Loading your data...',
            });

            // Navigate after showing Toast
            setTimeout(() => navigation.replace('Home'), 1200);
          } else {
            Toast.show({
              type: 'info',
              text1: 'Please Login',
              text2: 'You need to login to continue',
            });

            setTimeout(() => navigation.replace('Login'), 1200);
          }
        }, 1000);
      } catch (error) {
        console.log('❌ Error fetching data:', error);
        Toast.show({
          type: 'error',
          text1: 'Network Error',
          text2: 'Unable to load data. Please try again.',
        });
      }
    };

    loadAppData();
  }, []);

  return (
    <LinearGradient
      colors={['#ffffff', '#e6f7ff']} // modern clean gradient
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Animated.Image
          source={require('../../src/assets/images/logo.jpg')}
          style={[styles.logo, { opacity: fadeAnim }]}
        />

        <Text style={styles.tagline}>Loading your store...</Text>

        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      </View>
    </LinearGradient>
  );
};

export default LoaderScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  tagline: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
