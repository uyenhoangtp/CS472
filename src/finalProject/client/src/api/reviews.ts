import type { Review } from '../types/types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export async function getReviews(productId: number): Promise<Review[]> {
  const res = await fetch(`${BASE_URL}/products/${productId}/reviews`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function addReview(productId: number, review: Omit<Review, 'id'>): Promise<Review> {
  const res = await fetch(`${BASE_URL}/products/${productId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error('Failed to add review');
  return res.json();
}

export async function updateReview(
  productId: number,
  reviewId: number,
  updatedData: Partial<Review>
): Promise<Review> {
  const res = await fetch(`${BASE_URL}/products/${productId}/reviews/${reviewId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error('Failed to update review');
  return res.json();
}

export async function deleteReview(productId: number, reviewId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/products/${productId}/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete review');
}
