/* Pagina de Inicio */

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Promos from '../components/promos';
import api from '../Services/ApiService';
import HomeComp from '../components/Home';
import Footer from '../components/Footer';
import {sendAllProducts} from '../reducers/allProducts'
import { useDispatch } from 'react-redux';


const styles = {
  Promos: { width: 'auto', height: '373px', backgroundColor: '#B1B1B1' },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: 2,
  },
  Carrocel: {
    height: '752.29px',
    width: 'auto',
    backgroundColor: '#B1B1B1',
    marginTop: '2em',
  },
  Titulo: { fontSize: '3em', fontWeight: '300' },
};


const Home = ({ })=> {
 

  return (
    <>
      <Container maxWidth="lg">
        <Topo />
        <div style={{ marginBottom: 64 }}>
          <Navbar />
        </div>
      </Container>
      <Grid item lg={12} md={2}>
        <HomeComp />
      </Grid>
      <Container maxWidth="lg">
        <Grid container spacing={2} justify="space-evenly">
          <Grid item lg={12} md={2}>
            <Promos />
          </Grid>
          <Grid item lg={12} md={2}>
            <Typography style={styles.Titulo}>Mais Procurados</Typography>
          </Grid>
          <Grid item lg={3} md={2}>
            <div>5</div>
          </Grid>
          <Grid item lg={3} md={2}>
            <div>6</div>
          </Grid>
          <Grid item lg={3} md={1}>
            <div>7</div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )

}

export default Home;

/* export default class Home extends PureComponent {
  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <div style={{ marginBottom: 64 }}>
            <Navbar />
          </div>
        </Container>
        <Grid item lg={12} md={2}>
          <HomeComp />
        </Grid>
        <Container maxWidth="lg">
          <Grid container spacing={2} justify="space-evenly">
            <Grid item lg={12} md={2}>
              <Promos />
            </Grid>
            <Grid item lg={12} md={2}>
              <Typography style={styles.Titulo}>Mais Procurados</Typography>
            </Grid>
            <Grid item lg={3} md={2}>
              <div>5</div>
            </Grid>
            <Grid item lg={3} md={2}>
              <div>6</div>
            </Grid>
            <Grid item lg={3} md={1}>
              <div>7</div>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </>
    );
  }
}
 */