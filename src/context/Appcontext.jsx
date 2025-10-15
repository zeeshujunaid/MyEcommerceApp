import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  return (
    <AppContext.Provider value={{ products, setProducts, categories, setCategories }}>
      {children}
    </AppContext.Provider>
  );
};
