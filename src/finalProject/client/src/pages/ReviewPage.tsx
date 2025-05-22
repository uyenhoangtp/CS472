import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useReviewContext } from '../contexts/ReviewContext';
import { getProductById } from '../api/products';
import type { Product, Review } from '../types/types';

const ReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { reviews, loading, error, fetchReviews, submitReview, updateReview, deleteReview } = useReviewContext();

  const [product, setProduct] = useState<Product | null>(null);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  useEffect(() => {
    if (id) {
      fetchReviews(parseInt(id));
      fetchProductDetails(parseInt(id));
    }
  }, [id]);

  const fetchProductDetails = async (productId: number) => {
    try {
      const productDetails = await getProductById(productId);
      setProduct(productDetails);
    } catch (err) {
      console.error('Failed to fetch product details:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await submitReview(parseInt(id), {
      author,
      rating,
      comment,
      date: new Date().toISOString(),
    });
    setAuthor('');
    setRating(5);
    setComment('');
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setAuthor(review.author);
    setRating(review.rating);
    setComment(review.comment);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !editingReview) return;

    await updateReview(parseInt(id), editingReview.id!, {
      author,
      rating,
      comment,
    });

    setEditingReview(null);
    setAuthor('');
    setRating(5);
    setComment('');
  };

  const handleDelete = async (reviewId: number) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this review?')) {
      await deleteReview(parseInt(id), reviewId);
    }
  };

  return (
    <div>
      <div className="p-4">
        {/* Product Details Section */}
        {product ? (
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-lg font-semibold">Price: ${product.price}</p>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}

        {/* Reviews Section */}
        <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
        {loading && <p>Loading reviews...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul className="space-y-2 mb-6">
          {reviews.map((r) => (
            <li key={r.id} className="border p-3 rounded shadow">
              <p className="font-semibold">{r.author}</p>
              <p>Rating: {r.rating} ⭐</p>
              <p>{r.comment}</p>
              <button
                onClick={() => handleEdit(r)}
                className="text-blue-600 hover:underline mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(r.id!)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* Create or Edit Review Section */}
        <form onSubmit={editingReview ? handleUpdate : handleSubmit} className="space-y-4">
          <h3 className="text-xl font-bold">
            {editingReview ? 'Edit Review' : 'Write a Review'}
          </h3>
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="border p-2 w-full"
          />
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
            className="border p-2 w-full"
          />
          <textarea
            placeholder="Your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="border p-2 w-full"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingReview ? 'Update Review' : 'Submit Review'}
          </button>
          {editingReview && (
            <button
              type="button"
              onClick={() => setEditingReview(null)}
              className="bg-gray-600 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;
