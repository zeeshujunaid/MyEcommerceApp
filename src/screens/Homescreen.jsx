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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductList from '../Components/ProductList';
import Categories from '../Components/Categroies';
import { AppContext } from '../context/Appcontext';
import ProductModal from '../Components/Productmodal';


const HomeScreen = ({navigation}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { allProducts, setProducts } = useContext(AppContext); // Context me allProducts aur setProducts
  const [search, setSearch] = useState('');

  // 🔥 Search functionality
  useEffect(() => {
    if (!search) {
      setProducts(allProducts); // agar search empty hai to saare products show karo
    } else {
      const filtered = allProducts.filter(prod =>
        prod.title.toLowerCase().includes(search.toLowerCase()),
      );
      setProducts(filtered); // filtered products
    }
  }, [search, allProducts]);

  return (
    <LinearGradient colors={['#a8e6cf', '#dcedc1']} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainView}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.topRow}>
            <Text style={styles.logoText}>ONLINE SHOP</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Icon name="cart" size={26} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Icon
              name="search"
              size={22}
              color="#555"
              style={{ marginRight: 6 }}
            />
            <TextInput
              placeholder="Search products..."
              placeholderTextColor="#777"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Card & Scroll */}
        <View style={styles.cardmainview}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
          >
            <Categories />
            <ProductList
              setSelectedProduct={setSelectedProduct}
              setModalVisible={setModalVisible}
            />
          </ScrollView>
        </View>

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
  logoText: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  cardmainview: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: '#000',
    paddingHorizontal: 15,
    paddingTop: 20, // reduce paddingTop
  },
});
