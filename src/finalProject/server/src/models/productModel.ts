import fs from "fs";
import path from "path";
import { Product } from "./types";

const filePath = path.join(__dirname, "../data/products.json");

function readData(): Product[] {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

interface GetAllProductsParams {
  page: number;
  category?: string;
  limit?: number;
}

export function getAllProducts({
  page,
  category,
  limit = 10,
}: GetAllProductsParams): { products: Product[]; total: number } {
  let data = readData();
  if (category) {
    data = data.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  const total = data.length; // Total number of products
  const sorted = data.sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );

  const start = (page - 1) * limit;
  const end = start + limit;

  return { products: sorted.slice(start, end), total };
}

export function searchProducts(q: string): Product[] {
  const data = readData();
  return data.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
}

export function getProductById(productId: number): Product | null {
  const data = readData();
  return data.find((p) => p.id === productId) || null;
}
