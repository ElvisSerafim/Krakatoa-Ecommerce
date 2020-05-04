const { Router } = require('express');
const UserController = require('./controllers/UserController');
const ProdutoController = require('./controllers/ProdutoController');
const ContatoController = require('./controllers/ContatoController');
const auth = require('./middleware/auth');

const routes = Router();

routes.get('/api/user/me', auth, async (req, res) => {
  res.send(req.user);
});
routes.post('/api/user/login', UserController.Login);
routes.post('/api/user/', UserController.Store);
routes.put('/api/user/me', auth, UserController.Update);
routes.put('/api/user/me/endereco', auth, UserController.UpdateEnde);
routes.post('/api/user/me/logout', auth, UserController.Logout);
routes.post('/api/user/me/logoutall', auth, UserController.LogoutAll);
routes.delete('/api/user/me', auth, UserController.Delete);

routes.post('/api/produto', ProdutoController.Store);
routes.put('/api/produto/:id', ProdutoController.Update);
routes.delete('/api/produto/:id', ProdutoController.Delete);
routes.get('/api/produtos/', ProdutoController.Index);

routes.post('/api/contato', ContatoController.Store);

module.exports = routes;
