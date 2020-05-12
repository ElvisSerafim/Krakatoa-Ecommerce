/* eslint-disable react/prop-types */
/* Produto em Si */

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Nav';
import ComboBox from '../components/ComboBox';
import Topo from '../components/Topo';
import ProdutoEmSi from '../components/ProdutoEmSi';
import Produto from '../components/Produto';
import Footer from '../components/Footer';
import { addCart, endAllProducts } from '../reducers/productsCart';
import api from '../Services/ApiService';

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
  quad2inside: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '2em 4em',
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
  img: {
    height: '100%',
    width: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  product: { color: 'white', fontSize: '0.7em', padding: 10 },
  num: { paddingLeft: 350, color: '#F0F0F0' },
  lore: {
    paddingTop: 30,
    paddingLeft: 90,
    color: 'white',
    fontSize: '2.25em',
    fontWeight: 'bold',
  },
};

const ProdutoPage = ({ match }) => {
  const [product, setProduct] = useState('');
  const [type, setType] = useState('');
  const [posicao, setPosicao] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [atualizar, setAtualizar] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let request = [];
    const getProducts = async () => {
      request = await api.ListaProdutos();
      setProducts(request);
      getProduto(request);
    };
    getProducts();
  }, [atualizar]);
  const url = `http://localhost:4000/static/imgs/${match.params.id}.jpeg`;
  const getProduto = (produtos) => {
    const produtosType = [];
    let tipo;
    produtos.map((item, i) => {
      if (item.id === match.params.id) {
        tipo = item.tipo;
        setPosicao(i);
        item.Imageurl = `http://localhost:4000/static/imgs/${item.id}.jpeg`;
        setProduct(item);
        setType(item.tipo);
      }
    });

    produtos.map((item, i) => {
      if (item.tipo === tipo && item.id !== match.params.id) {
        produtosType.push(item);
      }
    });

    relacionados(produtosType);
  };

  const addItemCart = (productCart, quantity) => {
    productCart.quantidade = quantity;
    console.log(productCart);
    dispatch(addCart(productCart));
  };

  const relacionados = (produtins) => {
    const newProdutosRelacionados = [];
    let count = 0;
    const aux = [];
    let last;
    while (count !== 4) {
      const index = Math.floor(Math.random() * produtins.length);
      if (index !== posicao) {
        const randomItem = produtins[index];
        const teste = aux.includes(randomItem);
        if (randomItem !== last && teste === false) {
          last = randomItem;
          newProdutosRelacionados.push(randomItem);
          aux.push(randomItem);
          count++;
        }
      }
    }
    setAllProducts(newProdutosRelacionados);
  };

  const atualiza = () => {
    if (atualizar === true) {
      setAtualizar(false);
    } else {
      setAtualizar(true);
    }
  };
  const [size, setSize] = useState('');
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
            </div>
          </Grid>
          <Grid item lg={4} md={4}>
            <div style={styles.quadradao1}>
              <img src={url} style={styles.img} alt="produto" />
            </div>
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
                  <Typography style={styles.product} variant="body1">
                    ID do Produto:
                    {' '}
                    {match.params.id}
                  </Typography>
                </div>
              </div>
              <div style={styles.quad2inside}>
                <Typography style={{ color: 'white', fontStyle: 'normal', margin: 0 }} variant="h3">
                  {product.nome}
                </Typography>
                <Typography
                  style={{ paddingTop: 30 }}
                  variant="h4"
                  color="primary"
                  id="price"
                >
                  R$
                  {' '}
                  {product.preco}
                </Typography>
                <div style={{ marginTop: 50 }}>
                  <ComboBox
                    onChange={(event) => {
                      setSize(event.target.value);
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: '150px',
                      borderRadius: 7,
                    }}
                    value={size}
                    items={['Grande', 'Médio', 'Pequeno']}
                    label="Tamanhos"
                  />
                </div>
                <div style={{ marginTop: 50 }}>
                  <ComboBox
                    onChange={(event) => {
                      setSize(event.target.value);
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: '150px',
                      borderRadius: 7,
                      marginTop: 20,
                    }}
                    value={size}
                    items={['Branco', 'Azul']}
                    label="Cores"
                  />
                </div>
                <ProdutoEmSi
                  addItem={(quantity) => {
                    addItemCart(product, quantity);
                  }}
                />
              </div>
            </div>
          </Grid>
          <Grid item lg={12} md={12}>
            <div
              style={{
                backgroundColor: 'black',
                width: 200,
                height: 35,
                marginTop: 100,
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
                width: '100%',
                maxWidth: 1240,
                height: 350,
              }}
            >
              <div style={{ maxWidth: 1100 }}>
                <Typography
                  variant="h6"
                  color="secondary"
                  style={{
                    paddingLeft: '50px',
                    paddingTop: '64px',
                    width: '100%',
                  }}
                >
                  {product.descricao}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
        <div
          style={{
            display: 'flex',
            flex: '1',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingTop: '40px',
          }}
        >
          <Typography variant="h4" color="primary">
            Produtos Relacionados
          </Typography>
        </div>

        <div style={{ paddingTop: '40px' }}>
          <Grid container justify="flex-start" spacing={2}>
            {allProducts.map((value) => (
              <Grid key={value.id} item lg={3}>
                <Produto
                  produto={value}
                  title={type}
                  update={() => {
                    atualiza();
                  }}
                  addItem={addItemCart}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default ProdutoPage;
