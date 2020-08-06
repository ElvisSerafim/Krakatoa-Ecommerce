/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* Pagina de Inicio */

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core/';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
  const [produtosCangasCelular, setProdutosCangasCelular] = useState([]);
  const [productsNovidades, setProductsNovidades] = useState([]);
  const [produtosMaisProcurados, setProductsMaisProcurados] = useState([]);
  const stateProdutos = useSelector((state) => state.products);
  const { list, loading } = stateProdutos;
  const history = useHistory();

  useEffect(() => {
    Aos.init({ duration: 2000 });
    const arrayList = [];
    const arrayAux = [];
    const arrayCangasCelular = [];
    const arrayAuxNovidades = [];
    list.map((item, i) => {
      if (i > 6 && arrayAux.length <= 3) {
        arrayAux.push(item);
      }
      if (arrayAuxNovidades.length <= 3) {
        if (item.tipo === 'cangas') {
          arrayAuxNovidades.push(item);
        }
      }
      if (arrayCangasCelular.length <= 10) {
        if (item.tipo === 'cangas') {
          arrayCangasCelular.push(item);
        }
      }
      if (
        item.categoria === 'vestidos' ||
        item.categoria === 'batas' ||
        item.categoria === 'macaquinhos'
      ) {
        arrayList.push(item);
      }
    });
    setProductsMaisProcurados(arrayList);
    setProductsNovidades(arrayAuxNovidades);
    setProdutosCangasCelular(arrayCangasCelular);
  }, [loading === true]);

  return (
    <>
      <Grid item lg={12} md={12}>
        <HomeComp />
      </Grid>
      <Container maxWidth="lg">
        <Grid container spacing={2} justify="space-evenly">
          <Grid
            data-aos="fade-up"
            data-aos-once="true"
            style={{ paddingTop: 20 }}
            item
            lg={12}
            md={12}
            sm={12}
            xm={12}
          >
            <Promos />
          </Grid>
          <Grid
            data-aos="fade-right"
            data-aos-once="true"
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
            <Grid data-aos="fade-left" data-aos-once="true" container lg={12}>
              <ListProducts list={produtosMaisProcurados} />
            </Grid>
          </Hidden>

          <Hidden mdUp>
            <div style={styles.scrollbarMobile}>
              {produtosCangasCelular.map((item) => (
                <Grid
                  data-aos="fade-left"
                  data-aos-once="true"
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
                    addItem={() => {}}
                  />
                </Grid>
              ))}
            </div>
          </Hidden>

          <Grid
            data-aos="fade-right"
            data-aos-once="true"
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
              onClick={() => {
                if (window.screen.width >= 864) {
                  history.push('/confeccoes');
                } else {
                  history.push('/cangas');
                }
              }}
              style={Themes.palette.accent}
            >
              VEJA TODOS
            </Button>
          </Grid>
          <Grid
            data-aos="fade-down"
            data-aos-once="true"
            item
            lg={12}
            md={12}
            sm={12}
          >
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

          <Grid
            data-aos="fade-down"
            data-aos-once="true"
            item
            lg={3}
            md={3}
            sm={3}
            xs={12}
          >
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
          <Grid
            data-aos="fade-down"
            data-aos-once="true"
            item
            lg={3}
            md={3}
            sm={3}
            xs={12}
          >
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
          <Grid
            data-aos="fade-down"
            data-aos-once="true"
            item
            lg={3}
            md={3}
            sm={3}
            xs={12}
          >
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
          <Grid
            data-aos="fade-down"
            data-aos-once="true"
            item
            lg={3}
            md={3}
            sm={3}
            xs={12}
          >
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
            data-aos-once="true"
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
              <Grid
                data-aos="fade-up"
                data-aos-once="true"
                item
                lg={3}
                md={3}
                sm={3}
              >
                <Produto
                  produto={item}
                  update={() => {}}
                  title={item.tipo}
                  addItem={() => {}}
                />
              </Grid>
            ))}
          </Hidden>

          <Hidden mdUp>
            <div style={styles.scrollbarMobile}>
              {produtosMaisProcurados.map((item) => (
                <Grid
                  data-aos="fade-up"
                  data-aos-once="true"
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
                    addItem={() => {}}
                  />
                </Grid>
              ))}
            </div>
          </Hidden>
          <Grid item container lg={12} md={12} sm={12}>
            <Grid
              data-aos="fade-right"
              data-aos-once="true"
              item
              container
              justify="center"
              style={{ paddingTop: 50, paddingBottom: '20px' }}
              lg={12}
              md={12}
              sm={12}
            >
              <Button
                variant="contained"
                onClick={() => {
                  if (window.screen.width >= 864) {
                    history.push('/cangas');
                  } else {
                    history.push('/confeccoes');
                  }
                }}
                color="secondary"
              >
                VEJA TODOS
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default withAnimation(Home);
