import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProductList from '../Components/ProductList';
import Categories from '../Components/Categroies';
import { AppContext } from '../context/Appcontext';
import ProductModal from '../Components/Productmodal';

const HomeScreen = ({ navigation }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { allProducts, setProducts } = useContext(AppContext);
  const [search, setSearch] = useState('');

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await AsyncStorage.removeItem('user');
            navigation.replace('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  // 🔍 Search functionality
  useEffect(() => {
    if (!search) {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(prod =>
        prod.title.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(filtered);
    }
  }, [search, allProducts]);

  return (
    <LinearGradient colors={['#ffffff', '#e6f7ff']} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainView}
      >
        <View style={styles.header}>
          <View style={styles.topRow}>
            <Text style={styles.logoText}>
              <Text style={styles.logoHighlight}>Shop</Text>Ease
            </Text>

            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Icon name="cart" size={26} color="#333" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLogout}>
                <MaterialCommunityIcons name="logout" size={26} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          {/* 🔍 Search Bar */}
          <View style={styles.searchContainer}>
            <Icon name="search" size={22} color="#555" style={styles.searchIcon} />
            <TextInput
              placeholder="Search products..."
              placeholderTextColor="#777"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* 🛒 Product Area */}
        <View style={styles.cardmainview}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.categoriesWrapper}>
              <Categories />
            </View>

            <ProductList
              setSelectedProduct={setSelectedProduct}
              setModalVisible={setModalVisible}
            />
          </ScrollView>
        </View>

        {/* 🪟 Product Modal */}
        <ProductModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          product={selectedProduct}
        />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  mainView: { flex: 1 },

  header: {
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    paddingBottom: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  logoHighlight: {
    color: '#ff5252',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },

  cardmainview: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    elevation: 5,
    paddingHorizontal: 15,
    paddingTop: 25,
  },
  scrollContent: {
    paddingBottom: 50,
    flexGrow: 1,
  },
  categoriesWrapper: {
    marginBottom: 25,
    marginTop: 10,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
