// BookContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { use } from "react";

const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Implement CRUD functions and useEffect here

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "https://67d17ef590e0670699ba5929.mockapi.io/books"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBooks(data);
      console.log(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async (newBook) => {
    try {
      const response = await fetch(
        "https://67d17ef590e0670699ba5929.mockapi.io/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBooks((prevBooks) => [...prevBooks, data]);
    } catch (error) {
      setError(error);
    }
  };

  const updateBook = async (id, updatedBook) => {
    try {
      const response = await fetch(
        `https://67d17ef590e0670699ba5929.mockapi.io/books/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBook),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === id ? data : book))
      );
    } catch (error) {
      setError(error);
    }
  }

  const deleteBook = async (id) => {
    try {
      const response = await fetch(
        `https://67d17ef590e0670699ba5929.mockapi.io/books/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      setError(error);
    }
  }
  
  //addBook, updateBook, deleteBook
  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook, loading, error }}>
      {children}
    </BookContext.Provider>
  );
};
export const useBookContext = () => useContext(BookContext);
