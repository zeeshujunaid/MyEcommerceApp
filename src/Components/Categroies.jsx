import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { AppContext } from '../context/Appcontext';

const Categories = () => {
  const { allProducts, setProducts, categories } = useContext(AppContext);
  const [selected, setSelected] = useState('All');

  const handlePress = async (cat) => {
    setSelected(cat);
    if (cat === 'All') {
      setProducts(allProducts);
    } else {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/category/${cat.toLowerCase()}`);
        setProducts(res.data);
      } catch (err) {
        console.log('Error fetching category:', err);
      }
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
      <TouchableOpacity
        style={[styles.button, selected === 'All' && styles.activeButton]}
        onPress={() => handlePress('All')}
      >
        <Text style={[styles.text, selected === 'All' && styles.activeText]}>All</Text>
      </TouchableOpacity>

      {categories.map((cat, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, selected === cat && styles.activeButton]}
          onPress={() => handlePress(cat)}
        >
          <Text style={[styles.text, selected === cat && styles.activeText]}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    elevation: 2,
  },
  activeButton: { backgroundColor: '#007bff' },
  text: { textTransform: 'capitalize', color: '#333', fontWeight: '500' },
  activeText: { color: '#fff', fontWeight: 'bold' },
});
