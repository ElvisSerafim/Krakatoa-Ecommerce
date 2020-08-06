/* eslint-disable react/jsx-props-no-spreading */
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
import theme from './themes';
import { PrivateRoute } from './Services/auth';
import withNav from './higherComponents/withNav';
import Topo from './components/Topo';
import Navbar from './components/Nav';
import Footer from './components/Footer';

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
const Sumario = lazy(() => import('./pages/Sumario'));
const Detalhes = lazy(() => import('./pages/Detalhes'));
const MyAddress = lazy(() => import('./pages/MyAddress'));
const Pedidos = lazy(() => import('./pages/Pedidos'));
const Carrinho = lazy(() => import('./pages/Carrinho'));
const PrazoEntrega = lazy(() => import('./pages/PrazoEntrega'));
const Endereco = lazy(() => import('./pages/Endereco'));
const RecuperarSenha = lazy(() => import('./pages/RecuperarSenha'));
const RedefinirSenha = lazy(() => import('./pages/RedefinirSenha'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Politicas = lazy(() => import('./pages/Politicas'));
const Revenda = lazy(() => import('./pages/Revenda'));

const Suspended = () => (
  <div style={{ width: '100%' }}>
    <LinearProgress color="secondary" />
  </div>
);
const NewComponent = withNav(Suspended);
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Topo />
          <Navbar />
          <Suspense fallback={<NewComponent />}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/sobre" component={Sobre} />
              <Route path="/prazoEntrega" component={PrazoEntrega} />
              <Route path="/revenda" component={Revenda} />
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
                  key={item}
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
                    key={item}
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
                  key={item}
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
              <Route path="/recuperarSenha" component={RecuperarSenha} />
              <Route path="/redefinirSenha" component={RedefinirSenha} />
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
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
