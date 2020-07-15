/* eslint-disable react/prop-types */
/* Pagina de Sobre
 */

import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route, Redirect, withRouter, useHistory } from 'react-router-dom';
import { removerCart, removeProducts } from '../reducers/productsCart';

import api from '../Services/ApiService';
import Alerta from '../components/Alerta';
import Pac from '../img/Pac.svg';
import Sedex from '../img/Sedex.svg';
import cartBlank from '../img/cartBlank.svg';
import nodeli from '../img/noDelivery.svg';
import payment from '../img/payment.svg';
import TableSumario from '../components/TableSumario';
import { boleto } from '../Services/pagar.js';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';
let generateSafeId = require('generate-safe-id');


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
  const [produtosPedidos, setProdutosPedidos] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, Setstatus] = useState('error');
  const [msg, setMsg] = useState('Erro');
  const [totalFrete, setTotalFrete] = useState(0);
  const [total, setTotal] = useState(0);
  const [cep, setCep] = useState('');
  const [urlDelivery, setUrl] = useState('');
  const [pagamento, setPag] = useState('Nenhum');
  const products = useSelector((state) => state.productsCart);
  const dispatch = useDispatch();
  const history = useHistory();
  let dado;

  let frete = parseFloat(location.state.totalFrete.replace(',', '.'));
  const price = (totalFinal + frete) * 100;
  const boletopag = async () => {
    let id = generateSafeId();
    dado = await boleto(
      price,
      location.state.endereco.nome,
      location.state.endereco.cpf,
      location.state.endereco.rua,
      33,
      location.state.endereco.complemento,
      location.state.endereco.cep,
      location.state.endereco.cidade,
      'BA',
      'BRA',
      location.state.endereco.bairro,
      123,
    );
    window.open(dado.payment.url);
    let dataa = {
      precoTotal: price,
      frete: frete,
      data: '12/12/2122',
      produtos: produtosPedidos,
      metodo: "boleto",
      idPedido: id,
      idPagamento: dado.payment.paymentId,
      token: sessionStorage.getItem('token'),
    }
    const request = await api.enviarPedido(dataa);
    console.log(request);
    dispatch(removeProducts());
  };

  useEffect(() => {
    let arrayAux = [];
    products.map((item, i) => {
      let produto = {};
      produto.quantidadePedido = item.quantidadePedido;
      produto.tamanhoEscolhido = item.tamanhoEscolhido;
      produto.produto_id = item.produto_id;
      arrayAux.push(produto);
    });

    setProdutosPedidos(arrayAux);

    if (location.state !== undefined) {
      if (location.state.entregaSelecionada === 'Pac') {
        setUrl(Pac);
      } else {
        setUrl(Sedex);
      }
    }
  }, [products]);

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
  const handleChangePagamento = (event) => {
    setPag(event.target.value);
  };
  return (
    <>
      {location.state === undefined ? (
        <Redirect
          to={{
            pathname: '/carrinho',
          }}
        />
      ) : (
          <>
            <Alerta
              openAlert={open}
              message={msg}
              status={status}
              handleClose={(event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }
                setOpen(false);
              }}
              vertical="top"
              horizontal="right"
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h3" color="primary">
                Sumário
            </Typography>

              <div style={styles.process}>
                <a href="/">
                  <img src={cartBlank} alt="Carrinho" />
                </a>

                <hr style={styles.hrstyle} />
                <a href="/">
                  <img src={nodeli} alt="Entrega" />
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
                <Grid lg={12} container>
                  <Grid lg={12} container>
                    <TableSumario
                      actualTotal={atualizarTotal}
                      totalSumario={totalFinal}
                      removerItem={removerProduct}
                    />
                  </Grid>
                  <Grid lg={12} container justify="center">
                    <FormControl variant="outlined" style={{ width: '77%' }}>
                      <InputLabel style={{ color: '#44323D' }}>
                        Formas de pagamento
                    </InputLabel>
                      <Select
                        onChange={handleChangePagamento}
                        value={pagamento}
                        label="Formas de pagamento"
                      >
                        <MenuItem value="Nenhum" />
                        <MenuItem value="CARTAO">
                          Cartão de crédito/débito
                      </MenuItem>
                        <MenuItem value="BOLETO">Boleto</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <div
                  style={{
                    paddingLeft: 60,
                    alignContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'inherit',
                  }}
                >
                  <div style={{ marginBottom: 40 }}>
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
                    </div>
                  </div>
                  <Box
                    style={{ cursor: 'pointer' }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={{
                        pathname: '/endereco',
                        state: {
                          totalPedido: location.state.totalPedido,
                          cepEndereco: location.state.cepEndereco,
                        },
                      }}
                    >
                      <Button variant="contained" color="secondary" fullWidth>
                        MUDAR ENDEREÇO
                    </Button>
                    </Link>
                  </Box>

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
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        if (pagamento === 'BOLETO') {
                          boletopag();
                          history.push('/');
                        } else if (pagamento === 'CARTAO') {
                          history.push({
                            pathname: '/checkout',
                            state: { total: price, frete: frete }
                          });
                        } else {
                          setMsg('Por favor, insira uma forma de pagamento');
                          setOpen(true);
                        }

                      }}
                    >
                      Concluir
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
};

export default withNav(withAnimation(Sumario));
