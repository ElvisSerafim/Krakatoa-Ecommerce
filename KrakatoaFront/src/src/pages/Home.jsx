/* Pagina de Inicio */

import React, { PureComponent } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Promos from '../components/promos';
import ApiService from '../Services/ApiService';

const styles = {
  Promos: { width: 'auto', height: '373px', backgroundColor: '#B1B1B1' },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: 2,
  },
  Carrocel: {
    height: '752.29px',
    width: 'auto',
    backgroundColor: '#B1B1B1',
    marginTop: '2em',
  },
  Titulo: { fontSize: '3em', fontWeight: '300' },
};

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
    };
  }

  componentDidMount() {
    ApiService.ListaProdutos().then((res) => {
      this.setState({ produtos: [...this.state.produtos, ...res.data] });
    });
  }

  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <Grid container spacing={2} justify="space-evenly">
            <Grid item lg={12} md={2}>
              <div style={styles.Carrocel}>1</div>
            </Grid>
            <Grid item lg={12} md={2}>
              <Promos />
            </Grid>
            <Grid item lg={12} md={2}>
              <Typography style={styles.Titulo}>Mais Procurados</Typography>
            </Grid>
            <Grid item lg={3} md={2}>
              <div>5</div>
            </Grid>
            <Grid item lg={3} md={2}>
              <div>6</div>
            </Grid>
            <Grid item lg={3} md={1}>
              <div>7</div>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
