import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '../types/types';
import { getProducts } from '../api/products';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: ''
});

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getProducts()
      .then(response => setProducts(response.products))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};
