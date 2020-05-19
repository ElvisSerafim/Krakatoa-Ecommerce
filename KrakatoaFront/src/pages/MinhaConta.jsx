/* eslint-disable no-trailing-spaces */
/* Pagina de Contato
 */

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Topo from '../components/Topo';
import FooterComp from '../components/Footer';
import './Contato.css';
import Navbar from '../components/Nav';
import ApiService from '../Services/ApiService';
import ContaComp from '../components/ContaComp';
import Estilos from '../Estilos';

const styles = {
  background: {
    backgroundColor: '#D0D0D0',
  },
  txt1: {
    paddingLeft: 5,
    paddingTop: 26,
    paddingBottom: 40,
    fontWeight: 'bold',
  },
  txt2: {
    paddingLeft: 20,
    paddingTop: 26,
  },
  txt3: {
    paddingLeft: 20,
  },
  txt4: {
    paddingLeft: 5,
    color: 'gray',
  },
  txt5: {
    paddingLeft: 5,
  },
  txt6: {
    paddingLeft: 20,
    color: 'gray',
  },
  quadrado2: {
    backgroundColor: 'black',
    width: 812,
    height: 230,
    marginTop: 68,
    marginLeft: 20,
    borderRadius: 10,
  },
};

const useStyles = makeStyles((theme) => ({
  Cor: {
    backgroundColor: theme.palette.background.color,
    borderRadius: 10,
  },
}));

function MinhaConta() {
  const [user, setUser] = useState('');
  const usuario = useSelector((state) => state.user);
  const classes = useStyles();
  useEffect(() => {
    const Get = async () => {
      const tentativa = await usuario;
      setUser(tentativa.user);
    };

    Get();
  });

  return (
    <>
      <Container maxWidth="lg">
        <Topo />
        <Navbar />
        <Typography variant="h2" color="primary" />
        <Grid
          container
          spacing={2}
          diretion="row"
          justify="space-around"
          style={{ marginBottom: 64 }}
        >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h4" color="primary">
              Minha Conta
            </Typography>
          </Grid>
          <Grid item lg={4} md={4} style={{ marginBottom: 64 }}>
            <ContaComp />
          </Grid>
          <Grid
            container
            item
            lg={4}
            md={8}
            sm={12}
            justify="space-around"
            className={classes.Cor}
          >
            <Typography style={styles.txt2} color="secondary">
              Olá, {user.nome}
            </Typography>
            <Typography style={styles.txt3} color="secondary">
              A partir do painel de controle da sua conta, você pode ver suas{' '}
              <a
                href="pedidos"
                style={{ textDecoration: 'none', color: 'red' }}
              >
                Compras recentes
              </a>
              gerenciar seus
              <a
                href="meuendereco"
                style={{ textDecoration: 'none', color: 'red' }}
              >
                Endereços de entrega
              </a>
              e editar suas
              <a
                href="/detalhes"
                style={{ textDecoration: 'none', color: 'red' }}
              >
                Senhas e detalhes da conta
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <FooterComp />
    </>
  );
}

export default MinhaConta;
