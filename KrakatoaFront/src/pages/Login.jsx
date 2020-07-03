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
    display: 'flex',
    width: '100%',
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
            <Login />          
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default LoginPage;
