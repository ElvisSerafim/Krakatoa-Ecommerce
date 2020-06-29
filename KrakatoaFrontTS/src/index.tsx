import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, RouteProps } from 'react-router-dom';
import './index.css';
import store from './store';
import theme from './themes';
import { PrivateRoute } from './Services/auth';

import Endereco from './pages/Endereco';
import Sumario from './pages/Sumario';
import Checkout from './pages/Checkout';
import TesteGabriel from './pages/testeGabriel';
import Detalhes from './pages/Detalhes';
import MyAddress from './pages/MyAddress';
import Pedidos from './pages/Pedidos';
import Politicas from './pages/Politicas';

const Produtos = lazy(() => import('./pages/Produtos'));
const Produto = lazy(() => import('./pages/Produto'));
const Home = lazy(() => import('./pages/Home'));
const Sobre = lazy(() => import('./pages/Sobre'));
const Contato = lazy(() => import('./pages/Contato'));
const Login = lazy(() => import('./pages/Login'));
const MinhaConta = lazy(() => import('./pages/MinhaConta'));
const Carrinho = lazy(() => import('./pages/Carrinho'));

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Carregando...</div>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sobre" component={Sobre} />
            <Route path="/contato" component={Contato} />
            <Route
              path="/cangas"
              exact
              render={(props) => (
                <Produtos {...props} name="cangas" title="Cangas" />
              )}
            />
            <Route
              path="/cangas/mandalas"
              exact
              render={(props) => (
                <Produtos {...props} name="cangas" title="Mandalas" />
              )}
            />
            <Route
              path="/cangas/turisticas"
              exact
              render={(props) => (
                <Produtos {...props} name="turisticas" title="Turisticas" />
              )}
            />
            <Route
              path="/cangas/pompom"
              exact
              render={(props) => (
                <Produtos {...props} name="pompom" title="Pompom" />
              )}
            />
            <Route
              path="/cangas/estampada"
              exact
              render={(props) => (
                <Produtos {...props} name="estampada" title="Estampada" />
              )}
            />
            <Route
              path="/vestidos"
              exact
              render={(props) => (
                <Produtos {...props} name="confeccões" title="Vestidos" />
              )}
            />
            <Route
              path="/batas"
              exact
              render={(props) => (
                <Produtos {...props} name="confeccões" title="Batas" />
              )}
            />
            <Route
              path="/shorts"
              exact
              render={(props) => (
                <Produtos {...props} name="shorts" title="Shorts" />
              )}
            />
            <Route
              path="/macaquinhos"
              exact
              render={(props) => (
                <Produtos {...props} name="macaquinhos" title="Macaquinhos" />
              )}
            />
            <Route
              path="/confeccoes"
              exact
              render={(props) => (
                <Produtos {...props} name="confeccões" title="Confeccões" />
              )}
            />
            <Route
              path="/bolsas"
              exact
              render={(props) => (
                <Produtos {...props} name="bolsas" title="Bolsas" />
              )}
            />
            <Route
              path="/chapeus"
              exact
              render={(props) => (
                <Produtos {...props} name="chapeus" title="Chapeus" />
              )}
            />
            <Route
              path="/acessorios"
              exact
              render={(props) => (
                <Produtos {...props} name="acessorios" title="Acessórios" />
              )}
            />
            <Route
              path="/pesquisa"
              exact
              render={(props) => (
                <Produtos {...props} name="pesquisa" title="Pesquisa" />
              )}
            />
            <Route
              path="/cangas/:id"
              render={(props) => <Produto {...props} />}
            />
            <Route
              path="/batas/:id"
              render={(props) => <Produto {...props} />}
            />
            <Route
              path="/shorts/:id"
              render={(props) => <Produto {...props} />}
            />
            <Route
              path="/vestidos/:id"
              render={(props) => <Produto {...props} />}
            />
            <Route
              path="/pesquisa/:id"
              render={(props) => <Produto {...props} />}
            />
            <Route path="/carrinho" component={Carrinho} />
            <Route path="/testeGabriel" component={TesteGabriel} />
            <Route
              path="/login"
              component={Login}
              render={(props: RouteProps) => <Login {...props} />}
            />
            <Route path="/inicio" component={Home} />
            <Route path="/politicasdaloja" component={Politicas} />
            <PrivateRoute path="/conta" exact component={MinhaConta} />
            <PrivateRoute path="/endereco" component={Endereco} />
            <PrivateRoute path="/sumario" component={Sumario} />
            <PrivateRoute path="/checkout" component={Checkout} />
            <PrivateRoute
              path="/conta/meuendereco"
              exact
              component={MyAddress}
            />
            <PrivateRoute path="/conta/detalhes" exact component={Detalhes} />
            <PrivateRoute path="/conta/pedidos" exact component={Pedidos} />

            {/* <Route component={NotFound} /> */}
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
