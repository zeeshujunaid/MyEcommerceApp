import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductModal = ({ visible, onClose, product }) => {
  if (!product) return null;

  // Function to save product to AsyncStorage
  const addToCart = async () => {
    try {
      // Get existing cart
      const existingCart = await AsyncStorage.getItem('cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];

      // Check if product already in cart
      const productExists = cart.find(item => item.id === product.id);
      if (productExists) {
        Alert.alert('Info', 'Product is already in the cart');
        return;
      }

      // Add new product
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      Alert.alert('Success', 'Product added to cart');
      onClose();
    } catch (error) {
      console.log('Error adding to cart:', error);
      Alert.alert('Error', 'Failed to add product to cart');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>
              {product.title}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Product Image */}
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Price */}
          <Text style={styles.price}>${product.price}</Text>

          {/* Add to Cart Button */}
          <TouchableOpacity style={styles.button} onPress={addToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: { fontSize: 20, fontWeight: 'bold', flex: 1, marginRight: 10 },
  image: { width: '100%', height: 200, borderRadius: 15, marginBottom: 15 },
  description: { fontSize: 14, color: '#555', marginBottom: 10 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#e91e63', marginBottom: 15 },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
