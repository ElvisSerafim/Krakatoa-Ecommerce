/* Pagina de Contato
 */
import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import FooterComp from '../components/Footer';
import './Contato.css';
import ContaComp from '../components/ContaComp';
import MyAddressComp from '../components/MyAddress';

const MinhaConta = () => (
  <>
    <Container maxWidth="lg" style={{ marginBottom: 64 }}>
      <Topo />
      <Navbar />
      <Grid
        container
        spacing={2}
        diretion="row"
        justify="space-around"
        style={{ marginTop: 64 }}
      >
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <Typography variant="h4" color="primary">
            Minha Conta
          </Typography>
          <ContaComp />
        </Grid>
        <Grid item lg={8} md={12} sm={12} xs={12}>
          <Typography
            variant="h4"
            style={{
              fontWeight: 'bold',
            }}
            color="primary"
          >
            Meu Endereço
          </Typography>
          <div style={{ backgroundColor: 'white', borderRadius: 10 }}>
            <MyAddressComp />
          </div>
        </Grid>
      </Grid>
    </Container>
    <FooterComp />
  </>
);

export default MinhaConta;
