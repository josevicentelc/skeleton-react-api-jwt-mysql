import React, { useState, useEffect } from 'react';
import appConfig from '../appConfig.json';
import AddBook from './AddBook';
import axios from 'axios';

const BookList = ({ token }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get(appConfig.apiPath + '/books/read-books', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(data);
    } catch (error) {
      alert('Error al obtener los libros');
    }
  };

  useEffect(() => {
    fetchBooks();
  });

  return (
    <div>
      <h1>Libros leídos</h1>
      <AddBook token={token} onNewBook={fetchBooks} />
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
