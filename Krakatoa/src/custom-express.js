const express = require('express');
const path = require('path');
const cors = require('cors');
require('./db/db');

const app = express();
app.use(cors());

app.use(express.json());

const publicPath = path.join(__dirname, '/public');

app.use('/static', express.static(publicPath));

module.exports = app;
