/* eslint-disable react/prop-types */
/* Pagina de Sobre
 */

import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  Typography,
  Box,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { removeAllProducts } from '../reducers/productsCart';
import api from '../Services/ApiService';
import Alerta from '../components/Alerta';
import SumarioMobile from '../components/SumarioMobile';
import TableSumario from '../components/TableSumario';
import { boleto } from '../Services/pagar';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

const generateSafeId = require('generate-safe-id');

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
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#44323D',
  },
  entrega: {
    color: '#C8C8C8',
    paddingTop: '20px',
    fontSize: '1.0em',
  },
  escolhido: {
    marginTop: 11,
    width: 120,
    height: 30,
    borderRadius: 10,
    color: 'white',
    backgroundColor: '#44323D',
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
  text: {
    fontWeight: '700',
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
  const [valorFrete, setFrete] = useState('');
  const [urlDelivery, setUrl] = useState('');
  const [pagamento, setPag] = useState('Nenhum');
  const products = useSelector((state) => state.productsCart);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const history = useHistory();
  let dado;

  const frete = parseFloat(valorFrete.replace(',', '.'));
  const price = (totalFinal + frete) * 100;
  const boletopag = async () => {
    const id = generateSafeId();
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
    const dataa = {
      precoTotal: price,
      frete,
      data: '12/12/2122',
      produtos: produtosPedidos,
      metodo: 'boleto',
      idPedido: id,
      idPagamento: dado.payment.paymentId,
      token,
    };
    const request = await api.enviarPedido(dataa);
    console.log(request);
    dispatch(removeAllProducts());
  };

  useEffect(() => {
    const arrayAux = [];
    products.map((item, i) => {
      const produto = {};
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
      setFrete(location.state.totalFrete);
    }

  }, [products]);


  const atualizarTotal = (total) => {
    let auxTotal = 0;
    total.map((item) => {
      auxTotal += item;
    });
    setFinalTotal(auxTotal);
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
          <Hidden smDown>
            <div style={{ ...styles.flexRow, marginTop: 32 }}>
              <Grid item lg={12} container>
                <Grid item lg={12} container>
                  <TableSumario
                    actualTotal={atualizarTotal}
                    totalSumario={totalFinal}
                  />
                </Grid>
                <Grid
                  lg={12}
                  style={{ marginTop: 32 }}
                  container
                  justify="center"
                  item
                >
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
                  alignItems: 'center',
                }}
              >
                <Paper
                  elevation={4}
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: 16,
                    marginLeft: 60,
                    backgroundColor: '#D2C9C7',
                  }}
                >
                  <div style={{ marginBottom: 40 }}>
                    <Typography variant="h1">Dados de entrega:</Typography>

                    <div style={{ marginTop: 10 }}>
                      <Typography style={{ marginTop: 10 }} variant="h1">
                        {location.state.endereco.nome}
                      </Typography>
                      <Typography style={{ marginTop: 10 }} variant="h1">
                        {location.state.endereco.telefone}
                      </Typography>
                      <Typography style={{ marginTop: 5 }} variant="h1">
                        {location.state.endereco.rua}
                      </Typography>
                      <Typography style={{ marginTop: 5 }} variant="h1">
                        {location.state.endereco.bairro}
                      </Typography>
                      <Typography style={{ marginTop: 5 }} variant="h1">
                        Numero° {location.state.endereco.numero}
                      </Typography>
                      <Typography style={{ marginTop: 5 }} variant="h1">
                        {location.state.endereco.cidade}
                      </Typography>
                      <Typography style={{ marginTop: 5 }} variant="h1">
                        {location.state.endereco.complemento}
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
                      style={{ textDecoration: 'none', width: '100%' }}
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

                  <Box display="flex" flexDirection="column">
                    <Typography style={styles.price} id="Entrega">
                      {location.state.entregaSelecionada}
                    </Typography>
                    <Typography style={styles.price} id="price">
                      {valorFrete}
                    </Typography>
                    <Typography style={styles.entrega} id="entregaTipo">
                      {location.state.entregaSelecionada}
                    </Typography>
                  </Box>

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
                          state: { total: price, frete },
                        });
                      } else {
                        setMsg('Por favor, insira uma forma de pagamento');
                        setOpen(true);
                      }
                    }}
                  >
                    Concluir
                  </Button>
                </Paper>
              </div>
            </div>
          </Hidden>

          <Hidden mdUp>
            <Grid style={{ marginTop: 50, marginBottom: 64 }}>
              <Grid item lg={12}>
                <Typography variant="h4" color="primary">
                  Sumário
                </Typography>
              </Grid>
              <Grid item lg={8} />
              <Grid item lg={4} container justify="flex-end" />
              <SumarioMobile actualTotal={atualizarTotal} />
              <Typography variant="h6" color="primary">
                Endereço
              </Typography>

              <div style={{ marginTop: 10 }}>
                <Typography style={styles.text}>
                  {location.state.endereco.nome}
                </Typography>
                <Typography style={styles.text}>
                  {location.state.endereco.rua},{' '}
                  {location.state.endereco.bairro}, Numero°{' '}
                  {location.state.endereco.numero}
                </Typography>
                <Typography style={styles.text}>
                  {location.state.endereco.cidade}
                </Typography>
                <Typography style={styles.text}>
                  {location.state.endereco.complemento}
                </Typography>
                <Typography style={styles.text}>
                  {location.state.endereco.telefone}
                </Typography>
                <Box
                  style={{ cursor: 'pointer', marginTop: 15 }}
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
                <Divider style={{ marginTop: 5 }} />
              </div>

              <div style={{ marginTop: 10 }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography color="primary" style={styles.text}>
                    SubTotal
                  </Typography>
                  <Typography style={styles.text}>R$ {totalFinal}</Typography>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                  }}
                >
                  <Typography color="primary" style={styles.text}>
                    Frete
                  </Typography>
                  <Typography style={styles.text}>R$ {frete}</Typography>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                  }}
                >
                  <Typography color="primary" variant="h5">
                    Total
                  </Typography>
                  <Typography style={styles.text}>
                    R$ {price/100}
                  </Typography>
                </div>
                <Divider />
              </div>
              <div style={{ paddingTop: 20 }}>
                <FormControl variant="outlined" style={{ width: '100%' }}>
                  <InputLabel style={{ color: '#44323D' }}>
                    Formas de pagamento
                  </InputLabel>
                  <Select
                    onChange={handleChangePagamento}
                    value={pagamento}
                    label="Formas de pagamento"
                  >
                    <MenuItem value="Nenhum" />
                    <MenuItem value="CARTAO">Cartão de crédito/débito</MenuItem>
                    <MenuItem value="BOLETO">Boleto</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div style={{ width: '100%', marginTop: 30 }}>
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
                        state: { total: price, frete },
                      });
                    } else {
                      setMsg('Por favor, insira uma forma de pagamento');
                      setOpen(true);
                    }
                  }}
                >
                  Finalizar Compra
                </Button>
              </div>
            </Grid>
          </Hidden>
        </>
      )}
    </>
  );
};

export default withNav(withAnimation(Sumario));
