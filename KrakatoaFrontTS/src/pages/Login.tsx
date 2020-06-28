import React from 'react';
import { Container, Grid, Typography, Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Cadastro from '../components/Cadastro';
import Login from '../components/Login';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';

const styles = {
  input: {
    width: '100%',
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
      <Topo />
      <Navbar />
      <Container maxWidth="lg" style={{ marginBottom: 64 }}>
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
