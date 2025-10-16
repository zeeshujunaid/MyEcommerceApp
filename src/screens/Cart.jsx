import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'; // ✅ Added

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
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateCart = async (updatedCart) => {
    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const changeQty = (id, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <LinearGradient colors={['#a8e6cf', '#dcedc1']} style={styles.gradient}>
      <View style={styles.container}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.heading}>My Cart</Text>
          <View style={{ width: 24 }} /> {/* Empty space for symmetry */}
        </View>

        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty!</Text>
        ) : (
          <View style={styles.listAndBilling}>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
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
                          { text: 'Cancel' },
                          { text: 'Yes', onPress: () => removeItem(item.id) },
                        ])
                      }
                    >
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 140 }}
            />

            {/* Billing Section */}
            <LinearGradient
              colors={['#a8e6cf', '#dcedc1']}
              style={styles.billingContainer}
            >
              <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
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
  container: { flex: 1, paddingHorizontal: 15 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#555' },
  listAndBilling: { flex: 1 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    elevation: 3,
  },
  image: { width: 80, height: 80, resizeMode: 'contain', borderRadius: 10 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 16, color: 'green', marginVertical: 5 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  qtyBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  qtyText: { fontSize: 18, fontWeight: 'bold' },
  qtyNumber: { marginHorizontal: 10, fontSize: 16 },
  removeBtn: { marginTop: 5 },
  removeText: { color: '#e91e63', fontWeight: 'bold' },
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
  totalText: { fontSize: 18, fontWeight: 'bold' },
  checkoutBtn: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
