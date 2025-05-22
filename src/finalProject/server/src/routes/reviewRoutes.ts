import express from 'express';
import {
  getReviewsByProduct,
  addReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController';

const reviewRouter = express.Router();
reviewRouter.get('/:id/reviews', getReviewsByProduct);
reviewRouter.post('/:id/reviews', addReview);
reviewRouter.put('/:productId/reviews/:id', updateReview);
reviewRouter.delete('/:productId/reviews/:id', deleteReview);
export default reviewRouter;