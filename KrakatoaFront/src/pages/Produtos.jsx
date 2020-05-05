/* Vestidos,Batas,Shorts,Kangas */

import React, { Component } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import ProductList from '../components/Produtos';
import ComboBox from '../components/ComboBox';
import Paginator from '../components/Paginator';
import Footer from '../components/Footer';

export default class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      orderBy: ''
    };
  }

  componentWillMount() {
    this.getProducts();
    console.log(this.props);
  }

  getProducts = async () => {
    console.log('Propriedade ' + this.props.name)
    const data = await fetch("http://localhost:4000/api/produtos/query", {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tipo: this.props.name,
        chave: ''
      })  // <-- Post parameters
    })
    const items = await data.json();
    const a = [items];
    this.setState({ product: a })
    console.log(this.state.product)
  }

  orderBy = async (value) => {
    console.log("estado atual: " + value)
    let key = '';
    if (value == '') {
      return;
    } else if (value == 'Mais vendidos') {
      key = "maiorV";
    } else if (value == 'Menor Preço') {
      key = "menorP";
    } else {
      key = "maiorP";
    }
    console.log("key: " + key)
    const dat = await fetch("http://localhost:4000/api/produtos/query", {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tipo: this.props.name,
        chave: key
      })  // <-- Post parameters
    })
    const itens = await dat.json();
    const b = [itens];
    this.setState({ product: b })
    console.log(b)

  }

  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <Typography variant="h2" color="primary" >{this.props.title}</Typography>
          <div
            style={{
              display: 'flex',
              width: '98%',
              paddingBottom: '20px',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <ComboBox onChange={(event) => {
              this.setState({ orderBy: event.target.value })
              this.orderBy(event.target.value);
            }}
              value={this.state.orderBy}
              items={['Mais vendidos', 'Menor Preço', 'Maior Preço']}
              label="Ordenar por: "
            />
          </div>
          <ProductList products={this.state.product} />
          <div style={{ marginTop: '50px' }}>
            <Paginator />
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}
