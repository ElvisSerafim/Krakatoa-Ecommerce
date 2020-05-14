import React from 'react';
import { Container, Grid, Typography, Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Cadastro from '../components/Cadastro';
import Login from '../components/Login';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';

const styles = {
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

const useStyles = makeStyles((theme) => ({
  Fundo: {
    backgroundColor: theme.palette.background.color,
    AlignItems: 'center',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg" style={{ marginBottom: '64px' }}>
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
        <Box className={classes.Fundo}>
          <Grid container spacing={2} diretion="row" justify="flex-start">
            <Grid item lg={6} md={6}>
              <div style={styles.input}>
                <Login />
              </div>
            </Grid>
            <Grid item lg={6} md={6}>
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
};

export default LoginPage;
