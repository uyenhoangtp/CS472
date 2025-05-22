import type { Product } from '../types/types';

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Fetch all products or search products by query.
 */
export async function getProducts(
  query: string = '',
  page: number = 1,
  limit: number = 10,
  category: string = ''
): Promise<{ products: Product[]; total: number }> {
  const url = query
    ? `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}&category=${encodeURIComponent(category)}`
    : `${BASE_URL}/products?page=${page}&limit=${limit}&category=${encodeURIComponent(category)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

/**
 * Fetch a product by its ID.
 */
export async function getProductById(productId: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${productId}`);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error('Failed to fetch product');
  }
  return res.json();
}
