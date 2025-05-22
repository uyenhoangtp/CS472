import { Request, Response } from 'express';
import { generateAIResponse } from '../utils/openai';
import { getReviewsByProduct } from '../models/reviewModel'; // Import the function to fetch reviews

export const summarizeReviewsByProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (!productId || isNaN(Number(productId))) {
    res.status(400).json({ message: 'Invalid or missing productId' });
    return;
  }

  try {
    // Fetch reviews for the given productId
    const reviews = getReviewsByProduct(Number(productId));

    if (!reviews || reviews.length === 0) {
      res.status(404).json({ message: 'No reviews found for this product' });
      return;
    }

    // Combine all reviews into a single string
    const combinedReviews = reviews.map((review) => review.comment).join(' ');

    // Generate a summary using the OpenAI API
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
