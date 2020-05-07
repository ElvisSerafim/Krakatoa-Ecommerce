const express = require('express');
require('../db/db');

const app = express();
app.use(express.json());
app.use(express.static('public'));

module.exports = app;
