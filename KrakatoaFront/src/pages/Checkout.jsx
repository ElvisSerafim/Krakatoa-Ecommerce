import React from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
import TextField from '../components/TextField';
import cartBlank from '../img/cartBlank.svg';
import nodeli from '../img/noDelivery.svg';
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
          <Typography style={styles.title}>Pagamento</Typography>
          <div style={Estilos.flexRowCENTER2}>
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
          <div style={{ ...Estilos.flexRowStandard2, paddingTop: '50px' }}>
            <div style={{ ...Estilos.flexColumnStandard2, width: '60%' }}>
              <div style={Estilos.flexRowSPACEBTW2}>
                <div style={styles.width40}>
                  <TextField label="Nome do Titular do cartão" />
                </div>
                <div style={styles.width40}>
                  <TextField label="Número do cartão" numberOnly />
                </div>
              </div>
              <div style={{ ...Estilos.flexRowSPACEBTW2, paddingTop: '20px' }}>
                <div style={styles.width40}>
                  <TextField label="Código de segurança" numberOnly />
                </div>
                <div style={styles.width40}>
                  <TextField label="Data de validade" date />
                </div>
              </div>
            </div>

            <div style={Estilos.flexColumnStandard}>
              <div
                style={{
                  ...Estilos.flexRowStandard,
                  justifyContent: 'space-around',
                  paddingLeft: '20px',
                }}
              />
              <div style={{ ...Estilos.flexColumnEND, paddingTop: '20px' }}>
                  <Button
                    style={{ height: 50, width: '100%' }}
                    variant="contained"
                    color="primary"
                    onClick={async()=>{
                      
                      var myInit = {
                        method:'POST',
                        headers: new Headers({
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': "http://localhost:3000",
                          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
                          'Access-Control-Allow-Headers': 'Content-Type',
                          'Access-Control-Max-Age': 86400,
                          'Access-Control-Expose-Headers' : 'Request-Context',
                          'MerchantId': '7a8b7c9c-4bb7-4caf-b967-f7192ab0cf72',
                          'MerchantKey': 'WTXTZZSTBSBGCKSYAJBIOZJXJDRBNMAEHQEGTKNJ'
                        }),
                        body: {
                          
                            "MerchantOrderId":"2014111703",
                            "Payment":{
                              "Provider":"Simulado",
                              "Type":"CreditCard",
                              "Amount":15700,
                              "Installments":1,
                              "SoftDescriptor":"123456789ABCD",
                              "CreditCard":{
                                  "CardNumber":"4551870000000181",
                                  "Holder":"Teste Holder",
                                  "ExpirationDate":"12/2021",
                                  "SecurityCode":"123",
                                  "Brand":"Visa"
                            }
                         }
                        } 
                      
                      }
                       await fetch("https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/").then(data=>console.log(data)) .catch(error => console.log('parsing faled',error));
                      }}
                  >
                    Continuar
                  </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
