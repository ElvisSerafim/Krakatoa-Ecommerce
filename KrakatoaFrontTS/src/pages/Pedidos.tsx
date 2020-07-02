/* Pagina de Contato
 */
import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Hidden } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import FooterComp from '../components/Footer';
import './Contato.css';
import Lista from '../components/ListaPedidos';
import ContaComp from '../components/ContaComp';
import api from '../Services/ApiService';
import { useSelector, useDispatch } from 'react-redux';
import PedidosMobile from '../components/PedidosMobile';

interface Data {
  token: string;
  user: string;
}

const Pedidos = () => {
  const [pedidosUsuario, setPedidos] = useState([]);
  const usuario = useSelector((state:any) => state.user);

  useEffect(() => {
    let pedidos;
    let data:Data;
    const getUser = async () => {
      const tentativa = await usuario;
      const { user } = tentativa;
      const token = sessionStorage.getItem('token');
      if(!token) throw new Error('Usuario Sem Token')
      data = {
        token,
        user,
      };
      getPedido();
    };

    const getPedido = async () => {
      pedidos = await api.getPedidos(data);
      setPedidos(pedidos);
    };

    getUser();
  }, []);

  return (
    <>
      <Topo />
      <Navbar />
      <Container maxWidth="lg" style={{ marginBottom: 64 }}>
        <Grid container spacing={2} justify="flex-start">
          <Grid item lg={12}>
            <Typography variant="h4" color="primary" style={{ marginTop: 60 }}>
              Minha Conta
            </Typography>
          </Grid>
          <Grid item lg={4} sm={12}>
            <ContaComp />
          </Grid>
          <Hidden smDown>
            <Grid style={{ width: '100%' }} item lg={8} sm={12}>
              <Lista pedidos={pedidosUsuario} />
            </Grid>
          </Hidden>
          <Hidden lgUp>
            <Typography
              variant="h4"
              style={{
                fontWeight: 'bold',
                marginTop: '20px',
              }}
              color="primary"
            >
              Meus Pedidos
            </Typography>
            <div style={{ marginBottom: 20, width: '100%' }}>
              <PedidosMobile pedidos={pedidosUsuario} />
            </div>
          </Hidden>
        </Grid>
      </Container>
      <FooterComp />
    </>
  );
};

export default Pedidos;
