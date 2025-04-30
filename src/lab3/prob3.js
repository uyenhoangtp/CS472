"use strict";

let libraryBooks = [
  { title: "The Road Ahead", author: "Bill Gates", ID: 1235 },
  { title: "Walter Isaacson", author: "Steve Jobs", ID: 4268 },
  { title: "The Road Ahead", author: "Bill Gates", ID: 4268 },
  { title: "Mockingjay: The Final Book of The Hunger Games", author: "Suzanne Collins", ID: 3257 }
];

function addBook(title, author, ID) {
  const exists = libraryBooks.some(book => book.title === title && book.author === author && book.ID === ID);
  if (!exists) {
    const newBook = { title, author, ID }; // Object literal assignment
    libraryBooks.push(newBook);
    return newBook;
  }
  return null;
}

function getTitles() {
  return libraryBooks
    .map(book => book.title)
    .sort();
}

function findBooks(keyword) {
  return libraryBooks
    .filter(book => book.title.toLowerCase().includes(keyword.toLowerCase()))
    .sort((a, b) => a.ID - b.ID);
}

// ---------- Examples ----------

console.log("Added book:", addBook("New Book", "New Author", 5555));
console.log(libraryBooks)
console.log("Titles:", getTitles());
console.log("Books containing 'Road':", findBooks("Road"));
