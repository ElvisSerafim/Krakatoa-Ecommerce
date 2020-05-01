const express = require('express');
require('../db/db');

const app = express();
app.use(express.json());

module.exports = app;
