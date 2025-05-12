import React, { useState, useEffect } from 'react';
import { useBookContext } from '../contexts/BookContext';
import { useParams, useNavigate } from 'react-router-dom';

export const EditBook = () => {
  const { books, updateBook } = useBookContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === id);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook(id, { id, title, author });
    navigate('/');
  };

  if (!book) return <p>Book not found.</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded mb-2 block w-full"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="p-2 border rounded mb-2 block w-full"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded mr-2">
        Save
      </button>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="bg-gray-300 p-2 rounded"
      >
        Cancel
      </button>
    </form>
  );
};
