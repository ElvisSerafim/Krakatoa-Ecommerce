//@ts-nocheck
/* Pagina de Sobre
 */

import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import {
  Container,
  Typography,
  Box,
  Button,
  makeStyles,
} from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route, Redirect, RouteProps } from 'react-router-dom';
import { removerCart, removeAllProducts } from '../reducers/productsCart';

import api from '../Services/ApiService';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
//@ts-ignore
import Pac from '../img/Pac.svg';
//@ts-ignore
import Sedex from '../img/Sedex.svg';
//@ts-ignore
import cartBlank from '../img/cartBlank.svg';
//@ts-ignore
import nodeli from '../img/noDelivery.svg';
//@ts-ignore
import payment from '../img/payment.svg';
import TableSumario from '../components/TableSumario';
import { ProdutoTipo } from '../Services/dto/produto.dto';

const useStyles = makeStyles({
  title: {
    padding: '64px 0px 40px 0px',
    fontSize: '2.5em',
    color: '#FF5757',
    fontWeight: 700,
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
});

const Sumario: React.FunctionComponent<RouteProps> = ({ location }) => {
  const [totalFinal, setFinalTotal] = useState(0);
  const [totalFrete, setTotalFrete] = useState(0);
  const [total, setTotal] = useState(0);
  const [cep, setCep] = useState('');
  const [urlDelivery, setUrl] = useState('');
  const classes = useStyles();
  const products = useSelector((state: any) => state.productsCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state !== undefined) {
      //@ts-ignore
      if ( location.state.entregaSelecionada === 'Pac') {
        setUrl(Pac);
      } else {
        setUrl(Sedex);
      }
    }
  });

  const atualizarTotal = (total: number[]) => {
    let auxTotal = 0;
    total.map((item) => {
      auxTotal += item;
    });
    setFinalTotal(auxTotal);
  };

  const removerProduct = (produto: ProdutoTipo) => {
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
            <Box justifyContent="space-between">
              <Typography variant="h3" style={{ marginTop: 0 }}>
                Sumário
              </Typography>

              <div className={classes.process}>
                <a href="/">
                  <img src={cartBlank} alt="Carrinho" />
                </a>

                <hr className={classes.hrstyle} />
                <a href="/">
                  <img src={nodeli} alt="Envio" />
                </a>
                <hr className={classes.hrstyle} />
                <div className={classes.payment}>
                  <a href="/">
                    <img src={payment} alt="Pagamento" />
                  </a>
                </div>
              </div>
            </Box>
            <Box flexDirection="column">
              <Box>
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
                      {//@ts-ignore
                      location.state.endereco.nome}
                    </Typography>
                    <Typography
                      style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}
                    >
                      {//@ts-ignore
                      location.state.endereco.rua},{' '}
                      {//@ts-ignore
                      location.state.endereco.bairro}, Numero°{' '}
                      {//@ts-ignore
                      location.state.endereco.numero}
                    </Typography>
                    <Typography
                      style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}
                    >
                      {//@ts-ignore
                      location.state.endereco.cidade}
                    </Typography>
                    <Typography
                      style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}
                    >
                      {//@ts-ignore
                      location.state.endereco.complemento}
                    </Typography>
                    <Typography
                      style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}
                    >
                      {//@ts-ignore
                      location.state.endereco.telefone}
                    </Typography>
                    <Box
                      style={{ cursor: 'pointer' }}
                      display="flex"
                      borderColor="gray"
                      borderRadius={16}
                      flexDirection="column"
                      alignItems="center"
                      className={classes.btn}
                    >
                      <Link
                        to={{
                          pathname: '/endereco',
                          state: {
                            //@ts-ignore
                            totalPedido: location.state.totalPedido,
                            //@ts-ignore
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
                    className={classes.boxStyle}
                  >
                    <img
                      src={urlDelivery}
                      id="entregaImg"
                      className={classes.img}
                      alt="imagem da entrega"
                    />
                    <Typography className={classes.price} id="price">
                      {//@ts-ignore
                      location.state.totalFrete}
                    </Typography>
                    <Typography className={classes.entrega} id="entregaTipo">
                      {//@ts-ignore
                      location.state.entregaSelecionada}
                    </Typography>
                    <div className={classes.escolhido}>
                      <Typography className={classes.escolhidoTypo}>
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
              </Box>
            </Box>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Sumario;
