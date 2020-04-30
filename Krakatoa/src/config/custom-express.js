const express = require('express');
const mongoose = require('mongoose');
const secureEnv = require('secure-env');

const password = '3568023445844fdd0b1832ec16f1c4aebad665564af265899ebe017f9694127ca110e5b845f663a701fb8f409a7b5e1a4fb8ba77e41f7c008004146d52572b3g';

global.env = secureEnv({ secret: password }, { path: '/c/Users/Gusta/OneDrive/Área de Trabalho/projetos/Krakatoa/src/' });
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
