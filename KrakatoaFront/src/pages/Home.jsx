/* Pagina de Inicio */

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Box } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import TextField from '../components/TextField';
import Produto from '../components/Produto';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import HomeComp from '../components/Home';
import Footer from '../components/Footer';
import Themes from '../themes';
import deli from '../img/deli.png';
import pqKraka from '../img/pqKraka.png';
import money from '../img/money.png';
import pag from '../img/pagarIcone.png';
import Estilos from '../Estilos';
import api from '../Services/ApiService';
import Alerta from '../components/Alerta';
import { addCart } from '../reducers/productsCart';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

const styles = {
  Promos: { width: 'auto', height: '373px', backgroundColor: '#B1B1B1' },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: 2,
  },
  Carrocel: {
    height: '752.29px',
    width: 'auto',
    backgroundColor: '#B1B1B1',
    marginTop: '2em',
  },
  Titulo: { fontSize: '3em', fontWeight: '300' },
  deli: { backgroundColor: '#E8E8E8', width: 70, height: 70, borderRadius: 10 },
  pag: { backgroundColor: '#FFF3DF', width: 70, height: 70, borderRadius: 10 },
  pqKraka: {
    backgroundColor: '#E8E8E8',
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  money: {
    backgroundColor: '#E8E8E8',
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  scrollbarMobile: {
    display: 'flex',
    overflowX: 'scroll',
    width: '100%',
  },
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsNovidades, setProductsNovidades] = useState([]);
  const [open, setOpen] = useState(false);

  const fechar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    let request = [];
    const getProducts = async () => {
      request = await api.ListaProdutos();
      const arrayAux  = [];
      const arrayAuxNovidades = [];
      request.map((item, i) => {
        if (i > 6 && arrayAux.length <= 3) {
          arrayAux.push(item);
        }
        if(i > 10 && arrayAuxNovidades.length <= 3){
          arrayAuxNovidades.push(item);
        }
      });
      setProducts(arrayAux);
      setProductsNovidades(arrayAuxNovidades);
    };
    getProducts();
  }, []);

  const addItemCart = (productCart) => {
    productCart.quantidade = 1;
    dispatch(addCart(productCart));
    setOpen(true);
  };
  const dispatch = useDispatch();
  return (
    <>
      <Alerta
        message="Produto adicionado"
        vertical="top"
        horizontal="right"
        status="success"
        handleClose={fechar}
        openAlert={open}
      />
      <Topo />
      <Navbar />
      <Grid item lg={12} md={12}>
        <HomeComp />
      </Grid>
      <Container maxWidth="lg">
        <Grid container spacing={2} justify="space-evenly">

          <Grid style={{paddingBottom:40,paddingTop:20}}item lg={12} md={12} sm={12}>
            <Typography style={styles.Titulo} color="primary">
              Mais Procurados
            </Typography>
          </Grid>

          <Hidden smDown>
            {products.map((item) => (
              <Grid item lg={3} md={3} sm={3}>
                <Produto
                  produto={item}
                  update={() => {}}
                  title={item.tipo}
                  addItem={addItemCart}
                />
              </Grid>
            ))}
          </Hidden>

          <Hidden lgUp>
            <div style={styles.scrollbarMobile}>
              {products.map((item) => (
                <Grid item lg={12} md={12} sm={12} style={{ marginLeft: 10 }}>
                  <Produto
                    produto={item}
                    update={() => {}}
                    title={item.tipo}
                    addItem={addItemCart}
                  />
                </Grid>
              ))}
            </div>
          </Hidden>

          <Grid
            item
            container
            style={{paddingTop:50, paddingBottom: '20px' }}
            justify="center"
            lg={12}
            md={12}
            sm={12}
          >
            <Button
              variant="contained"
              color="primary"
              style={Themes.palette.accent}
            >
              VEJA TODOS
            </Button>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <Typography
              color="primary"
              style={{ textAlign: 'center', paddingBottom: '40px' }}
              variant="h5"
            >
              Por que Krakatoa?
            </Typography>
          </Grid>

          <Grid item lg={3} md={3} sm={3} xs={12}>
            <div style={styles.deli}>
              <img
                style={{ padding: '25px 0px 0px 15px' }}
                alt="Entrega"
                src={deli}
              />
            </div>
            <Typography color="primary" variant="h1" style={{ paddingTop: 30 }}>
              ENTREGA
            </Typography>
            <Typography color="primary">
              Entrega rápida e eficiente em sua casa.
            </Typography>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <div style={styles.pag}>
              <img
                style={{ padding: '17px 0px 0px 16px' }}
                alt="Pagamento"
                src={pag}
              />
            </div>
            <Typography color="primary" variant="h1" style={{ paddingTop: 30 }}>
              PAGAMENTO 
            </Typography>
            <Typography color="primary">
              Variados tipos de pagamentos.
            </Typography>
            <Typography color="primary" style={{ paddingBottom: 10 }}>
              {' '}
              Desde boleto até cartões de crédito e débito das principais bandeiras do país!
            </Typography>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <div style={styles.money}>
              <img
                style={{ padding: '22px 0px 0px 20px' }}
                alt="Segurança"
                src={money}
              />
            </div>
            <Typography color="primary" variant="h1" style={{ paddingTop: 30 }}>
              SEGURANÇA
            </Typography>
            <Typography color="primary">
              Aqui sua compra é garantida! 
            </Typography>
            <Typography color="primary">
              {' '}
              Site 100% confiável. Seu produto é enviado assim que autorizado.
            </Typography>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <div style={styles.pqKraka}>
              <img
                style={{ padding: '20px 0px 0px 17px' }}
                alt="Produtos"
                src={pqKraka}
              />
            </div>
            <Typography color="primary" variant="h1" style={{ paddingTop: 30 }}>
              VARIEDADE
            </Typography>
            <Typography color="primary">
              Aqui temos diversos produtos
            </Typography>
            <Typography color="primary">
              para todos os gostos da nossa cliente!
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} style={{paddingBottom:12}}>
            <Typography color="primary" style={styles.Titulo}>
              Novidades
            </Typography>
          </Grid>

          <Hidden smDown>
            {productsNovidades.map((item) => (
              <Grid item lg={3} md={3} sm={3}>
                <Produto
                  produto={item}
                  update={() => {}}
                  title={item.tipo}
                  addItem={addItemCart}
                />
              </Grid>
            ))}
          </Hidden>

          <Hidden lgUp>
            <div style={styles.scrollbarMobile}>
              {productsNovidades.map((item) => (
                <Grid item lg={12} md={12} sm={12} style={{ marginLeft: 10 }}>
                  <Produto
                    produto={item}
                    update={() => {}}
                    title={item.tipo}
                    addItem={addItemCart}
                  />
                </Grid>
              ))}
            </div>
          </Hidden>
          <Grid item container lg={12} md={12} sm={12}>
            <Grid
              item
              container
              justify="center"
              style={{ padding: '64px 0px 20px 0px' }}
              lg={12}
              md={12}
              sm={12}
            >
              <Button variant="contained" color="primary">
                VEJA TODOS
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <div
        style={{
          backgroundColor: '#44323D',
          width: '100%',
          paddingTop: '2vw',
          height: 200,
          marginBottom: 100,
          borderRadius: 20,
        }}
      >
        <Grid
          item
          alignItems="center"
          justify="space-around"
          container
          lg={12}
          md={12}
          sm={12}
        >
          <Grid item container xl={3} lg={3} md={4} sm={5}>
            <Box flexDirection="column" style={Estilos.flexColumnStandard}>
              <Typography
                style={{ color: 'white',textAlign: 'center', fontSize: '1.2em' }}
              >
                Se inscreva no nosso loja
              </Typography>

              <Typography
                color="secondary"
                style={{color: 'white', textAlign: 'center', fontSize: '1.2em' }}
                variant="h5"
              >
                {' '}
                e receba ofertas exclusivas!
              </Typography>
            </Box>
          </Grid>

          <div style={{ width: 215 }}>
            <TextField
              fullWidth
              styleslabel={{ color: 'white' }}
              label="Escreva seu melhor email"
            />
          </div>
          <Grid justify="center" item container lg={3} md={3} sm={5}>
            <div style={{ borderRadius: 100, width: 200, paddingTop: 35 }}>
              <Button variant="contained" color="primary" fullWidth>
                SE INSCREVA
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
};
export default withAnimation(Home);
