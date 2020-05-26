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

const Pedidos = () => {
  const [pedidosUsuario, setPedidos] = useState([]);
  const usuario = useSelector((state) => state.user);


  useEffect(() => {

    var pedidos, data;
    const getUser = async () => {

      const tentativa = await usuario;
      const user = tentativa.user;
      const token = localStorage.getItem('token');
      data = {
        token,
        user
      }
      getPedido();

    };

    const getPedido = async () => {
      pedidos = await api.getPedidos(data);
      setPedidos(pedidos);
    }

    getUser();
  }, []);


  return (
    <>
      <Container maxWidth="lg" style={{marginBottom: 64}}>
        <Topo />
        <Navbar />
        <Grid container spacing={2} diretion="row" justify="flex-start">
          <Grid item lg={12}>
            <Typography
              variant="h4"
              color="primary"
              style={{ marginTop: 60 }}
            >
              Minha Conta
              </Typography>
          </Grid>
          <Grid item lg={4} sm={12}>
            <ContaComp />
          </Grid>
          <Hidden smDown="true">
            <Grid style={{ width: '100%' }} item lg={8} sm={12}>
              <Lista pedidos={pedidosUsuario} />
            </Grid>
          </Hidden>
          <Hidden lgUp="true">
            <Typography
              variant="h4"
              style={{
                fontWeight: 'bold',
                marginTop: '20px'
              }}
              color="primary"
            >
              Meus Pedidos
          </Typography>
            <div style={{ marginBottom: 20, width: '100%'}}>
              <PedidosMobile pedidos={pedidosUsuario}/>
            </div>
          </Hidden>
        </Grid>
      </Container>
      <FooterComp />
    </>
  );
}

export default Pedidos;