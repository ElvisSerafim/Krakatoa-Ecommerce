/* Pagina de Contato
 */
import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import Hidden from '@material-ui/core/Hidden';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import FooterComp from '../components/Footer';
import './Contato.css';
import ContaComp from '../components/ContaComp';
import MyAddressComp from '../components/MyAddress';

const MinhaConta: React.FunctionComponent = () => (
  <>
    <Topo />
    <Navbar />
    <Container maxWidth="lg" style={{ marginBottom: 64 }}>
      <Grid
        container
        spacing={2}
        justify="space-around"
        style={{ marginTop: 64 }}
      >
        <Hidden only="sm">
          <Grid
            item
            container
            lg={4}
            md={4}
            sm={12}
            xs={12}
            justify="space-around"
          >
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h4" color="primary">
                Minha Conta
              </Typography>
            </Grid>
            <ContaComp />
          </Grid>
          <Grid item lg={8} md={7} sm={7} xs={12}>
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
        </Hidden>

        <Hidden only={['lg', 'md', 'xs', 'xl']}>
          <Grid item container justify="center" sm={12}>
            <Typography variant="h4" color="primary">
              Minha Conta
            </Typography>
            <Grid
              item
              justify="center"
              container
              lg={4}
              md={12}
              sm={12}
              xs={12}
            >
              <ContaComp />
            </Grid>
          </Grid>
          <Grid item lg={8} md={7} sm={7} xs={12}>
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
        </Hidden>
      </Grid>
    </Container>
    <FooterComp />
  </>
);

export default MinhaConta;
