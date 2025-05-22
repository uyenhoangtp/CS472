import React, { createContext, useContext, useState } from 'react';
import type { Review } from '../types/types';
import { getReviews, addReview, updateReview as apiUpdateReview, deleteReview as apiDeleteReview } from '../api/reviews';

interface ReviewContextType {
  reviews: Review[];
  loading: boolean;
  error: string;
  fetchReviews: (productId: number) => void;
  submitReview: (productId: number, review: Omit<Review, 'id'>) => Promise<void>;
  updateReview: (productId: number, reviewId: number, updatedData: Partial<Review>) => Promise<void>;
  deleteReview: (productId: number, reviewId: number) => Promise<void>;
}

const ReviewContext = createContext<ReviewContextType>({
  reviews: [],
  loading: false,
  error: '',
  fetchReviews: () => {},
  submitReview: async () => {},
  updateReview: async () => {},
  deleteReview: async () => {}
});

export const useReviewContext = () => useContext(ReviewContext);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchReviews = (productId: number) => {
    setLoading(true);
    setError('');
    getReviews(productId)
      .then(setReviews)
      .catch(() => setError('Failed to load reviews'))
      .finally(() => setLoading(false));
  };

  const submitReview = async (productId: number, review: Omit<Review, 'id'>) => {
    try {
      setLoading(true);
      await addReview(productId, review);
      fetchReviews(productId);
    } catch {
      setError('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (productId: number, reviewId: number, updatedData: Partial<Review>) => {
    try {
      setLoading(true);
      await apiUpdateReview(productId, reviewId, updatedData);
      fetchReviews(productId); // Refresh reviews after update
    } catch {
      setError('Failed to update review');
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (productId: number, reviewId: number) => {
    try {
      setLoading(true);
      await apiDeleteReview(productId, reviewId);
      fetchReviews(productId); // Refresh reviews after deletion
    } catch {
      setError('Failed to delete review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReviewContext.Provider
      value={{ reviews, loading, error, fetchReviews, submitReview, updateReview, deleteReview }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
