/* Vestidos,Batas,Shorts,Kangas */

import React, { PureComponent } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import ProductList from '../components/Produtos';
import Paginator from '../components/Paginator';
import ComboBox from '../components/ComboBox';
import Footer from '../components/Footer';

const styles = {
  title: {
    fontSize: '3.75em',
    textAlign: 'center',
    margin: '64px',
    color: '#FF5757',
  },
};
export default class Kangas extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: '',
    };
  }

  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <Typography style={styles.title}>Shorts</Typography>
          <div
            style={{
              display: 'flex',
              width: '85%',
              paddingBottom: '20px',
              marginLeft: '100px',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <ComboBox />
          </div>
          <ProductList />
          <div style={{ marginTop: '50px' }}>
            <Paginator />
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}
