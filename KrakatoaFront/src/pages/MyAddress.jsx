/* Pagina de Contato
 */
import React, { PureComponent } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import FooterComp from '../components/Footer';
import './Contato.css';
import ContaComp from '../components/MinhaConta';
import MyAddressComp from '../components/MyAddress';

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

  quadrado2: {
    backgroundColor: 'white',
    width: 600,
    height: 500,
    paddingLeft: 20,
    borderRadius: 10,
  },
};
const Row = ({ index, style }) => (
  <div style={style}>
    Row
    {index}
  </div>
);

const Example = () => (
  <List height={150} itemCount={1000} itemSize={35} width={300} color="primary">
    {Row}
  </List>
);

export default class MinhaConta extends PureComponent {
  render() {
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
            <div style={styles.quadrado2}>
              <div style={styles.flexRow}>
                <Grid container spacing={2} diretion="row" justify="flex-start">
                  <Grid
                    item
                    lg={6}
                  >
                    <Typography
                      variant="body1"
                      style={{ padding: '44px 0px 0px 44px', fontWeight: 'bold' }}
                      color="primary"
                    >
                      MEUS ENDEREÇOS
                    </Typography>
                  </Grid>
                  <MyAddressComp />
                </Grid>
              </div>
            </div>
          </Grid>
        </Container>
        <FooterComp />
      </>
    );
  }
}
