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
  CircularProgress,
  Fade,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Table from '../components/Table';
import ListItem from '../components/ListItem';
import { removerCart, removeAllProducts } from '../reducers/productsCart';
import api from '../Services/ApiService';
import Estilos from '../Estilos';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';
import Alerta from '../components/Alerta';

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
    backgroundColor: '#D2C9C7',
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

const Carrinho = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [totalFinal, setFinalTotal] = useState(0);
  const [totalFrete, setTotalFrete] = useState(0);
  const [total, setTotal] = useState(0);
  const [pesoTotal, setPesoTotal] = useState(0);
  const [altura, setAltura] = useState(0);
  const [dadosCep, setDadosCep] = useState('');
  const [cep, setCep] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const products = useSelector((state) => state.productsCart);
  const dispatch = useDispatch();
  const { length } = products;
  const { register, handleSubmit } = useForm();

  const atualizarTotal = (totalMap) => {
    let auxTotal = 0;
    totalMap.forEach((item) => {
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

    let totalPeso = 0;
    products.forEach((item) => {
      totalPeso += item.peso;
    });
    if (products.length <= 4) {
      setAltura(16);
    } else if (products.length > 4 && products.length <= 9) {
      setAltura(32);
    } else {
      setAltura(48);
    }
    setPesoTotal(totalPeso / 1000);
  }, [totalFinal, totalFrete, products]);

  const calcularPrazo = async () => {
    setLoading(true);
    try {
      const data = {
        cepDestino: cep,
        valorDeclarado: totalFinal,
        peso: pesoTotal,
        altura,
      };
      const request = await api.CalcPrazoPreco(data);
      const val = parseFloat(request.sedex[0].valor.replace(',', '.'));
      setTotalFrete(val);
      setDadosCep(request);
      setLoading(false);
    } catch (error) {
      setMessage('Cep vazio');
      setStatus('error');
      setOpen(true);
    }
  };

  const removeAll = () => {
    dispatch(removeAllProducts());
  };

  const proxPg = (data) => {
    try {
      if (data.cep === '') throw new Error('Cep vazio');
      history.push({
        pathname: '/endereco',
        state: {
          totalPedido: totalFinal,
          cepEndereco: data.cep,
          dadosCep,
          altura,
          peso: pesoTotal,
        },
      });
    } catch (error) {
      setMessage(error.message);
      setStatus('error');
      setOpen(true);
    }
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
          <Alerta
            openAlert={open}
            message={message}
            status={status}
            handleClose={handleClose}
            vertical="top"
            horizontal="right"
          />
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              proxPg(data);
            })}
          >
            <Grid style={{ marginTop: 64, marginBottom: 64 }}>
              {/* Table dos Produtos */}
              <Hidden smDown>
                <Grid
                  container
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  style={{ marginTop: 64 }}
                >
                  <Paper
                    elevation={2}
                    style={{ backgroundColor: '#D2C9C7', width: '100%' }}
                  >
                    <Table
                      products={products}
                      actualTotal={atualizarTotal}
                      removerItem={removerProduct}
                    />
                  </Paper>
                </Grid>
              </Hidden>
              {/* Display Celular */}
              <Hidden mdUp>
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
                      <div
                        style={{
                          display: 'flex',
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <Typography variant="h5" color="secondary">
                            Frete:
                          </Typography>
                          <Typography variant="h5" color="secondary">
                            R$ {totalFrete}
                          </Typography>
                        </div>
                        <Fade
                          in={loading}
                          style={{
                            transitionDelay: loading ? '800ms' : '0ms',
                          }}
                          unmountOnExit
                        >
                          <CircularProgress color="primary" />
                        </Fade>
                      </div>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextField
                        required
                        variant="filled"
                        type="Cep"
                        color="textSecondary"
                        name="cep"
                        inputRef={register}
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
                  className={classes.GridCell}
                >
                  <Paper className={classes.Paper} elevation={4}>
                    <Grid item lg={12} md={12} sm={12} xm={12}>
                      <Typography variant="h5" color="secondary">
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
                        <Typography variant="h5" color="secondary">
                          SubTotal:
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="h5" color="secondary">
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
                        <Typography variant="h5" color="secondary">
                          Entrega:
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="h5" color="secondary">
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
                        <Typography variant="h5" color="secondary">
                          Total:
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="h5" color="secondary">
                          R$
                          {total.toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* Bot??o */}
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xm={12}
                      style={{ marginTop: 16 }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={styles.borderHeight}
                      >
                        Checkout
                      </Button>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </>
  );
};
export default withNav(withAnimation(Carrinho));
