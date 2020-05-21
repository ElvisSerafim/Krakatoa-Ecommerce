/* Pagina de Inicio */

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import TextField from '../components/TextField';
import Produto from '../components/Produto';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Promos from '../components/promos';
import HomeComp from '../components/Home';
import Footer from '../components/Footer';
import { sendAllProducts } from '../reducers/allProducts';

import Themes from '../themes';
import deli from '../img/deli.png';
import pqKraka from '../img/pqKraka.png';
import money from '../img/money.png';
import pag from '../img/pagarIcone.png';
import Estilos from '../Estilos';
import api from '../Services/ApiService';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
    },
  },
});
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
};

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let request = [];
    const getProducts = async () => {
      request = await api.ListaProdutos();
      const arrayAux = [];
      request.map((item, i) => {
        if (i > 1 && arrayAux.length <= 3) {
          arrayAux.push(item);
        }
      });
      setProducts(arrayAux);
    };
    getProducts();
  }, []);

  const addItemCart = (productCart) => {
    productCart.quantidade = 1;
    alert();
  };

  return (
    <>
      <Container maxWidth="lg">
        <Topo />
        <div style={{ marginBottom: 64 }}>
          <Navbar />
        </div>
      </Container>
      <Grid item lg={12} md={12}>
        <HomeComp />
      </Grid>
      <Container maxWidth="lg">
        <Grid container spacing={2} justify="space-evenly">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Promos />
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <Typography style={styles.Titulo} color="primary">
              Mais Procurados
            </Typography>
          </Grid>

          {products.map((item, i) => (
            <Grid item lg={3} md={3} sm={3}>
              <Produto
                produto={item}
                update={() => {}}
                title={item.tipo}
                addItem={addItemCart}
              />
            </Grid>
          ))}
          <Grid
            item
            container
            style={{ paddingBottom: '20px' }}
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

          <Grid item lg={3} md={12} sm={12} xs={12}>
            <div style={styles.deli}>
              <img
                style={{ padding: '25px 0px 0px 15px' }}
                alt="Entrega"
                src={deli}
              />
            </div>
            <Typography color="primary" variant="h1" style={{ paddingTop: 30 }}>
              Lorem Ipsum
            </Typography>
            <Typography color="primary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography color="primary" style={{ paddingBottom: 10 }}>
              {' '}
              nec augueegestas ullamcorper
            </Typography>
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <div style={styles.pag}>
              <img
                style={{ padding: '17px 0px 0px 16px' }}
                alt="Pagamento"
                src={pag}
              />
            </div>
            <Typography color="primary" variant="h1" style={{ paddingTop: 30 }}>
              Lorem Ipsum
            </Typography>
            <Typography color="primary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography color="primary" style={{ paddingBottom: 10 }}>
              {' '}
              nec augueegestas ullamcorper
            </Typography>
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <div style={styles.money}>
              <img
                style={{ padding: '22px 0px 0px 20px' }}
                alt="Segurança"
                src={money}
              />
            </div>
            <Typography color="primary" variant="h1" style={{ paddingTop: 30 }}>
              Lorem Ipsum
            </Typography>
            <Typography color="primary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography color="primary">
              {' '}
              nec augueegestas ullamcorper
            </Typography>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <div style={styles.pqKraka}>
              <img
                style={{ padding: '20px 0px 0px 17px' }}
                alt="Produtos"
                src={pqKraka}
              />
            </div>
            <Typography color="primary" variant="h1" style={{ paddingTop: 30 }}>
              Lorem Ipsum
            </Typography>
            <Typography color="primary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography color="primary">
              {' '}
              nec augueegestas ullamcorper
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <Typography color="primary" style={styles.Titulo}>
              Novidades
            </Typography>
          </Grid>
          <Grid item container justify="space-between" lg={12} md={12} sm={12}>
            {products.map((item, i) => (
              <Grid item lg={3} md={3} sm={3}>
                <Produto
                  produto={item}
                  update={() => {}}
                  title={item.tipo}
                  addItem={addItemCart}
                />
              </Grid>
            ))}
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
      <Footer />
    </>
  );
};
export default Home;
