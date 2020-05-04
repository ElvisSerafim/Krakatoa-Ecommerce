import React, { PureComponent } from 'react';
import { Container, Grid, Typography, Box } from '@material-ui/core/';
import MinhaConta from '../components/MinhaConta';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';

var styles = {
  title: {
    fontSize: '2.25em',
    fontWeight: 'bold',
    margin: '64px',
    color: '#FF5757',
  },
  fundo: {
    backgroundColor: '#C8C8C8',
    AlignItems: 'center',
    borderRadius: 20
  },
  flexGlobal: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  topico: {
    fontSize: '1.25em',
    fontWeight: 'bold',
    marginTop: '64px',
    marginLeft: '64px',
    color: 'WHITE',
  },
  input: {
    marginLeft: '64px',
    marginTop: '32px',
  },
  flexTopico: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
};
export default class Login extends PureComponent {
  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <Typography style={styles.title}>MINHA CONTA</Typography>
          <Box style={styles.fundo}>
            <div style={styles.flexGlobal}>
              <div style={styles.flexTopico}>
              <Typography style={styles.topico}>Entrar</Typography>
              <div style={{paddingLeft:626}}>
              <Typography style={styles.topico}>Registrar</Typography>
              </div>
              </div>
              <div style={styles.input}>
                <MinhaConta />
              </div>
            </div>
          </Box>
        </Container>
        <Footer />
      </>
    );
  }
}
