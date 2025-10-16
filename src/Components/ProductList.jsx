import React, { useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/Appcontext';

const ProductList = ({ setSelectedProduct, setModalVisible }) => {
  const { products } = useContext(AppContext);

  if (!products.length) return <Text style={styles.empty}>No products found</Text>;

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.list}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            setSelectedProduct(item);
            setModalVisible(true);
          }}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  list: { paddingHorizontal: 10 },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    elevation: 3,
  },
  image: { width: '100%', height: 100, resizeMode: 'contain' },
  title: { fontSize: 13, color: '#333', marginVertical: 5 },
  price: { fontSize: 15, fontWeight: 'bold', color: '#007bff' },
  empty: { textAlign: 'center', marginTop: 20, color: '#777' },
});
