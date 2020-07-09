/* eslint-disable no-trailing-spaces */
/* Pagina de Contato
 */

import React, { useEffect, useState } from 'react';
import { Grid, Typography,Container } from '@material-ui/core/';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

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
      console.log(tentativa);
      setUser(tentativa.user);
    };

    Get();
  });

  return (
    <>
      <Grid
        container
        spacing={2}
        justify="space-around"
      >
        <Grid item lg={12} md={12} sm={12} xs={12} style={{alignContent:'center'}}>
          <Typography variant="h4" color="primary">
            Minha Conta
          </Typography>
        </Grid>
        <Grid item lg={4} md={3} sm={5} style={{ marginBottom: 64 }}>
          <ContaComp />
        </Grid>
        <Hidden smUp>
          <Grid item sm={1} />
        </Hidden>
        <Hidden mdUp>
          <Grid item md={1} />
        </Hidden>
        <Grid
          container
          item
          lg={4}
          md={6}
          sm={6}
          justify="space-around"
          className={classes.Cor}
        >
          <Typography style={styles.txt2} color="textSecondary">
            Olá, {user.nome}
          </Typography>
          <Typography style={styles.txt3}  color="textSecondary">
            A partir do painel de controle da sua conta, você pode ver suas{' '}
            <a
              href="pedidos"
              style={{ textDecoration: 'none', color: 'red' }}
            >
              Compras recentes{' '}
            </a>
            gerenciar seus{' '}
            <a
              href="meuendereco"
              style={{ textDecoration: 'none', color: 'red' }}
            >
              Endereços de entrega{' '}
            </a>
            e editar suas{' '}
            <a
              href="detalhes"
              style={{ textDecoration: 'none', color: 'red' }}
            >
              Senhas e detalhes da conta
            </a>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default withNav(withAnimation(MinhaConta));
