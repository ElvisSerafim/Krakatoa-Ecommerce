import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import theme from './themes';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Produto from './pages/Produto';
import Kangas from './pages/Kangas';
import Shorts from './pages/Shorts';
import Batas from './pages/Batas';
import Vestidos from './pages/Vestidos';
import Cadastro from './pages/Cadastro';
import Carrinho from './pages/Carrinho';
import NotFound from './pages/NotFound';
import Conta from './pages/Conta';
import Produtos from './pages/Produtos'
import Endereco from './pages/Endereco';
import './index.css';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sobre" component={Sobre} />
        <Route path="/contato" component={Contato} />
        <Route path="/kangas"   render={props => <Produtos {...props} name="kangas" title="Kangas" />} />
        <Route path="/vestidos" render={props => <Produtos {...props} name="vestidos" title="Vestidos" />}/>
        <Route path="/batas"   render={props => <Produtos {...props} name="batas" title="Batas"/>}/>
        <Route path="/shorts" render={props => <Produtos {...props} name="shorts"title="Shorts" />} />
        <Route path="/carrinho" component={Carrinho} />
        <Route path="/id" component={Produto} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/minhaconta" component={Conta} />
        <Route path="/endereco" component={Endereco} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
