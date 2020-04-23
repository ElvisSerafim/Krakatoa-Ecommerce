const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
mongoose.connect(
  'mongodb+srv://root:PEall7FdNCY3aatg@cluster0-ivnk7.gcp.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
mongoose.set('useCreateIndex', true);


module.exports = app;
