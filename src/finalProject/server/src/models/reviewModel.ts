import fs from 'fs';
import path from 'path';
import { Review } from './types';
import express from 'express';
import { Request, Response } from 'express';
import { generateAIResponse } from '../utils/openai';

const productFile = path.join(__dirname, '../data/products.json');
const reviewFile = path.join(__dirname, '../data/reviews.json');
const aiRouter = express.Router();

function readReviews(): Review[] {
  return JSON.parse(fs.readFileSync(reviewFile, 'utf-8'));
}

function writeReviews(data: Review[]): void {
  fs.writeFileSync(reviewFile, JSON.stringify(data, null, 2));
}

function updateAverageRating(productId: number): void {
  const reviews = readReviews().filter(r => r.productId === productId);
  const avg = reviews.length ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(2) : '0';
  const products = JSON.parse(fs.readFileSync(productFile, 'utf-8'));
  const product = products.find((p: any) => p.id === productId);
  if (product) {
    product.averageRating = parseFloat(avg);
    fs.writeFileSync(productFile, JSON.stringify(products, null, 2));
  }
}

export function getReviewsByProduct(productId: number): Review[] {
  const reviews = readReviews(); // Fetch all reviews from the file
  return reviews.filter((review) => review.productId === productId); // Filter reviews by productId
}

export function addReview(productId: number, review: Omit<Review, 'id' | 'date'>): Review {
  const reviews = readReviews();
  const newReview: Review = {
    ...review,
    id: Date.now(),
    productId,
    date: new Date().toISOString(),
  };
  reviews.push(newReview);
  writeReviews(reviews);
  updateAverageRating(productId);
  return newReview;
}

export function updateReview(productId: number, id: number, updatedData: Partial<Review>): Review | null {
  const reviews = readReviews();
  const index = reviews.findIndex(r => r.id === id && r.productId === productId);
  if (index !== -1) {
    reviews[index] = { ...reviews[index], ...updatedData };
    writeReviews(reviews);
    updateAverageRating(productId);
    return reviews[index];
  }
  return null;
}

export function deleteReview(productId: number, id: number): boolean {
  let reviews = readReviews();
  const initialLength = reviews.length;
  reviews = reviews.filter(r => !(r.id === id && r.productId === productId));
  if (reviews.length < initialLength) {
    writeReviews(reviews);
    updateAverageRating(productId);
    return true;
  }
  return false;
}

export default aiRouter;

export const summarizeReviewsByProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (!productId || isNaN(Number(productId))) {
    res.status(400).json({ message: 'Invalid or missing productId' });
    return;
  }

  try {
    const reviews = getReviewsByProduct(Number(productId));

    if (!reviews || reviews.length === 0) {
      res.status(404).json({ message: 'No reviews found for this product' });
      return;
    }

    const combinedReviews = reviews.map((review) => review.comment).join(' ');

    const summary = await generateAIResponse(`Summarize these product reviews: ${combinedReviews}`);
    res.json({ summary });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in summarizeReviewsByProduct:', error.message);
    } else {
      console.error('Error in summarizeReviewsByProduct:', error);
    }
    res.status(500).json({ message: 'Error generating summary' });
  }
};