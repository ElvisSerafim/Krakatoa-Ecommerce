/* eslint-disable react/prop-types */
/* Produto em Si */

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import ProdutoEmSi from '../components/ProdutoEmSi';
import Footer from '../components/Footer';

const styles = {
  foto: {
    backgroundColor: 'black',
    borderRadius: 5,
    height: 122,
    marginTop: 10,
    maxWidth: 116,
  },
  quadradao1: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 700,
    marginTop: 40,
  },
  quadradao2: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 700,
    marginTop: 40,
  },
  marginDiv: {
    marginTop: 40,
  },
  promo: {
    backgroundColor: 'red',
    borderRadius: '10px 0px 20px 0px',
    height: 33,
    width: '150px',
    padding: '3px',
    textAlign: 'center',
  },
  promoText: {
    color: 'white',
  },
  flexRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: '50',
    justifyContent: 'space-between',
  },
  product: { color: 'white', fontSize: '0.7em', padding: 10 },
  num: { paddingLeft: 350, color: '#F0F0F0' },
  lore: {
    paddingTop: 30, paddingLeft: 90, color: 'white', fontSize: '2.25em', fontWeight: 'bold',
  },
  price: {
    paddingLeft: 90,
    paddingTop: 30,
    fontWeight: 'bold',
  },
};

const ProdutoPage = ({ match, produtos }) => {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);

  /* useEffect(() => {
    const getProduto = () => {
      setProducts(produtos);
      products.map((item) => {
        if (item.id === match.params.id) {
          setProduct(item);
        }
        return [];
      });
    };
    getProduto();
  }, [produtos, products, match]); */

  return (
    <>
      <Container maxWidth="lg">
        <Topo />
        <Navbar />
        <Grid container spacing={2} diretion="row" justify="flex-start">
          <Grid item lg={1} md={1}>
            <div style={styles.marginDiv}>
              <div style={styles.foto} />
              <div style={styles.foto} />
              <div style={styles.foto} />
              <div
                style={{
                  backgroundColor: 'black',
                  width: 200,
                  height: 35,
                  marginTop: 400,
                }}
              >
                <Typography
                  variant="body2"
                  color="secondary"
                  style={{ marginLeft: '50px', paddingTop: '10px' }}
                >
                  Descrição
                </Typography>
              </div>
              <div
                style={{
                  backgroundColor: 'black',
                  width: 1240,
                  height: 350,
                }}
              >
                <div style={{ width: 1100 }}>
                  <Typography
                    variant="h6"
                    color="secondary"

                    style={{
                      paddingLeft: '50px',
                      paddingTop: '64px',
                      width: '100%',
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Mauris augue neque gravida in fermentum et
                    sollicitudin ac orci. Consectetur lorem donec massa
                    sapien faucibus et molestie ac feugiat. Aenean sed
                    adipiscing diam donec adipiscing tristique risus nec
                    feugiat. Nulla pellentesque dignissim enim sit amet
                    venenatis urna. Ac tincidunt vitae semper quis lectus
                    nulla at volutpat diam. Nec nam aliquam sem et tortor
                    consequat. Quis commodo odio aenean sed. Nunc mi ipsum
                    faucibus vitae aliquet. Vitae tortor condimentum lacinia
                    quis vel eros donec ac odio. Sit amet mattis vulputate
                    enim nulla aliquet. In dictum non consectetur a erat
                    nam.
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={4}>
            <div style={styles.quadradao1} />
          </Grid>
          <Grid item lg={1} md={1} />
          <Grid item lg={6} md={6}>
            <div style={styles.quadradao2}>
              <div style={styles.flexRow}>
                <div style={styles.promo}>
                  <Typography style={styles.promoText} variant="body1">
                    Promoção
                  </Typography>
                </div>
                <div>
                  <Typography
                    style={styles.product}
                    variant="body1"
                  >
                    ID do Produto:
                    {' '}
                    {match.params.id}
                  </Typography>
                </div>
              </div>
              <div style={{ padding: '2em 4em' }}>
                <Typography style={{ color: 'white' }} variant="h4">{product.nome}</Typography>
                <Typography
                  style={styles.price}
                  variant="h5"
                  color="primary"
                  id="price"
                >
                  {product.preco}
                </Typography>
                <ProdutoEmSi />

              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ProdutoPage;

/* id: "5eb0eb73027f1c2ae9efd09c"
nome: "gabriel kanga2"
preco: 69
quantidade: 24
tamanho: "gg"
tipo: "kangas"
__v: 0
_id: "5eb0eb73027f1c2ae9efd09c" */
