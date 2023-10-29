const express = require('express');
const router = express.Router();
const db = require('../database');
const checkAuth = require('./checkAuth');

router.get('/read-books', async (req, res) => {
  const userId = await checkAuth.check(req);
  if (userId === -1){
    res.status(403).send('Token no válido');
    return;
  }
  const query = 'SELECT books.id, books.title FROM user_books JOIN books ON user_books.book = books.id WHERE user_books.user = ?';
  const results = await db.executeAsyncQuery(query, [userId]);
  res.json(results);
});

// Endpoint para añadir un nuevo libro
router.post('/add', async (req, res) => {
  const { title } = req.body;

  console.log(`Add book ${title}`);
  const userId = await checkAuth.check(req);
  if (userId === -1){
    res.status(403).send('Token no válido');
    return;
  }
  
  // Insertar nuevo libro en la tabla Books
  const queryInsertBook = 'INSERT INTO Books (title) VALUES (?)';
  const results = await db.executeAsyncQuery(queryInsertBook, [title]);
  const bookId = results.insertId;

  // Insertar relación en la tabla user_books
  const queryInsertUserBook = 'INSERT INTO user_books (user, book) VALUES (?, ?)';
  await db.executeAsyncQuery(queryInsertUserBook, [userId, bookId]);
  res.status(200).send('Libro añadido exitosamente.');
});

module.exports = router;
