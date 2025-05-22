import express from 'express';
import { summarizeReviewsByProduct } from '../controllers/aiController';

const aiRouter = express.Router();

aiRouter.post('/review/summarize/:productId', summarizeReviewsByProduct); // Include productId in the route

export default aiRouter;
