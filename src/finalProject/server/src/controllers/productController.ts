import { Request, Response } from "express";
import * as productModel from "../models/productModel";

export const getAllProducts = (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = (req.query.category as string)?.trim();

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      res.status(400).json({ message: "Invalid page or limit parameters" });
      return;
    }

    const { products, total } = productModel.getAllProducts({
      page,
      limit,
      category: category || undefined, // undefined if category is not provided
    });

    res.status(200).json({ products, total });
  } catch (err) {
    console.error("Error in getAllProducts:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const getAllProducts = (req: Request, res: Response) => {
//   try {
//     const { page = "1", limit = "10", category } = req.query;
//     const pageNumber = parseInt(page as string);
//     const lim = parseInt(limit as string);

//     if (isNaN(pageNumber) || pageNumber < 1 || isNaN(lim) || lim < 1) {
//       res.status(400).json({ message: "Invalid page or limit parameters" });
//       return;
//     }

//     const { products, total } = productModel.getAllProducts({
//       page: pageNumber,
//       category: category as string,
//       limit: lim,
//     });

//     res.status(200).json({ products, total });
//   } catch (err) {
//     console.error("Error in getAllProducts:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const searchProducts = (req: Request, res: Response) => {
  try {
    const query = (req.query.q || "") as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!query.trim()) {
      res.status(400).json({ message: "Missing or empty search query" });
      return;
    }

    const allResults = productModel.searchProducts(query);
    const total = allResults.length;

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedResults = allResults.slice(start, end);

    res.status(200).json({ products: paginatedResults, total });
  } catch (err) {
    console.error("Error in searchProducts:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const product = productModel.getProductById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error in getProductById:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
