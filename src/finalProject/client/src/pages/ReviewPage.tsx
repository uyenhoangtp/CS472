import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useReviewContext } from '../contexts/ReviewContext';
import { BASE_URL, getProductById } from '../api/products';
import type { Product, Review } from '../types/types';

const ReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { reviews, loading, error, fetchReviews, submitReview, updateReview, deleteReview } = useReviewContext();

  const [product, setProduct] = useState<Product | null>(null);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [summary, setSummary] = useState<string | null>(null); // State for the summary
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isSummarizing, setIsSummarizing] = useState(false); // State for summarizing

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

  const handleSummarizeReviews = async () => {
    if (!id) return;

    setIsSummarizing(true);
    setSummary(null);

    try {
      const response = await fetch(`${BASE_URL}/api/ai/review/summarize/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to summarize reviews');
      }

      const data = await response.json();
      setSummary(data.summary);
      setIsModalOpen(true); // Open the modal to display the summary
    } catch (err) {
      console.error('Error summarizing reviews:', err);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSummary(null);
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Product Reviews</h2>
          <button
            onClick={handleSummarizeReviews}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={isSummarizing}
          >
            {isSummarizing ? 'Summarizing...' : 'Summarize Reviews'}
          </button>
        </div>
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

      {/* Modal for Summary */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">Review Summary</h3>
            <p>{summary}</p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
