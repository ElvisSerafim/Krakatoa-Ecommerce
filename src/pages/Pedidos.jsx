/* Pagina de Contato
 */
import React, { useEffect, useState } from 'react';
import { Grid, Typography, Hidden } from '@material-ui/core/';
import { useSelector } from 'react-redux';
import Lista from '../components/ListaPedidos';
import ContaComp from '../components/ContaComp';
import api from '../Services/ApiService';
import PedidosMobile from '../components/PedidosMobile';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

const Pedidos = () => {
  const [pedidosUsuario, setPedidos] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    let pedidos;
    const getPedido = async () => {
      pedidos = await api.getPedidos(token);
      setPedidos(pedidos);
    };

    getPedido();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{ marginBottom: 64 }}
        justify="flex-start"
      >
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
    </>
  );
};

export default withNav(withAnimation(Pedidos));
