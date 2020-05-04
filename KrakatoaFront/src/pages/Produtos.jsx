/* Vestidos,Batas,Shorts,Kangas */

import React, { PureComponent } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import ProductList from '../components/Produtos';

const styles = {
  title: {
    fontSize: '3.75em',
    textAlign: 'center',
    margin: '64px',
    color: '#FF5757',
  },
};
export default class Produtos extends PureComponent {
  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <Typography style={styles.title}>Kangas</Typography>
          <ProductList />
        </Container>
      </>
    );
  }
}
