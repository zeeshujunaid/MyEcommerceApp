import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';

const ProductModal = ({ visible, onClose, product }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  if (!product) return null;

  const addToCart = async () => {
    try {
      const existingCart = await AsyncStorage.getItem('cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];
      const productExists = cart.find(item => item.id === product.id);

      if (productExists) {
        Toast.show({
          type: 'info',
          text1: 'Product already in cart',
        });
        return;
      }

      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      Toast.show({
        type: 'success',
        text1: 'Product added to cart',
      });
      onClose();
    } catch (error) {
      console.log('Error adding to cart:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to add product to cart',
      });
    }
  };

  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= Math.floor(rating) ? 'star' : 'star-outline'}
          size={18}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>
              {product.title}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={26} color="#444" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="contain"
            />

            <View style={styles.ratingRow}>
              <View style={{ flexDirection: 'row' }}>
                {renderStars(product.rating?.rate || 0)}
              </View>
              <Text style={styles.ratingText}>
                {product.rating?.rate?.toFixed(1)} ({product.rating?.count} reviews)
              </Text>
            </View>

            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.description}>{product.description}</Text>

            <TouchableOpacity style={styles.button} onPress={addToCart}>
              <LinearGradient
                colors={['#007bff', '#00bfff']}
                style={styles.gradientBtn}
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Similar products placeholder */}
            <View style={styles.similarSection}>
              <Text style={styles.similarText}>Similar Products (Coming Soon)</Text>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ProductModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 10,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e91e63',
    marginBottom: 8,
    marginTop: 5,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 15,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 5,
    color: '#777',
    fontSize: 13,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 5,
  },
  gradientBtn: {
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  similarSection: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 15,
    paddingTop: 10,
    alignItems: 'center',
  },
  similarText: {
    color: '#888',
    fontSize: 14,
  },
});
