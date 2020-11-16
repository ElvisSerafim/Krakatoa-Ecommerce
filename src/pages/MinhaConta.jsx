/* eslint-disable no-trailing-spaces */
/* Pagina de Contato
 */

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import ContaComp from '../components/ContaComp';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

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
    paddingTop: 26,
    textAlign: 'center',
    color: '#44323D',
  },
  txt3: {
    paddingLeft: 20,
    color: '#44323D',
    marginBottom: 64,
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
  texto: {
    '@media (min-width: 1024px)': {
      paddingBottom: 72,
      paddingTop: 26,
    },
    '@media (max-width: 1024px)': {
      paddingBottom: 10,
    },
  },
  body: {
    '@media (max-width: 1024px)': {
      paddingBottom: 15,
    },
  },
}));

const MinhaConta = () => {
  const [userName, setUserName] = useState('Usuário');
  const classes = useStyles();
  const nome = useSelector((state) => state.user.user.nome);
  useEffect(() => {
    setUserName(nome);
  }, [nome]);
  return (
    <>
      <Grid
        container
        spacing={2}
        justify="space-around"
        alignItems="flex-start"
      >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h4" color="primary" style={{ marginBottom: 32 }}>
            Minha Conta
          </Typography>
        </Grid>
        <Grid item container lg={5} md={4} sm={12} xs={12}>
          <ContaComp />
        </Grid>

        <Grid item container lg={7} md={7} sm={12} xs={12} spacing={2}>
          <Paper
            elevation={3}
            style={{
              backgroundColor: '#D2C9C7',
              borderRadius: 10,
              borderBottom: 32,
            }}
            
          >
            <Typography
              className={classes.texto}
              variant="h1"
              style={styles.txt2}
              color="textSecondary"
            >
              Olá, {userName}
            </Typography>
            <Typography
              style={styles.txt3}
              className={classes.body}
              color="textSecondary"
            >
              A partir do painel de controle da sua conta, você pode ver suas{' '}
              <a
                href="pedidos"
                style={{
                  textDecoration: 'none',
                  color: '#8C0705',
                  fontWeight: 'bold',
                }}
              >
                Compras recentes{' '}
              </a>
              gerenciar seus{' '}
              <a
                href="meuendereco"
                style={{
                  textDecoration: 'none',
                  color: '#8C0705',
                  fontWeight: 'bold',
                }}
              >
                Endereços de entrega{' '}
              </a>
              e editar suas{' '}
              <a
                href="detalhes"
                style={{
                  textDecoration: 'none',
                  color: '#8C0705',
                  fontWeight: 'bold',
                }}
              >
                Senhas e detalhes da conta
              </a>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default withNav(withAnimation(MinhaConta));
