import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]); // All products from API
  const [products, setProducts] = useState([]);       // Currently displayed products
  const [categories, setCategories] = useState([]);   // Categories from API

  return (
    <AppContext.Provider value={{
      allProducts, setAllProducts,
      products, setProducts,
      categories, setCategories
    }}>
      {children}
    </AppContext.Provider>
  );
};
