/* Vestidos,Batas,Shorts,Kangas */

import React, { Component } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import ProductList from '../components/Produtos';
import ComboBox from '../components/ComboBox';
import Paginator from '../components/Paginator';
import Footer from '../components/Footer';
const styles = {
  title: {
    fontSize: '3.75em',
    textAlign: 'center',
    margin: '64px',
    color: '#FF5757',
  },
};
export default class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: []
    };
  }


  componentWillMount() {
    this.getProducts();
  }

    getProducts = async () => {
    console.log('Propriedade ' + this.props.name)
     const data =  await fetch(`http://localhost:4000/api/produtos/${this.props.name}`)
     const items = await data.json();
      const a = [items];
      this.setState({product: a})
      console.log(this.state.product)
    }

  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <Typography style={styles.title}>{this.props.title}</Typography>
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
            <ComboBox />
          </div>
          <ProductList products={this.state.product}/>
          <div style={{ marginTop: '50px' }}>
            <Paginator />
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}
