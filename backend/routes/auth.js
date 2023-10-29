const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database');
const secrets = require('../secrets.json');
const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log(`Register new user ${username}`);
  const hashedPassword = bcrypt.hashSync(password, 10);
  const conn = db.getConenction();
  const query = 'INSERT INTO users (username, passwordHash) VALUES (?, ?)';
  conn.query(query, [username, hashedPassword], function(err, result) {
    if (err) throw err;
    res.status(201).send('Usuario creado');
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const conn = db.getConenction();
  const query = 'SELECT * FROM users WHERE username = ?';
  conn.query(query, [username], function(err, results) {
    if (err) throw err;

    if (results.length > 0) {
      const user = results[0];

      if (bcrypt.compareSync(password, user.passwordhash)) {
        const token = jwt.sign({ id: user.id }, secrets.jwt);
        res.status(200).json({ token });
      } else {
        res.status(401).send('Contraseña incorrecta');
      }
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  });
});

module.exports = router;
