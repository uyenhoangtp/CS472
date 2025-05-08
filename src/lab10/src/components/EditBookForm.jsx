import React, { useEffect } from 'react';
import { useBookContext } from "../contexts/BookContext";
import { useState } from "react";
export default function EditBookForm({ book }) {
    const { updateBook } = useBookContext();
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setTitle(book.title);
        setAuthor(book.author);
    }, [book]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !author) {
        setError("Please fill in all fields");
        return;
        }
        try {
        await updateBook(book.id,{ ...book, title, author });
        } catch (error) {
        setError("Failed to update book");
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
        <h2>Edit Book</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />
        <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
        />
        <button type="submit">Update Book</button>
        </form>
    );
}