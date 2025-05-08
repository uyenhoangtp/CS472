import { useBookContext } from "../contexts/BookContext";
import EditBookForm from "./EditBookForm";

export default function BookList() {
    const { books, deleteBook, loading, error } = useBookContext();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    return (
        <div>
        <h1>Book List</h1>
        <ul>
            {books.map((book) => (
            <ul key={book.id}>
                {book.title} by {book.author}
                <EditBookForm book={book} />
                <button onClick={() => deleteBook(book.id)}>Delete</button>
            </ul>
            ))}
        </ul>
        </div>
    );
}