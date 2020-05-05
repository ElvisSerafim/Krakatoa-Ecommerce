import React, { PureComponent } from 'react';
import {
  Container, Grid, Typography, Box,
} from '@material-ui/core/';

import Cadastro from '../components/Cadastro';
import Login from '../components/Login';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';

const styles = {
  fundo: {
    backgroundColor: '#C3C3C3',
    AlignItems: 'center',
  },
  topico: {
    fontWeight: 'bold',
    marginTop: '64px',
    marginLeft: '64px',
  },
  input: {
    marginLeft: '64px',
    marginTop: '32px',
  },
};

export default class Conta extends PureComponent {
  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <Typography
            variant="h3"
            color="primary"
            style={{ fontStyle: 'normal' }}
            gutterBottom
          >
            MINHA CONTA
          </Typography>
          <Box style={styles.fundo}>
            <Grid container spacing={2} diretion="row" justify="flex-start">
              <Grid item Lg={6} md={6}>
                <Typography style={styles.topico} variant="h5" color="primary">Entrar</Typography>
              </Grid>
              <Grid item Lg={6} md={6}>
                <Typography style={styles.topico} variant="h5" color="primary">Registrar</Typography>
              </Grid>
              <Grid item Lg={6} md={6}>
                <div style={styles.input}>
                  <Login />
                </div>
              </Grid>
              <Grid item Lg={6} md={6}>
                <div style={styles.input}>
                  <Cadastro />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Footer />
      </>
    );
  }
}
