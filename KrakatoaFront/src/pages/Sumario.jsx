/* Pagina de Sobre
 */

import React, { PureComponent } from 'react';
import { Container, Typography, Box, Button } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
import Pac from '../img/Pac.svg';
import cartBlank from '../img/cartBlank.svg';
import nodeli from '../img/noDelivery.svg';
import payment from '../img/payment.svg';
const styles = {
  title: {
    padding: '64px 0px 40px 0px',
    fontSize: '2.5em',
    color: '#FF5757',
    fontWeight: '700',
  },
  boxStyle: {
    border: 2,
    height: 230,
    width: 180,
  },
  btn: {
    border: 2,
    marginLeft: 75,
    marginTop: 5,
    width: 200,
    padding: 1,
  },
  flexColumn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  img: {
    paddingTop: '40px',
    height: 20,
  },
  price: {
    paddingTop: '60px',
    fontSize: '1.0em',
    fontWeight: 'bold',
  },
  entrega: {
    color: '#C8C8C8',
    paddingTop: '20px',
    fontSize: '1.0em',
  },
  escolhido: {
    marginTop: 11,
    borderRadius: 100,
    width: 120,
    height: 30,
    backgroundColor: 'red',
  },
  escolhidoTypo: {
    fontSize: '1em',
    fontWeight: 'bold',
    margin: '4px 0px 0px 16px',
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

  circulo: {
    marginTop: 64,
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: '#C8C8C8',
  },
  quantia: {
    fontSize: '1.0em',
    fontWeight: 'bold',
    color: 'red',
    padding: '94px 0px 0px 50px',
  },
  infos: {
    padding: '90px 0px 0px 20px',
  },
  priceLabel: {
    padding: '89px 0px 0px 100px',
  },
  process: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 580,
    marginTop: 100,
  },
  deliveryAdress: {
    paddingLeft: 600,
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  deliType: {
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingLeft: 25,
  },
  adress: {
    paddingLeft: 600,
  },
};

export default class Sumario extends PureComponent {
  render() {
    const value = {
      tam: ['Grande'],
      price: [7.25],
      amount: [1],
      total: [],
    };
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <div style={styles.flexRow}>
            <Typography style={styles.title}>Sumário</Typography>

            <div style={styles.process}>
              <a href="/">
                <img src={cartBlank} alt="React Logo" />
              </a>

              <hr style={styles.hrstyle} />
              <a href="/">
                <img src={nodeli} alt="React Logo" />
              </a>
              <hr style={styles.hrstyle} />
              <div style={styles.payment}>
                <a href="/">
                  <img src={payment} alt="React Logo" />
                </a>
              </div>
            </div>
          </div>
          <div style={styles.flexColumn}>
            <Typography style={styles.deliType}>Tipo de entrega</Typography>
            <div style={styles.flexRow}>
              <Box
                style={{ cursor: 'pointer' }}
                display="flex"
                borderColor="red"
                borderRadius={16}
                flexDirection="column"
                alignItems="center"
                {...styles.boxStyle}
              >
                <img
                  src={Pac}
                  id="entregaImg"
                  alt="React Logo"
                  style={styles.img}
                />
                <Typography style={styles.price} id="price">
                  R$12,00
                </Typography>
                <Typography style={styles.entrega} id="entregaTipo">
                  PAC
                </Typography>
                <div style={styles.escolhido}>
                  <Typography style={styles.escolhidoTypo}>
                    ESCOLHIDO
                  </Typography>
                </div>
              </Box>
              <div style={styles.flexColumn2}>
                <Typography style={styles.deliveryAdress}>
                  Endereço de entrega
                </Typography>
                <Typography style={styles.adress}>Beatrice Waddle</Typography>
                <Typography style={styles.adress}>
                  1391 Single Street. Chicago, MA 02129
                </Typography>
                <Typography style={styles.adress}>USA</Typography>
                <Typography style={styles.adress}>+5 781-644-3627</Typography>
                <Typography style={styles.adress}>
                  BeatriceLWaddle@rhyta.com
                </Typography>
                <Box
                  style={{ cursor: 'pointer' }}
                  display="flex"
                  borderColor="gray"
                  borderRadius={16}
                  flexDirection="column"
                  alignItems="center"
                  {...styles.btn}
                >
                  <Typography>MUDAR ENDEREÇO</Typography>
                </Box>
              </div>
            </div>

            <div style={styles.flexRow}>
              <div style={styles.circulo}></div>
              <Typography variant="body2" color="primary" style={styles.infos}>
                Lorem Ipsum - {value.tam[0]}
              </Typography>
              <Typography
                variant="h6"
                color="primary"
                style={styles.priceLabel}
              >
                R${value.price[0]}
              </Typography>
              <Typography style={styles.quantia}>{value.amount[0]}</Typography>
              <Typography
                variant="body2"
                color="primary"
                style={{ padding: '90px 0px 0px 50px' }}
              >
                R$ {value.amount[0] * value.price[0]}
              </Typography>
              <div
                style={{
                  marginTop: 80,
                  borderRadius: 10,
                  width: 300,
                  marginLeft: 120,
                  backgroundColor: '#C8C8C8',
                  height: 50,
                }}
              >
                <div style={styles.flexRow}>
                  <Typography
                    style={{
                      paddingTop: 13,
                      paddingLeft: 20,
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    {' '}
                    Total:
                  </Typography>
                  <Typography
                    style={{
                      paddingTop: 13,
                      paddingLeft: 170,
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    R$ {value.amount[0] * value.price[0]}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div style={{width:200}}>
        <Button
                style={{marginLeft:1175,marginTop:50}}
                  variant="contained"
                  color="primary"
                  fullWidth
                 
                >
               Concluir
                </Button>
        </div>
        <Footer />
      </>
    );
  }
}
