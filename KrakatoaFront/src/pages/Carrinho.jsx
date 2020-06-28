/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Button } from '@material-ui/core/';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '../components/TextField';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
import delivery from '../img/noDelivery.svg';
import payment from '../img/payment.svg';
import Table from '../components/Table';
import ListItem from '../components/ListItem';
import { removerCart, removeProducts } from '../reducers/productsCart';
import api from '../Services/ApiService';
import Estilos from '../Estilos';

const useStyles = makeStyles((theme) => ({
  Cor: {
    backgroundColor: theme.palette.background.color,
    padding: 16,
    borderRadius: 10,
    '@media (max-width: 1280px)': {
      marginBottom: 32,
    },
  },
}));

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
  boxStyle: {
    m: 1,
    border: 5,
    padding: '40px',
  },
  cupomField: {
    borderRadius: 100,
  },
  searchIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 200,
    backgroundColor: 'red',
    color: 'white',
  },
  priceText: {
    color: 'white',
    backgroundColor: '#FF6961',
    borderRadius: 10,
    fontFamily: 'Poppins',
    fontSize: 20,
    padding: '20px',
  },
  borderHeight: { borderRadius: 7, height: 50 },
  linha: {
    color: 'red',
    backgroundColor: 'red',
    height: 1,
    borderColor: 'red',
    width: '100%',
  },
};

const tentativa = {
  table: {
    minWidth: 300,
    borderRadius: 10,
    fontFamily: 'Poppins',
  },
  tableHead: {
    height: 100,
  },
};

const Carrinho = () => {
  const [totalFinal, setFinalTotal] = useState(0);
  const [totalFrete, setTotalFrete] = useState(0);
  const [total, setTotal] = useState(0);
  const [cep, setCep] = useState('');

  const products = useSelector((state) => state.productsCart);
  console.log(products);

  const dispatch = useDispatch();
  const length = useSelector((state) => state.productsCart.length);

  const atualizarTotal = (totalMap) => {
    let auxTotal = 0;
    totalMap.map((item) => {
      auxTotal += item;
    });
    setFinalTotal(auxTotal);
  };

  const atualizarTotalList = (valorFinal) => {
    setFinalTotal(valorFinal);
  };

  const removerProduct = (produto) => {
    dispatch(removerCart(produto));
  };

  useEffect(() => {
    let totally = 0;
    totally = totalFinal + totalFrete;
    setTotal(totally.toFixed(2));
  }, [totalFinal, totalFrete]);

  const calcularPrazo = async () => {
    const data = {
      cepOrigem: '41610200',
      cepDestino: cep,
      valorDeclarado: 500,
      codigoServico: 41106,
    };
    const request = await api.CalcPrazoPreco(data);
    const val = parseFloat(request[0].valor.toString().replace(',', '.'));
    setTotalFrete(val);
  };

  const removeAllProducts = () => {
    dispatch(removeProducts());
  };
  const classes = useStyles();
  return (
    <>
      <Topo />
      <Navbar />
      <Container maxWidth="lg">
        {length === 0 ? (
          <div style={{ ...Estilos.flexRowCENTER2, padding: 64 }}>
            <Typography
              color="primary"
              variant="h5"
              style={{ fontSize: '3.0em', fontWeight: 'Bold' }}
            >
              Sem produtos no carrinho
            </Typography>
          </div>
        ) : (
          <>
            <Grid spacing={2} style={{ marginTop: 64, marginBottom: 64 }}>
              <Grid item lg={12}>
                <Typography variant="h2" color="primary">
                  Carrinho
                </Typography>
              </Grid>
              <Grid item lg={8} />
              <Grid item lg={4} container justify="flex-end">
                <div style={Estilos.flexRowCENTER2}>
                  <a href="/carrinho">
                    <div style={styles.searchIcon}>
                      <ShoppingCartIcon />
                    </div>
                  </a>
                  <hr style={styles.hrstyle} />
                  <a href="/endereco">
                    <img src={delivery} alt="Endereço" />
                  </a>
                  <hr style={styles.hrstyle} />
                  <a href="/">
                    <img src={payment} alt="Pagamento" />
                  </a>
                </div>
              </Grid>
              <Hidden smDown="true">
                <Grid
                  container
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  style={{ marginTop: 64 }}
                >
                  <Table
                    estilo={tentativa}
                    actualTotal={atualizarTotal}
                    removerItem={removerProduct}
                  />
                </Grid>
              </Hidden>
              <Hidden lgUp="true">
                <ListItem atualizarTotal={atualizarTotalList} />
              </Hidden>
              {/* Continuar comprando e Limpar */}
              <Grid
                item
                lg={12}
                container
                justify="space-around"
                style={{ marginTop: 32, marginBottom: 32 }}
              >
                <Grid item lg={6} style={{ marginBottom: 32 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={styles.borderHeight}
                    href="/"
                  >
                    Continuar Comprando
                  </Button>
                </Grid>
                <Grid item lg={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={removeAllProducts}
                    style={{ ...styles.borderHeight, width: 120 }}
                  >
                    Limpar
                  </Button>
                </Grid>
              </Grid>
              {/* Frete */}
              <Grid item lg={12} spacing={4} container justify="space-around">
                <Grid
                  item
                  lg={4}
                  md={12}
                  sm={12}
                  xs={12}
                  container
                  justify="flex-end"
                  className={classes.Cor}
                  spacing={2}
                >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="h5" color="secondary">
                      Frete:
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="h5" color="secondary">
                      R$ {totalFrete}
                    </Typography>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      placeholder="Insira seu CEP"
                      onChange={(event) => {
                        setCep(event.target.value);
                      }}
                      style={{
                        color: 'red',
                        backgroundColor: 'white',
                        ...styles.borderHeight,
                        width: '100%',
                        marginBottom: 16,
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={4}
                    xs={4}
                    container
                    justify="flex-end"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={calcularPrazo}
                      fullWidth
                      style={styles.borderHeight}
                    >
                      Calcular
                    </Button>
                  </Grid>
                </Grid>
                <Grid item lg={1} md={0} sm={0} />
                <Grid
                  item
                  lg={5}
                  md={12}
                  sm={12}
                  xs={12}
                  container
                  justify="space-around"
                  className={classes.Cor}
                >
                  <Grid item lg={12} md={12} sm={12}>
                    <Typography variant="h5" color="secondary">
                      Total no Carrinho:
                    </Typography>
                  </Grid>
                  <Grid item lg={12} container justify="space-around">
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h5" color="secondary">
                        SubTotal:
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h5" color="secondary">
                        R$ {totalFinal}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="h5" color="secondary">
                      Entrega:
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="h5" color="secondary">
                      R${totalFrete}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="h5" color="secondary">
                      Total:
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="h5" color="secondary">
                      R${total}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                lg={12}
                container
                justify="flex-end"
                style={{ marginTop: 32 }}
              >
                <Link
                  to={{
                    pathname: '/endereco',
                    state: {
                      totalPedido: total,
                      cepEndereco: cep,
                    },
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={styles.borderHeight}
                    href="/endereco"
                  >
                    Checkout
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};
export default Carrinho;
