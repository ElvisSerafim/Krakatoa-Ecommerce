/* Pagina de Contato
 */
import React, { PureComponent } from 'react';
import { Container, Grid, Typography, Box } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import FooterComp from '../components/Footer';
import './Contato.css';
import Lista from '../components/ListaPedidos';
import ContaComp from '../components/ContaComp';

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
                <Lista />
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <FooterComp />
      </>
    );
  }
}
