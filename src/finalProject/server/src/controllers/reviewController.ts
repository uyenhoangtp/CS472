import { Request, Response } from 'express';
import * as reviewModel from '../models/reviewModel';

export const getReviewsByProduct = (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      res.status(400).json({ message: 'Invalid product ID' });
    } else {
        const reviews = reviewModel.getReviewsByProduct(productId);
        res.status(200).json(reviews);      
    }
  } catch (err) {
    console.error('Error in getReviewsByProduct:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const addReview = (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      res.status(400).json({ message: 'Invalid product ID' });
    } else {
      const review = req.body;
      const newReview = reviewModel.addReview(productId, review);
      res.status(201).json(newReview);
    }   
  } catch (err) {
    console.error('Error in addReview:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateReview = (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.productId);
    const reviewId = parseInt(req.params.id);

    if (isNaN(productId) || isNaN(reviewId)) {
      res.status(400).json({ message: 'Invalid product or review ID' });
    } else {
      const updated = reviewModel.updateReview(productId, reviewId, req.body);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: 'Review not found' });
      } 
    }   
  } catch (err) {
    console.error('Error in updateReview:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteReview = (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.productId);
    const reviewId = parseInt(req.params.id);

    if (isNaN(productId) || isNaN(reviewId)) {
      res.status(400).json({ message: 'Invalid product or review ID' });
    } else {
      const deleted = reviewModel.deleteReview(productId, reviewId);
      if (deleted) {
        res.status(200).json({ message: 'Deleted successfully' });
      } 
      else {
        res.status(404).json({ message: 'Review not found' });
      } 
    }
  } catch (err) {
    console.error('Error in deleteReview:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// export const getReviewsByProduct = (req: Request, res: Response) => {
//   try {
//     const productId = parseInt(req.params.id);
//     if (isNaN(productId)) {
//       return res.status(400).json({ message: 'Invalid product ID' });
//     }

//     const reviews = reviewModel.getReviewsByProduct(productId);
//     return res.status(200).json(reviews);
//   } catch (err) {
//     console.error('Error in getReviewsByProduct:', err);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export const addReview = (req: Request, res: Response) => {
//   try {
//     const productId = parseInt(req.params.id);
//     if (isNaN(productId)) {
//       return res.status(400).json({ message: 'Invalid product ID' });
//     }

//     const review = req.body;
//     const newReview = reviewModel.addReview(productId, review);

//     return res.status(201).json(newReview);
//   } catch (err) {
//     console.error('Error in addReview:', err);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export const updateReview = (req: Request, res: Response) => {
//   try {
//     const productId = parseInt(req.params.productId);
//     const reviewId = parseInt(req.params.id);

//     if (isNaN(productId) || isNaN(reviewId)) {
//       return res.status(400).json({ message: 'Invalid product or review ID' });
//     }

//     const updated = reviewModel.updateReview(productId, reviewId, req.body);

//     if (updated) return res.status(200).json(updated);
//     else return res.status(404).json({ message: 'Review not found' });
//   } catch (err) {
//     console.error('Error in updateReview:', err);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export const deleteReview = (req: Request, res: Response) => {
//   try {
//     const productId = parseInt(req.params.productId);
//     const reviewId = parseInt(req.params.id);

//     if (isNaN(productId) || isNaN(reviewId)) {
//       return res.status(400).json({ message: 'Invalid product or review ID' });
//     }

//     const deleted = reviewModel.deleteReview(productId, reviewId);

//     if (deleted) return res.status(200).json({ message: 'Deleted successfully' });
//     else return res.status(404).json({ message: 'Review not found' });
//   } catch (err) {
//     console.error('Error in deleteReview:', err);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };