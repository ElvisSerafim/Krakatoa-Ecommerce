/* Pagina de Contato
 */

import React, { useEffect, useState, PureComponent } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import Topo from '../components/Topo';
import FooterComp from '../components/Footer';
import './Contato.css';
import Navbar from '../components/Nav';
import ApiService from '../Services/ApiService.js'
import ContaComp from '../components/MinhaConta';

const styles = {
  background: {
    backgroundColor: '#D0D0D0',
  },
  flexRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: '50',
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

 function MinhaConta() {
  const [user, setUser] = useState('');
  const usuario = useSelector((state)=> state.user);


  useEffect(()=>{
  
    const Get = async () => {
      const tentativa = await usuario;
      setUser(tentativa.user);
      
    };

    Get();
    
  },);

  
  return (
    <>
      <Container maxWidth="lg">
        <Topo />
        <Navbar />
        <Typography variant="h2" color="primary" />
        <Grid container spacing={2} diretion="row" justify="flex-start">
          <Grid item lg={4} md={4}>
            <Typography variant="h4" color="primary">
              Minha Conta
              </Typography>
            <ContaComp />
          </Grid>
          <div
            style={styles.quadrado2}
          >
            <div style={styles.flexRow}>
              <Typography style={styles.txt2} color="secondary">Olá,</Typography>
              <Typography color="primary" style={styles.txt1}>{user.nome}</Typography>
            </div>
            <div style={styles.flexRow}>
              <Typography style={styles.txt3} color="secondary">   A partir do painel de controle da sua conta, você pode ver suas</Typography>
              <Typography style={styles.txt4}>compras recentes</Typography>
              <Typography style={styles.txt5} color="secondary">gerenciar seus</Typography>
            </div>
            <div style={styles.flexRow}>
              <Typography style={styles.txt6}>endereços de entrega e cobrança</Typography>
              <Typography style={styles.txt5} color="secondary">e editar suas</Typography>
              <Typography style={styles.txt4}>senhas e detalhes da conta</Typography>
            </div>
          </div>
        </Grid>
      </Container>
      <FooterComp />
    </>
  );
}

export default MinhaConta;