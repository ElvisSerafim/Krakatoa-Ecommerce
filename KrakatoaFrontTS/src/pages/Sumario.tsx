/* eslint-disable react/prop-types */
/* Pagina de Sobre
 */

import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { Container, Typography, Box, Button } from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route, Redirect } from 'react-router-dom';
import { removerCart, removeProducts } from '../reducers/productsCart';

import api from '../Services/ApiService';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
import Pac from '../img/Pac.svg';
import Sedex from '../img/Sedex.svg';
import cartBlank from '../img/cartBlank.svg';
import nodeli from '../img/noDelivery.svg';
import payment from '../img/payment.svg';
import TableSumario from '../components/TableSumario';

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
    width: 200,
  },
  btn: {
    border: 2,
    marginTop: 5,
    width: 200,
    padding: 1,
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
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

const Sumario = ({ location }) => {
  const [totalFinal, setFinalTotal] = useState(0);
  const [totalFrete, setTotalFrete] = useState(0);
  const [total, setTotal] = useState(0);
  const [cep, setCep] = useState('');
  const [urlDelivery, setUrl] = useState('');

  const products = useSelector((state) => state.productsCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state !== undefined) {
      if (location.state.entregaSelecionada === 'Pac') {
        setUrl(Pac);
      } else {
        setUrl(Sedex);
      }
    }
  });

  const atualizarTotal = (total) => {
    let auxTotal = 0;
    total.map((item) => {
      auxTotal += item;
    });
    setFinalTotal(auxTotal);
  };

  const removerProduct = (produto) => {
    dispatch(removerCart(produto));
  };

  return (
    <>
      <Topo />
      <Navbar />
      <Container maxWidth="lg">
        {location.state === undefined ? (
          <Redirect
            to={{
              pathname: '/carrinho',
            }}
          />
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
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
              <div style={styles.flexRow}>
                <TableSumario
                  actualTotal={atualizarTotal}
                  totalSumario={totalFinal}
                  removerItem={removerProduct}
                />

                <div
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                    paddingLeft: 60,
                  }}
                >
                  <Typography
                    style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}
                  >
                    Endereço de entrega:
                  </Typography>

                  <div style={{ marginTop: 10 }}>
                    <Typography
                      style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}
                    >
                      {location.state.endereco.nome}
                    </Typography>
                    <Typography
                      style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}
                    >
                      {location.state.endereco.rua},{' '}
                      {location.state.endereco.bairro}, Numero°{' '}
                      {location.state.endereco.numero}
                    </Typography>
                    <Typography
                      style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}
                    >
                      {location.state.endereco.cidade}
                    </Typography>
                    <Typography
                      style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}
                    >
                      {location.state.endereco.complemento}
                    </Typography>
                    <Typography
                      style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}
                    >
                      {location.state.endereco.telefone}
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
                      <Link
                        to={{
                          pathname: '/endereco',
                          state: {
                            totalPedido: location.state.totalPedido,
                            cepEndereco: location.state.cepEndereco,
                          },
                        }}
                      >
                        <Typography>MUDAR ENDEREÇO</Typography>
                      </Link>
                    </Box>
                  </div>

                  <Box
                    style={{ cursor: 'pointer', marginTop: 15 }}
                    display="flex"
                    borderColor="red"
                    borderRadius={16}
                    flexDirection="column"
                    alignItems="center"
                    {...styles.boxStyle}
                  >
                    <img
                      src={urlDelivery}
                      id="entregaImg"
                      style={styles.img}
                      alt="imagem da entrega"
                    />
                    <Typography style={styles.price} id="price">
                      {location.state.totalFrete}
                    </Typography>
                    <Typography style={styles.entrega} id="entregaTipo">
                      {location.state.entregaSelecionada}
                    </Typography>
                    <div style={styles.escolhido}>
                      <Typography style={styles.escolhidoTypo}>
                        ESCOLHIDO
                      </Typography>
                    </div>
                  </Box>

                  <div style={{ width: 200, marginTop: 30 }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color="primary" fullWidth>
                        Concluir
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Sumario;