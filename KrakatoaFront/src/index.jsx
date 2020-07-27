/* eslint-disable react/jsx-props-no-spreading */
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
import theme from './themes';
import { PrivateRoute } from './Services/auth';
import withNav from './higherComponents/withNav';
import Endereco from './pages/Endereco';
import Sumario from './pages/Sumario';
import Checkout from './pages/Checkout';
import TesteGabriel from './pages/testeGabriel';
import Detalhes from './pages/Detalhes';
import MyAddress from './pages/MyAddress';
import Pedidos from './pages/Pedidos';
import Politicas from './pages/Politicas';

WebFont.load({
  google: {
    families: ['Poppins'],
  },
});

const Produtos = lazy(() => import('./pages/Produtos'));
const Produto = lazy(() => import('./pages/Produto'));
const Home = lazy(() => import('./pages/Home'));
const Sobre = lazy(() => import('./pages/Sobre'));
const Contato = lazy(() => import('./pages/Contato'));
const Login = lazy(() => import('./pages/Login'));
const MinhaConta = lazy(() => import('./pages/MinhaConta'));
const Carrinho = lazy(() => import('./pages/Carrinho'));

const Suspended = () => <div>Carregando...</div>;

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Suspense fallback={withNav(Suspended)}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/sobre" component={Sobre} />
              <Route path="/contato" component={Contato} />

              <Route
                path="/cangas"
                exact
                render={(props) => (
                  <Produtos {...props} tipo="cangas" categoria="Cangas" />
                )}
              />

              {['Mandalas', 'turisticas', 'pompom', 'estampada'].map((item) => (
                <Route
                  path={`/cangas/${item}`}
                  exact
                  render={(props) => (
                    <Produtos {...props} tipo="cangas" categoria={item} />
                  )}
                />
              ))}

              {['Vestidos', 'Batas', 'Shorts', 'Macaquinhos', 'confeccoes'].map(
                (item) => (
                  <Route
                    path={`/${item}`}
                    exact
                    render={(props) => (
                      <Produtos {...props} tipo="confeccoes" categoria={item} />
                    )}
                  />
                ),
              )}

              {['bolsas', 'acessorios', 'chapeus'].map((item) => (
                <Route
                  path={`/${item}`}
                  exact
                  render={(props) => (
                    <Produtos {...props} tipo="acessorios" categoria={item} />
                  )}
                />
              ))}

              <Route
                path="/pesquisa"
                exact
                render={(props) => (
                  <Produtos {...props} tipo="pesquisa" categoria="Pesquisa" />
                )}
              />

              <Route
                path="/vestidos/:id"
                render={(props) => <Produto {...props} />}
              />
              <Route
                path="/mandalas/:id"
                render={(props) => <Produto {...props} />}
              />
              <Route
                path="/turisticas/:id"
                render={(props) => <Produto {...props} />}
              />
              <Route
                path="/pompom/:id"
                render={(props) => <Produto {...props} />}
              />
              <Route
                path="/estampadas/:id"
                render={(props) => <Produto {...props} />}
              />
              <Route
                path="/estampada/:id"
                render={(props) => <Produto {...props} />}
              />
              <Route
                path="/bolsas/:id"
                render={(props) => <Produto {...props} />}
              />
              <Route
                path="/chapeus/:id"
                render={(props) => <Produto {...props} />}
              />

              <Route
                path="/cangas/:id"
                render={(props) => <Produto {...props} />}
              />
              <Route
                path="/acessorios/:id"
                render={(props) => <Produto {...props} />}
              />
              <Route
                path="/confeccoes/:id"
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
                path="/macaquinhos/:id"
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
                render={(props) => <Login {...props} />}
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
      </PersistGate>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
