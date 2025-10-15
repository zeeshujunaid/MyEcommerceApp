import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <LinearGradient colors={['#a8e6cf', '#dcedc1']} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainView}
      >
        {/* 🔥 Modern Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>ShopEase</Text>

          {/* 🔍 Search Bar */}
          <View style={styles.searchContainer}>
            <Icon name="search" size={22} color="#555" style={{ marginRight: 6 }} />
            <TextInput
              placeholder="Search products..."
              placeholderTextColor="#777"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>

          {/* 🛒 Cart Icon */}
          <TouchableOpacity onPress={() => console.log('Cart pressed')}>
            <Icon name="cart-outline" size={26} color="#333" />
          </TouchableOpacity>
        </View>

        {/* You can add product list below */}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
});
