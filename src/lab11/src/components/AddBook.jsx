import React, { useState } from 'react';
import { useBookContext } from '../contexts/BookContext';

export const AddBook = () => {
  const { addBook } = useBookContext();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) return;
    addBook({ title, author });
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="p-2 border rounded mb-2 block w-full"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
        className="p-2 border rounded mb-2 block w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Book
      </button>
    </form>
  );
};