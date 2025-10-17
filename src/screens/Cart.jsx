import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('cart');
      const items = jsonValue != null ? JSON.parse(jsonValue) : [];
      const itemsWithQty = items.map(item => ({ ...item, qty: item.qty || 1 }));
      setCartItems(itemsWithQty);
    } catch (e) {
      console.log('Error loading cart:', e);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load cart items.',
      });
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateCart = async updatedCart => {
    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = id => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const changeQty = (id, delta) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <LinearGradient colors={['#ffffff', '#e6f7ff']} style={styles.gradient}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.topRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={26} color="#333" />
            </TouchableOpacity>

            <Text style={styles.logoText}>My Cart</Text>

            <Icon name="cart-outline" size={26} color="#333" />
          </View>
        </View>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty!</Text>
        ) : (
          <View style={styles.listAndBilling}>
            {/* Product List */}
            <FlatList
              data={cartItems}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image source={{ uri: item.image }} style={styles.image} />

                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.title}>
                      {item.title}
                    </Text>
                    <Text style={styles.price}>${item.price}</Text>

                    <View style={styles.qtyContainer}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => changeQty(item.id, -1)}
                      >
                        <Text style={styles.qtyText}>-</Text>
                      </TouchableOpacity>

                      <Text style={styles.qtyNumber}>{item.qty}</Text>

                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => changeQty(item.id, 1)}
                      >
                        <Text style={styles.qtyText}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() =>
                        Alert.alert('Remove', 'Are you sure?', [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Yes', onPress: () => removeItem(item.id) },
                        ])
                      }
                    >
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              contentContainerStyle={styles.listContent}
            />

            {/* Billing Section */}
            <LinearGradient
              colors={['#fff', '#a8e6cf']}
              style={styles.billingContainer}
            >
              <Text style={styles.totalText}>
                Total: ${totalPrice.toFixed(2)}
              </Text>

              <TouchableOpacity style={styles.checkoutBtn}>
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },

  header: {
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#555',
    fontSize: 16,
  },
  listAndBilling: {
    flex: 1,
    paddingTop: 20,
  },

  listContent: {
    paddingBottom: 140,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginVertical: 5,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtyNumber: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeBtn: {
    marginTop: 5,
  },
  removeText: {
    color: '#e91e63',
    fontWeight: 'bold',
  },

  billingContainer: {
    padding: 15,
    paddingBottom: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
