/* Pagina de Contato
 */
import React, { PureComponent } from 'react';
import { Container, Grid, Typography, Box } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import FooterComp from '../components/Footer';
import './Contato.css';
import Lista from '../components/ListaPedidos'
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
  boxStyle: {
    border: 2,
    width: 500,
  },
  produtoBack: {
    borderRadius: '10px 0px 0px 10px',
    backgroundColor: 'red',
    color: 'white',
  },
  padding: { paddingLeft: 50 },
  paddingData: { paddingLeft: 90 },
  paddingPrice: { paddingLeft: 150 },
  dataBack: { backgroundColor: 'red', color: 'white' },
  priceBack: {
    borderRadius: '0px 10px 10px 0px',
    backgroundColor: 'red',
    color: 'white',
  },
};

export default class Pedidos extends PureComponent {
  render() {
    const Pedido = {
      id: 111111,
      data: '9/04/2020',
    };
    return (
      <>
        <Container maxWidth="lg">
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
            <Grid item lg={4}>
              <ContaComp />
            </Grid>
            <Grid item lg={8}>
              <Grid container spacing={2} diretion="row" justify="flex-start">
                <Lista/>
              </Grid>
            </Grid>

          </Grid>
        </Container>
        <FooterComp />
      </>
    );
  }
}
