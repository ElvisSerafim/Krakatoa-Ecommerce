/* Pagina de Inicio */

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import TextField from '../components/TextField';
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
import deli from '../img/deli.png';
import pqKraka from '../img/pqKraka.png';
import money from '../img/money.png';
import pag from '../img/pagarIcone.png';
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
  deli: { backgroundColor: '#E8E8E8', width: 70, height: 70, borderRadius: 10 },
  pag: { backgroundColor: '#FFF3DF', width: 70, height: 70, borderRadius: 10 },
  pqKraka: {
    backgroundColor: '#E8E8E8',
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  money: {
    backgroundColor: '#E8E8E8',
    width: 70,
    height: 70,
    borderRadius: 10,
  },
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
          <Typography style={styles.Titulo} color="primary">
            Mais Procurados
          </Typography>
        </Grid>
        <Grid item lg={4} md={4} sm={4}>
          <div>5</div>
        </Grid>
        <Grid item lg={4} md={4} sm={4}>
          <div>6</div>
        </Grid>
        <Grid item lg={4} md={4} sm={4}>
          <div>7</div>
        </Grid>
        <Grid item container style={{ paddingBottom:'20px' }}justify="center" lg={12} md={12} sm={12}>
          <Button
            variant="contained"
            color="primary"
            style={Themes.palette.accent}
          >
            VEJA TODOS
          </Button>
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          <Typography
            color="primary"
            style={{ textAlign: 'center', paddingBottom:'40px'}}
            variant="h5"
          >
            Por que Krakatoa?
          </Typography>
        </Grid>

        <Grid item lg={3} md={12} sm={12} xs={12}>
          <div style={styles.deli}>
            <img style={{ padding: '25px 0px 0px 15px' }} src={deli} />
          </div>
          <Typography color="primary" variant="h1" style={{ paddingTop: 30 }}>
            Lorem Ipsum
          </Typography>
          <Typography color="primary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography color="primary" style={{ paddingBottom: 10 }}>
            {' '}
            nec augueegestas ullamcorper
          </Typography>
        </Grid>
        <Grid item lg={3} md={12} sm={12} xs={12}>
          <div style={styles.pag}>
            <img style={{ padding: '17px 0px 0px 16px' }} src={pag} />
          </div>
          <Typography color="primary" variant="h1" style={{ paddingTop: 30 }}>
            Lorem Ipsum
          </Typography>
          <Typography color="primary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography color="primary" style={{ paddingBottom: 10 }}>
            {' '}
            nec augueegestas ullamcorper
          </Typography>
        </Grid>
        <Grid item lg={3} md={12} sm={12} xs={12}>
          <div style={styles.money}>
            <img style={{ padding: '22px 0px 0px 20px' }} src={money} />
          </div>
          <Typography color="primary" variant="h1" style={{ paddingTop: 30 }}>
            Lorem Ipsum
          </Typography>
          <Typography color="primary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography color="primary"> nec augueegestas ullamcorper</Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <div style={styles.pqKraka}>
            <img style={{ padding: '20px 0px 0px 17px' }} src={pqKraka} />
          </div>
          <Typography color="primary" variant="h1" style={{ paddingTop: 30 }}>
            Lorem Ipsum
          </Typography>
          <Typography color="primary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography color="primary"> nec augueegestas ullamcorper</Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          <Typography color="primary" style={styles.Titulo}>
            Novidades
          </Typography>
        </Grid>
        <Grid item container justify="space-between" lg={12} md={12} sm={12}>
          <Grid item lg={4} md={4} sm={4}>
            <div>5</div>
          </Grid>
          <Grid item lg={4} md={4} sm={4}>
            <div>6</div>
          </Grid>
          <Grid item lg={4} md={4} sm={4}>
            <div>7</div>
          </Grid>
          <Grid
            item
            container
            justify="center"
            style={{ padding: '64px 0px 20px 0px' }}
            lg={12}
            md={12}
            sm={12}
          >
            <Button
              variant="contained"
              color="primary"
            >
              VEJA TODOS
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    <div
      style={{
        backgroundColor: '#44323D',
        width: '100%',
        paddingTop: '2vw',
        height: 200,
        marginBottom: 100,
        borderRadius: 20,

      }}
    >
      <Grid justify="center" item container lg={12}md={12}sm={12}>
        <Grid item justify="center" container lg={3} md={12} sm={12}>
          <Typography
            color="secondary"
            style={{ textAlign: 'center', fontSize: '1.2em' }}
          >
            Se inscreva no nosso jornal
          </Typography>
          <Typography
            color="secondary"
            style={{ textAlign: 'center', fontSize: '1.2em' }}
            variant="h5"
          >
            {' '}
            e receba ofertas exclusivas!
          </Typography>
        </Grid>
        <Grid justify="center" item container lg={3} md={12} sm={12}>
          <div style={{ width: 215 }}>
            <TextField
              fullWidth
              styleslabel={{ color: 'white' }}
              label="Escreva seu melhor email"
            />
          </div>
        </Grid>
        <Grid justify="center" item container lg={3} md={12} sm={12}>
          <div style={{borderRadius:100,width:200,paddingTop:32}}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
          >
            SE INSCREVA
          </Button>
          </div>
        </Grid>
            
      </Grid>
    </div>
    <Footer />
  </>
);
export default Home;