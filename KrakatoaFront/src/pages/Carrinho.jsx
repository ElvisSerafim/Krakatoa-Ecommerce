/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Typography,
  Button,
  Paper,
  TextField,
  Hidden,
} from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '../components/Table';
import ListItem from '../components/ListItem';
import { removerCart, removeAllProducts } from '../reducers/productsCart';
import api from '../Services/ApiService';
import Estilos from '../Estilos';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

const useStyles = makeStyles((theme) => ({
  Cor: {
    backgroundColor: theme.palette.background.color,
    padding: 16,
    '@media (max-width: 960px)': {
      marginTop: 16,
    },
  },
  GridCell: {
    '@media (max-width: 960px)': {
      marginTop: 50,
    },
  },
  Paper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: theme.palette.secondary.main,
    padding: 16,
    '@media (max-width: 1280px)': {
      marginTop: 64,
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

const Carrinho = () => {
  const [totalFinal, setFinalTotal] = useState(0);
  const [totalFrete, setTotalFrete] = useState(0);
  const [total, setTotal] = useState(0);
  const [cep, setCep] = useState('');

  const products = useSelector((state) => state.productsCart);
  const dispatch = useDispatch();
  const { length } = products;

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
    let ValorFinal = 0;
    ValorFinal = totalFinal + totalFrete;
    setTotal(ValorFinal);
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

  const removeAll = () => {
    dispatch(removeAllProducts());
  };
  const classes = useStyles();
  return (
    <>
      {length === 0 ? (
        <div style={{ ...Estilos.flexRowCENTER2, minHeight: 500, padding: 64 }}>
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
            {/* Table dos Produtos */}
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
                  products={products}
                  actualTotal={atualizarTotal}
                  removerItem={removerProduct}
                />
              </Grid>
            </Hidden>
            {/* Display Celular */}
            <Hidden mdUp="true">
              <ListItem atualizarTotal={atualizarTotalList} />
            </Hidden>
            {/* Continuar comprando e Limpar */}
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xm={12}
              container
              justify="space-around"
              alignItems="baseline"
              /* alignContent="center" */
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xm={12}
                style={{ marginBottom: 32 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={styles.borderHeight}
                  href="/"
                >
                  Continuar Comprando
                </Button>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xm={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={removeAll}
                  style={{ ...styles.borderHeight, width: 120 }}
                >
                  Limpar
                </Button>
              </Grid>
            </Grid>
            {/* Frete e InfoCompra */}
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xm={12}
              container
              justify="space-between"
            >
              {/* Frete */}
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Paper
                  elevation={4}
                  style={{ marginTop: 0 }}
                  className={classes.Paper}
                >
                  <Grid
                    item
                    container
                    justify="flex-start"
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ height: '100%' }}
                  >
                    <Typography variant="h5" color="textSecondary">
                      Frete:
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                      R$ {totalFrete}
                    </Typography>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      variant="filled"
                      type="Cep"
                      color="secondary"
                      style={{ backgroundColor: 'white' }}
                      label="Cep"
                      fullWidth
                      value={cep}
                      placeholder="Insira seu CEP"
                      onChange={(event) => {
                        setCep(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
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
                </Paper>
              </Grid>
              {/* InfoCompra */}
              <Grid
                item
                lg={5}
                md={12}
                sm={12}
                xs={12}
                classname={classes.GridCell}
              >
                <Paper className={classes.Paper}>
                  <Grid item lg={12} md={12} sm={12} xm={12}>
                    <Typography variant="h5" color="textSecondary">
                      Total no Carrinho:
                    </Typography>
                  </Grid>
                  {/* Total PreFrete */}
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xm={12}
                    container
                    justify="space-around"
                  >
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h5" color="textSecondary">
                        SubTotal:
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h5" color="textSecondary">
                        R$
                        {totalFinal.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* Entrega */}
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xm={12}
                    container
                    justify="space-around"
                  >
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h5" color="textSecondary">
                        Entrega:
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h5" color="textSecondary">
                        R${totalFrete.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* Total PosFrete */}
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xm={12}
                    container
                    justify="space-around"
                  >
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h5" color="textSecondary">
                        Total:
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h5" color="textSecondary">
                        R$
                        {total.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* Botão */}
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xm={12}
                    style={{ marginTop: 16 }}
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
                        fullWidth
                        style={styles.borderHeight}
                        href="/endereco"
                      >
                        Checkout
                      </Button>
                    </Link>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
export default withNav(withAnimation(Carrinho));
