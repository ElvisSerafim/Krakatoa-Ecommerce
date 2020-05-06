/* eslint-disable react/prop-types */
/* Vestidos,Batas,Shorts,Kangas */

import React, { Component } from 'react';
import { Container, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import ProductList from '../components/Produtos';
import ComboBox from '../components/ComboBox';
import Paginator from '../components/Paginator';
import Footer from '../components/Footer';
import api from '../Services/ApiService';

export default class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      orderBy: '',
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    const { name } = this.props;
    const data = {
      tipo: name,
      chave: '',
    };

    const request = await api.GetProdutos(data);

    const a = [request];
    this.setState({ product: a });
  }

  async orderBy(value) {
    const { name } = this.props;

    let chave = '';
    if (value === '') return;
    if (value === 'Mais vendidos') chave = 'maiorV';
    if (value === 'Menor Preço') chave = 'menorP';
    if (value === 'Maior Preço') chave = 'maiorP';

    const data = {
      tipo: name,
      chave,
    };

    const request = await api.GetProdutos(data);

    const b = [request];
    this.setState({ product: b });
  }

  render() {
    const { title } = this.props;
    const { orderBy, product } = this.state;
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <Typography variant="h2" color="primary">
            {title}
          </Typography>
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
            <ComboBox
              onChange={(event) => {
                this.setState({ orderBy: event.target.value });
                this.orderBy(event.target.value);
              }}
              style={{ width: 300 }}
              value={orderBy}
              items={['Mais vendidos', 'Menor Preço', 'Maior Preço']}
              label="Ordenar por: "
            />
          </div>
          <ProductList products={product} />
          <div style={{ marginTop: '50px' }}>
            <Paginator />
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}
