const { Router } = require('express');
const UserController = require('./controllers/UserController');
const ProdutoController = require('./controllers/ProdutoController');
const ContatoController = require('./controllers/ContatoController');

const routes = Router();

/* routes.get('/api/user/:id', UserController.GetUser); */
routes.post('/api/user/login', UserController.Login);
routes.post('/api/user/', UserController.Store);
routes.put('/api/user/:id', UserController.Update);
routes.delete('/api/user/:id', UserController.Delete);

routes.post('/api/produto', ProdutoController.Store);
routes.put('/api/produto/:id', ProdutoController.Update);
routes.delete('/api/produto/:id', ProdutoController.Delete);
routes.get('/api/produtos/', ProdutoController.Index);

routes.post('/api/contato', ContatoController.Store);

module.exports = routes;
