const { Router } = require('express');
const UserController = require('./controllers/UserController');
const ProdutoController = require('./controllers/ProdutoController');
const ContatoController = require('./controllers/ContatoController');
const Token = require('./helper/Token');

const routes = Router();

routes.get('/api/user/login', Token.Authenticate, UserController.Login);
routes.post('/api/user', UserController.Store);
routes.put('/api/user', UserController.Update);
routes.delete('/api/user', UserController.Delete);

routes.post('/api/produto', ProdutoController.Store);
routes.put('/api/produto/_id', ProdutoController.Update);
routes.delete('/api/produto/_id', ProdutoController.Delete);
routes.get('/api/produtos/', ProdutoController.Index);

routes.post('/api/contato', ContatoController.Store);

module.exports = routes;
