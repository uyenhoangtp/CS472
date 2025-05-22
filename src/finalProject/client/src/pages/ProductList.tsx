import React, { useEffect, useState } from 'react';
import type { Product } from '../types/types';
import { getProducts } from '../api/products';
import { NavLink } from 'react-router';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search input
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
  const [totalPages, setTotalPages] = useState<number>(1); // State for total pages
  const [category, setCategory] = useState<string>(''); // State for selected category

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, currentPage, category]); // Refetch products when searchQuery, currentPage, or category changes

  const fetchProducts = async () => {
    try {
      const limit = 10; // Number of products per page
      const response = await getProducts(searchQuery, currentPage, limit, category); // Fetch products with pagination and category
      setProducts(response.products); // Set paginated products
      setTotalPages(Math.ceil(response.total / limit)); // Calculate total pages based on total products
    } catch {
      setError('Failed to fetch products.');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query state
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value); // Update selected category
    setCurrentPage(1); // Reset to the first page when changing category
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Update current page
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearch}
        className="border p-2 mb-4 w-full"
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={handleCategoryChange}
        className="border p-2 mb-4 w-full"
      >
        <option value="">All Categories</option>
        <option value="Smartphones">Smartphones</option>
        <option value="Laptops">Laptops</option>
        <option value="Audio">Audio</option>
        <option value="Accessories">Accessories</option>
        <option value="Gaming">Gaming</option>
        <option value="Wearables">Wearables</option>
        <option value="Smart Home">Smart Home</option>
        <option value="Cameras">Cameras</option>
      </select>

      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p.id} className="border p-3 rounded shadow">
            <h2 className="text-xl font-bold">{p.name}</h2>
            <p><strong>ID:</strong> {p.id}</p>
            <p><strong>Description:</strong> {p.description}</p>
            <p><strong>Category:</strong> {p.category}</p>
            <p><strong>Price:</strong> ${p.price}</p>
            <p><strong>Date Added:</strong> {new Date(p.dateAdded).toLocaleDateString()}</p>
            <p><strong>Average Rating:</strong> {p.averageRating} ⭐</p>
            <NavLink
              to={`/products/${p.id}/reviews`}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Reviews
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${
            currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white'
          }`}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 border rounded ${
              page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
