import React from "react";
import { BookProvider } from "./contexts/BookContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AddBook } from "./components/AddBook";
import { ListBooks } from "./components/ListBooks";
import { EditBook } from "./components/EditBook";

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="max-w-4xl mx-auto p-4" style={{ paddingLeft: '100px' }}>
          <h1 className="text-3xl font-bold mb-4">Book Library Management</h1>
          <nav className="mb-4 flex gap-4 items-center">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
            >
              🏠 Home
            </Link>
            <Link
              to="/add"
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition duration-300"
            >
              ➕ Add Book
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<ListBooks />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;
