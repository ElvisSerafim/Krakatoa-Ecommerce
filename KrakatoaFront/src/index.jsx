/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import theme from './themes';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Produto from './pages/Produto';
import Carrinho from './pages/Carrinho';
/* import NotFound from './pages/NotFound'; */
import Conta from './pages/Conta';
import MinhaConta from './pages/MinhaConta';
import Produtos from './pages/Produtos';
import Endereco from './pages/Endereco';
import Sumario from './pages/Sumario';
import Checkout from './pages/Checkout';
import store from './store';
import './index.css';
import TesteGabriel from './pages/testeGabriel';
import Detalhes from './pages/Detalhes';
import MyAddress from './pages/MyAddress';
import { sendAllProducts } from './reducers/allProducts';
import api from './Services/ApiService';


const getProducts = async () => {
  const request = await api.ListaProdutos();
  return request;
};

const request = getProducts();
console.log(request);


ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sobre" component={Sobre} />
          <Route path="/contato" component={Contato} />
          <Route
            path="/kangas"
            exact
            render={(props) => (
              <Produtos {...props} name="kangas" title="Kangas" />
            )}
          />
          <Route
            path="/vestidos"
            exact
            render={(props) => (
              <Produtos {...props} name="vestidos" title="Vestidos" />
            )}
          />
          <Route
            path="/batas"
            exact
            render={(props) => <Produtos {...props} name="batas" title="Batas" />}
          />
          <Route
            path="/shorts"
            exact
            render={(props) => (
              <Produtos {...props} name="shorts" title="Shorts" />
            )}
          />
          <Route
            path="/kangas/:id"
            render={(props) => <Produto {...props} produtos={request} />}
          />
          <Route
            path="/batas/:id"
            render={(props) => <Produto {...props} produtos={request} />}
          />
          <Route
            path="/shorts/:id"
            render={(props) => <Produto {...props} produtos={request} />}
          />
          <Route
            path="/vestidos/:id"
            render={(props) => <Produto {...props} produtos={request} />}
          />
          <Route path="/carrinho" component={Carrinho} />
          <Route path="/conta" component={MinhaConta} />
          <Route path="/minhaconta" component={Conta} />
          <Route path="/endereco" component={Endereco} />
          <Route path="/sumario" component={Sumario} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/testeGabriel" component={TesteGabriel} />
          <Route path="/myaddress" component={MyAddress} />
          <Route path="/detalhes" component={Detalhes} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
