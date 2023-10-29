const express = require('express');
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const db = require('./database');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Montar los routers
app.use('/auth', authRoutes);
app.use('/books', booksRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  //db.rebuildDatabase();
});
