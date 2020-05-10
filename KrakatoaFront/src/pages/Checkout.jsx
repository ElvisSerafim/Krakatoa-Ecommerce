import React, { PureComponent } from 'react';
import {
  Container, Grid, Typography, Box, Button,
} from '@material-ui/core/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
import TextField from '../components/TextField';
import cartBlank from '../img/cartBlank.svg';
import nodeli from '../img/noDelivery.svg';
import payment from '../img/payment.svg';

const styles = {
  title: {
    fontSize: '2.5em',
    textAlign: 'center',
    color: '#FF5757',
    fontWeight: '700',
  },
  hrstyle: {
    color: 'red',
    backgroundColor: 'red',
    height: 0.5,
    width: '60px',
    borderColor: 'red',
  },
  payment: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 200,
    backgroundColor: 'red',
    color: 'white',
  },
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
    },
  },
});

export default class Checkout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <div
            style={{
              display: 'flex',
              flex: '1',
              flexDirection: 'row',
              marginTop: '64px',
              justifyContent: 'space-between',
            }}
          >
            <Typography style={styles.title}>Pagamento</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <a href="/carinho">
                <img src={cartBlank} alt="Carinho" />
              </a>

              <hr style={styles.hrstyle} />
              <a href="/entrega">
                <img src={nodeli} alt="Entrega" />
              </a>
              <hr style={styles.hrstyle} />
              <div style={styles.payment}>
                <a href="/">
                  <img src={payment} alt="Pagamento" />
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'row', marginTop: '50px' }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '60%' }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ width: '40%' }}>
                  <TextField label="Nome do Titular do cartão" />
                </div>
                <div style={{ width: '40%' }}>
                  <TextField label="Número do cartão" numberOnly />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: '20px',
                }}
              >
                <div style={{ width: '40%' }}>
                  <TextField label="Código de segurança" numberOnly />
                </div>
                <div style={{ width: '40%' }}>
                  <TextField label="Data de validade" date />
                </div>
              </div>


            </div>

            <div
              style={{ display: 'flex', flex: '1', flexDirection: 'column' }}
            >

              <div
                style={{
                  display: 'flex',
                  flex: '1',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginLeft: '20px',
                }}
              />
              <MuiThemeProvider theme={theme}>
                <div
                  style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    fontFamily: 'Poppins',
                  }}
                >
                  <Button
                    style={{ height: 50, width: '30%' }}
                    variant="contained"
                    color="primary"
                  >
                    Continuar
                  </Button>
                </div>
              </MuiThemeProvider>
            </div>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}
