import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient'; // ✅ Added import

const LoaderScreen = ({ navigation }) => {
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user');

      setTimeout(() => {
        if (user) {
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: 'Welcome back!',
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
      }, 1500); // ⏳ Small delay for smoother transition
    };

    checkUser();
  }, []);

  return (
    <LinearGradient colors={['#a8e6cf', '#dcedc1']} style={styles.gradient}>
      <View style={styles.container}>
        <Image
          source={require('../../src/assets/images/logo.jpg')}
          style={{ width: 120, height: 120, borderRadius: 50,
 }}
        />
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
});
