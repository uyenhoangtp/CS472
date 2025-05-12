import React from 'react';
import { useBookContext } from '../contexts/BookContext';
import { Link } from 'react-router-dom';

export const ListBooks = () => {
  const { books, deleteBook } = useBookContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {books.map((book) => (
        <div key={book.id} className="border p-4 rounded shadow">
          <h3 className="font-bold text-lg">{book.title}</h3>
          <p className="text-gray-600">by {book.author}</p>
          <Link to={`/edit/${book.id}`} className="bg-yellow-400 p-2 m-1 rounded inline-block">
            Edit
          </Link>
          <button
            onClick={() => deleteBook(book.id)}
            className="bg-red-500 text-white p-2 m-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};