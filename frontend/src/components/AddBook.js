import React, { useState } from 'react';
import appConfig from '../appConfig.json';
import axios from 'axios';

const AddBook = ({token, onNewBook}) => {
  const [title, setTitle] = useState('');

  const addBook = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.post(appConfig.apiPath + '/books/add', { title }, config);
      if (onNewBook) onNewBook();
    } catch (error) {
      console.error('Ocurrió un error:', error);
    }
  };

  return (
    <div>
      <h1>Añadir un libro</h1>
      <input
        type="text"
        placeholder="Título del libro"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addBook}>Añadir</button>
    </div>
  );
};

export default AddBook;
