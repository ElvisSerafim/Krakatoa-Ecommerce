const { Router } = require('express');
const UserController = require('./controllers/UserController');
const ProdutoController = require('./controllers/ProdutoController');

const routes = Router();

routes.get('/api/user/login', UserController.Login);
routes.post('/api/user', UserController.Store);
routes.put('/api/user', UserController.Update);
routes.delete('/api/user', UserController.Delete);

routes.post('/api/produto', ProdutoController.Store);
routes.put('/api/produto/_id', ProdutoController.Update);
routes.delete('/api/produto/_id', ProdutoController.Delete);
routes.get('/api/produtos/', ProdutoController.Index);

module.exports = routes;
