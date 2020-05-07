const express = require('express');
const path = require('path');
require('../db/db');

const app = express();
app.use(express.json());
const publicPath = path.join(__dirname, '../public');

app.use('/static', express.static(publicPath));

module.exports = app;
