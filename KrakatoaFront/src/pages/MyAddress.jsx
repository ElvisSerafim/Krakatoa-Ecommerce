/* Pagina de Contato
 */
import React from 'react';
import { Container, Grid, Typography, Paper } from '@material-ui/core/';
import Hidden from '@material-ui/core/Hidden';

import ContaComp from '../components/ContaComp';
import MyAddressComp from '../components/MyAddress';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

const MinhaConta = () => (
  <>
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
          lg={12}
          md={12}
          sm={12}
          xs={12}
          justify="space-around"
        >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography
              variant="h4"
              color="primary"
              style={{ marginBottom: 32 }}
            >
              Minha Conta
            </Typography>
          </Grid>
          <Grid item container lg={5} md={4} sm={12} xs={12}>
            <ContaComp />
          </Grid>
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <Paper
              elevation={3}
              style={{ backgroundColor: '#D2C9C7', padding: 30 }}
            >
              <MyAddressComp />
            </Paper>
          </Grid>
        </Grid>
      </Hidden>

      <Hidden only={['lg', 'md', 'xs', 'xl']}>
        <Grid item container justify="center">
          <Typography variant="h4" color="primary">
            Minha Conta
          </Typography>
          <Grid item container lg={5} md={4} sm={12} xs={12}>
            <ContaComp />
          </Grid>
        </Grid>
        <Grid item lg={8} md={7} sm={7} xs={12}>
          <Paper>
            <MyAddressComp />
          </Paper>
        </Grid>
      </Hidden>
    </Grid>
  </>
);

export default withNav(withAnimation(MinhaConta));
