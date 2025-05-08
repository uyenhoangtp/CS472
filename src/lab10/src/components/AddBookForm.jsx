import { useBookContext } from "../contexts/BookContext";
import { useState } from "react";

export default function AddBookForm() {
  const { addBook } = useBookContext();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author) {
      setError("Please fill in all fields");
      return;
    }
    try {
      await addBook({ title, author });
      setTitle("");
      setAuthor("");
      setError(null);
    } catch (error) {
      setError("Failed to add book");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Book</h2>
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
      <button type="submit">Add Book</button>
    </form>
  );
}