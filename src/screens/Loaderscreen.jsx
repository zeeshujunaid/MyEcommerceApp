import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { AppContext } from '../context/Appcontext';

const LoaderScreen = ({ navigation }) => {
  const { setProducts, setCategories } = useContext(AppContext);

  useEffect(() => {
    const loadAppData = async () => {
      try {
        // Fetch both products & categories together
        const [productRes, categoryRes] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories'),
        ]);

        // Save them in context
        setProducts(productRes.data);
        setCategories(categoryRes.data);

        // console
        console.log('Products and Categories loaded successfully');
        console.log('Products:', productRes.data);
        console.log('Categories:', categoryRes.data);


        // Check user from AsyncStorage
        const user = await AsyncStorage.getItem('user');

        // Navigate 
        setTimeout(() => {
          if (user) {
            Toast.show({
              type: 'success',
              text1: 'Welcome Back!',
              text2: 'Loading your data...',
            });
            navigation.replace('Home');
          } else {
            Toast.show({
              type: 'info',
              text1: 'Please Login',
              text2: 'You need to login to continue',
            });
            navigation.replace('Login');
          }
        }, 1500);
      } catch (error) {
        console.log('Error fetching data:', error);
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
    <LinearGradient colors={['#a8e6cf', '#dcedc1']} style={styles.gradient}>
      <View style={styles.container}>
        <Image
          source={require('../../src/assets/images/logo.jpg')}
          style={styles.logo}
        />
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
});
