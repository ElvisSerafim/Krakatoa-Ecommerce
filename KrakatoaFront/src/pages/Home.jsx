/* eslint-disable no-param-reassign */
/* Pagina de Inicio */

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import Aos from 'aos';
import ListProducts from '../components/ListProducts';
import Promos from '../components/promos';
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
import { addCart } from '../reducers/productsCart';
import withAnimation from '../higherComponents/withAnimation';
import 'aos/dist/aos.css';

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
  const [produtosMaisProcurados, setProductsMaisProcurados] = useState([]);
  const [open, setOpen] = useState(false);
  const stateProdutos = useSelector((state) => state.products);
  const { list, loading } = stateProdutos;
  const dispatch = useDispatch();
  const fechar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    Aos.init({ duration: 2000 });
    const arrayList = [];
    const arrayAux = [];
    const arrayAuxNovidades = [];
    list.map((item, i) => {
      if (i > 6 && arrayAux.length <= 3) {
        arrayAux.push(item);
      }
      if (i > 10 && arrayAuxNovidades.length <= 3) {
        arrayAuxNovidades.push(item);
      }
      if (
        item.categoria === 'vestidos'
        || item.categoria === 'batas'
        || item.categoria === 'macaquinhos'
      ) {
        arrayList.push(item);
      }
    });
    setProductsMaisProcurados(arrayList);
    setProducts(arrayAux);
    setProductsNovidades(arrayAuxNovidades);
  }, [loading === true]);

  const addItemCart = (productCart) => {
    productCart.quantidade = 1;
    dispatch(addCart(productCart));
    setOpen(true);
  };

  return (
    <>
      <Topo />
      <Navbar />
      <Grid item lg={12} md={12}>
        <HomeComp />
      </Grid>
      <Container maxWidth="lg">
        <Grid container spacing={2} justify="space-evenly">
          <Grid
            data-aos="fade-up"
            style={{ paddingTop: 20 }}
            item
            lg={12}
            md={2}
          >
            <Promos />
          </Grid>
          <Grid
            data-aos="fade-right"
            style={{ paddingBottom: 40, paddingTop: 20 }}
            item
            lg={12}
            md={12}
            sm={12}
          >
            <Typography style={styles.Titulo} color="secondary">
              Mais Procurados
            </Typography>
          </Grid>

          <Hidden smDown>
            <Grid data-aos="fade-left" container lg={12}>
              <ListProducts list={produtosMaisProcurados} />
            </Grid>
          </Hidden>

          <Hidden mdUp>
            <div style={styles.scrollbarMobile}>
              {products.map((item) => (
                <Grid
                  data-aos="fade-left"
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  style={{ marginLeft: 10 }}
                >
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
            data-aos="fade-right"
            item
            container
            style={{ paddingTop: 50, paddingBottom: '20px' }}
            justify="center"
            lg={12}
            md={12}
            sm={12}
          >
            <Button
              variant="contained"
              color="secondary"
              style={Themes.palette.accent}
            >
              VEJA TODOS
            </Button>
          </Grid>
          <Grid data-aos="fade-down" item lg={12} md={12} sm={12}>
            <Typography
              color="secondary"
              style={{
                textAlign: 'center',
                paddingBottom: '40px',
                paddingTop: 70,
              }}
              variant="h5"
            >
              Por que Krakatoa?
            </Typography>
          </Grid>

          <Grid data-aos="fade-down" item lg={3} md={3} sm={3} xs={12}>
            <div style={styles.deli}>
              <img
                style={{ padding: '25px 0px 0px 15px' }}
                alt="Entrega"
                src={deli}
              />
            </div>
            <Typography
              color="secondary"
              variant="h1"
              style={{ paddingTop: 30 }}
            >
              ENTREGA
            </Typography>
            <Typography color="secondary">
              Entrega rápida e eficiente em sua casa.
            </Typography>
          </Grid>
          <Grid data-aos="fade-down" item lg={3} md={3} sm={3} xs={12}>
            <div style={styles.pag}>
              <img
                style={{ padding: '17px 0px 0px 16px' }}
                alt="Pagamento"
                src={pag}
              />
            </div>
            <Typography
              color="secondary"
              variant="h1"
              style={{ paddingTop: 30 }}
            >
              PAGAMENTO
            </Typography>
            <Typography color="secondary">
              Variados tipos de pagamentos.
            </Typography>
            <Typography color="secondary" style={{ paddingBottom: 10 }}>
              {' '}
              Desde boleto até cartões de crédito e débito das principais
              bandeiras do país!
            </Typography>
          </Grid>
          <Grid data-aos="fade-down" item lg={3} md={3} sm={3} xs={12}>
            <div style={styles.money}>
              <img
                style={{ padding: '22px 0px 0px 20px' }}
                alt="Segurança"
                src={money}
              />
            </div>
            <Typography
              color="secondary"
              variant="h1"
              style={{ paddingTop: 30 }}
            >
              SEGURANÇA
            </Typography>
            <Typography color="secondary">
              Aqui sua compra é garantida!
            </Typography>
            <Typography color="secondary">
              {' '}
              Site 100% confiável. Seu produto é enviado assim que autorizado.
            </Typography>
          </Grid>
          <Grid data-aos="fade-down" item lg={3} md={3} sm={3} xs={12}>
            <div style={styles.pqKraka}>
              <img
                style={{ padding: '20px 0px 0px 17px' }}
                alt="Produtos"
                src={pqKraka}
              />
            </div>
            <Typography
              color="secondary"
              variant="h1"
              style={{ paddingTop: 30 }}
            >
              VARIEDADE
            </Typography>
            <Typography color="secondary">
              Aqui temos diversos produtos
            </Typography>
            <Typography color="secondary">
              para todos os gostos das nossas clientes!
            </Typography>
          </Grid>
          <Grid
            data-aos="fade-right"
            item
            lg={12}
            md={12}
            sm={12}
            style={{ paddingBottom: 12 }}
          >
            <Typography color="secondary" style={styles.Titulo}>
              Novidades
            </Typography>
          </Grid>

          <Hidden smDown>
            {productsNovidades.map((item) => (
              <Grid data-aos="fade-up" item lg={3} md={3} sm={3}>
                <Produto
                  produto={item}
                  update={() => {}}
                  title={item.tipo}
                  addItem={addItemCart}
                />
              </Grid>
            ))}
          </Hidden>

          <Hidden mdUp>
            <div style={styles.scrollbarMobile}>
              {productsNovidades.map((item) => (
                <Grid
                  data-aos="fade-up"
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  style={{ marginLeft: 10 }}
                >
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
              data-aos="fade-right"
              item
              container
              justify="center"
              style={{ paddingTop: 50, paddingBottom: '20px' }}
              lg={12}
              md={12}
              sm={12}
            >
              <Button variant="contained" color="secondary">
                VEJA TODOS
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};
export default withAnimation(Home);
