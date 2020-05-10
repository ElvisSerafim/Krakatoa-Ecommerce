const express = require('express');
const path = require('path');
require('./db/db');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

const publicPath = path.join(__dirname, '/public');

app.use('/static', express.static(publicPath));

app.get('/*', (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, 'build', 'index.html'));
  } catch (error) {
    return res.status(500);
  }
});

module.exports = app;
