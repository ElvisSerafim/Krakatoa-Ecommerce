/* Pagina de Inicio */

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Promos from '../components/promos';
import HomeComp from '../components/Home';
import Footer from '../components/Footer';
import { sendAllProducts } from '../reducers/allProducts';
import { Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Themes from '../themes';
import deli from '../img/deli.png'
import pqKraka from '../img/pqKraka.png'
import money from '../img/money.png'
import pag from '../img/pagarIcone.png'
import Estilos from '../Estilos';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
    },
  },
});
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

const Home = () => (
  <>
    <Container maxWidth="lg">
      <Topo />
      <div style={{ marginBottom: 64 }}>
        <Navbar />
      </div>
    </Container>
    <Grid item lg={12} md={12}>
      <HomeComp />
    </Grid>
    <Container maxWidth="lg">
      <Grid container spacing={2} justify="space-evenly">
        <Grid item lg={12} md={2} sm={2}>
          <Promos />
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          <Typography style={styles.Titulo}>Mais Procurados</Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={3}>
          <div>5</div>
        </Grid>
        <Grid item lg={3} md={3} sm={3}>
          <div>6</div>
        </Grid>
        <Grid item lg={3} md={3} sm={3}>
          <div>7</div>
        </Grid>
        <Grid item lg={3} md={3} sm={3}></Grid>
        <Grid item container justify='center' lg={12} md={12}sm={12}>
            <Button
              variant="contained"
              color="primary"
              style={Themes.palette.accent}
            >
              VEJA TODOS
            </Button>
        </Grid>
        <Grid item lg={12} md={12}sm={12}>
          <Typography style={{ textAlign: 'center' }} variant="h5">
            Por que Krakatoa?
          </Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={3}>
        <div style={{backgroundColor:'#E8E8E8',width:70,height:70,borderRadius:10}}>
        <img style={{padding:'25px 0px 0px 15px'}}src={deli}/>
        </div>        
        </Grid>
        <Grid item lg={3} md={3} sm={3}>
        <div style={{backgroundColor:'#FFF3DF',width:70,height:70,borderRadius:10}}>
        <img style={{padding:'17px 0px 0px 16px'}}src={pag}/>
        </div>
        </Grid>
        <Grid item lg={3} md={3} sm={3}>
        <div style={{backgroundColor:'#E8E8E8',width:70,height:70,borderRadius:10}}>
        <img style={{padding:'22px 0px 0px 20px'}} src={money}/>
        </div>
        </Grid>
        <Grid item lg={3} md={3} sm={3}>
        <div style={{backgroundColor:'#E8E8E8',width:70,height:70,borderRadius:10}}>
        <img style={{padding:'20px 0px 0px 17px'}} src={pqKraka}/>
        </div>
        </Grid>
      </Grid>
    </Container>
    <Footer />
  </>
);

export default Home;
