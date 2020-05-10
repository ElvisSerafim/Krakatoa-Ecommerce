const express = require('express');
const path = require('path');
require('./db/db');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', (req, res) => res.send('pong'));
app.get('/*', (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, 'build', 'index.html'));
  } catch (error) {
    return res.status(500);
  }
});

module.exports = app;
