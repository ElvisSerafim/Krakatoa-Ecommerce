import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Login from './pages/Login';
import Produto from './pages/Produto';
import Produtos from './pages/Produtos';
import Kangas from './pages/Kangas';
import Shorts from './pages/Shorts';
import Batas from './pages/Batas';
import Vestidos from './pages/Vestidos';
import Cadastro from './pages/Cadastro';
import Carrinho from './pages/Carrinho';
import NotFound from './pages/NotFound';
import MinhaConta from './pages/MinhaConta';
import './index.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sobre" component={Sobre} />
        <Route path="/contato" component={Contato} />
        <Route path="/kangas" component={Kangas} />
        <Route path="/vestidos" component={Vestidos} />
        <Route path="/batas" component={Batas} />
        <Route path="/shorts" component={Shorts} />
        <Route path="/carrinho" component={Carrinho} />
        <Route path="/id" component={Produto} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/login" component={Login} />
        <Route path="/minhaconta" component={MinhaConta} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
