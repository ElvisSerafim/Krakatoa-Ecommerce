import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  TextField,
} from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
//@ts-ignore
import cartBlank from '../img/cartBlank.svg';
//@ts-ignore
import nodeli from '../img/noDelivery.svg';
//@ts-ignore
import payment from '../img/payment.svg';
import Estilos from '../Estilos';

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
  width40: { width: '40%' },
};

const Checkout = () => {
  const classes = 'a';
  return (
    <>
      <Topo />
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={2} style={{ marginTop: 64, marginBottom: 64 }}>
          <Typography color="primary" variant="h3">
            Pagamento
          </Typography>
          <Box justifyContent="center" alignItems="center">
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
          </Box>
          <Box style={{ paddingTop: '50px' }}>
            <Box flexDirection="column" style={{ width: '60%' }}>
              <Box justifyContent="space-between">
                <div style={{ width: 40 }}>
                  <TextField
                    id="filled-required"
                    label="Nome do Titular do cartão"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />
                </div>
                <div style={{ width: 40 }}>
                  <TextField
                    id="filled-number"
                    label="Numero do Cartão"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />
                </div>
              </Box>
              <Box
                justifyContent="space-between"
                style={{ paddingTop: '20px' }}
              >
                <div style={{ width: 40 }}>
                  <TextField
                    id="filled-number"
                    label="Código de segurança"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />
                </div>
                <div style={{ width: 40 }}>
                  <TextField label="Data de validade" />
                </div>
              </Box>
            </Box>

            <Box>
              <Box
                justifyContent="space-around"
                style={{
                  paddingLeft: '20px',
                }}
              />
              <Box
                flexDirection="column"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <a href="/sumario" style={{ textDecoration: 'none' }}>
                  <Button
                    style={{ height: 50, width: '100%' }}
                    variant="contained"
                    color="primary"
                  >
                    Continuar
                  </Button>
                </a>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
