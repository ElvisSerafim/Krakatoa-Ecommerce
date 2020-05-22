/* eslint-disable react/prop-types */
/* Produto em Si */

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Nav';
import ComboBox from '../components/ComboBox';
import Topo from '../components/Topo';
import ProdutoEmSi from '../components/ProdutoEmSi';
import Produto from '../components/Produto';
import Footer from '../components/Footer';
import { addCart, sendAllProducts } from '../reducers/productsCart';
import api from '../Services/ApiService';
import Estilos from '../Estilos';

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

  img: {
    height: '100%',
    width: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
    cursor: 'pointer'
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

const useStyles = makeStyles({
  GridContainer: {
    '@media (min-width: 954px)': {
      justifyContent: 'flex-start',
    },
  },
});

const ProdutoPage = ({ match }) => {
  const [product, setProduct] = useState('');
  const [type, setType] = useState('');
  const [posicao, setPosicao] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [atualizar, setAtualizar] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState([]);
  const [colors, setColors] = useState([]);
  const [products, setProducts] = useState([]);
  const [fotoAtual, setFotoAtual] = useState('');
  const [fotos, setFotos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let request = [];
    const getProducts = async () => {
      request = await api.ListaProdutos();
      setProducts(request);
      await getProduto(request);
    };
    getProducts();
  }, [atualizar]);

  const getProduto = (produtos) => {
    const produtosType = [];
    let tipo;
    produtos.map((item, i) => {
      if (item.id === match.params.id) {
        tipo = item.tipo;
        console.log(item);
        setSizes(item.tamanho);
        setColors(item.cores);
        setPosicao(i);
        if (item.imagens.length != 0) {
          item.Imageurl = `http://localhost:4000/static/imgs/${item.imagens[0]}.jpeg`;
          setFotoAtual(`http://localhost:4000/static/imgs/${item.imagens[0]}.jpeg`);
          setFotos(item.imagens);
        } else {
          item.Imageurl = `http://localhost:4000/static/imgs/${item.id}.jpeg`;
          setFotoAtual(item.Imageurl);
        }
        setProduct(item);
        setType(item.tipo);
      }
    });

    produtos.map((item) => {
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

  const classes = useStyles();

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
      <Container maxWidth="lg" style={{ marginBottom: 64 }}>
        <Topo />
        <Navbar />
        <Grid container spacing={2} diretion="row" justify="flex-start">
          <Grid item lg={1} md={1}>
            <div style={styles.marginDiv}>
              {fotos.map((item) => (
                <div style={styles.foto}>
                  <img
                    src={`http://localhost:4000/static/imgs/${item}.jpeg`}
                    onClick={(event)=>{
                      setFotoAtual(`http://localhost:4000/static/imgs/${item}.jpeg`);
                    }} 
                    style={styles.img} alt="produto" />
                </div>
              ))}
            </div>
          </Grid>
          <Grid item lg={4} md={4}>
            <div style={styles.quadradao1}>
              <img src={fotoAtual} style={styles.img} alt="produto" />
            </div>
          </Grid>
          <Grid item lg={1} md={1} />
          <Grid item lg={6} md={6}>
            <div style={styles.quadradao2}>
              <div
                style={{
                  ...Estilos.flexRowStandard,
                  flexDirection: 'row',
                  paddingBottom: '50',
                  justifyContent: 'space-between',
                }}
              >
                <div style={styles.promo}>
                  <Typography style={styles.promoText} variant="body1">
                    Promoção
                  </Typography>
                </div>
                <div>
                  <Typography style={styles.product} variant="body1">
                    ID do Produto: {match.params.id}
                  </Typography>
                </div>
              </div>
              <div style={styles.quad2inside}>
                <Typography
                  style={{ fontStyle: 'normal', margin: 0 }}
                  color="secondary"
                  variant="h3"
                >
                  {product.nome}
                </Typography>
                <Typography
                  style={{ paddingTop: 30 }}
                  variant="h4"
                  color="primary"
                  id="price"
                >
                  R$ {product.preco}
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
                    items={sizes}
                    label="Tamanhos"
                  />
                </div>
                <div style={{ marginTop: 50 }}>
                  <ComboBox
                    onChange={(event) => {
                      setColor(event.target.value);
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: '150px',
                      borderRadius: 7,
                      marginTop: 20,
                    }}
                    value={color}
                    items={colors}
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
            ...Estilos.flexRowStandard,
            paddingBottom: '40x',
            justifyContent: 'flex-start',
          }}
        >
          <Typography variant="h4" color="primary" style={{ marginTop: 64 }}>
            Produtos Relacionados
          </Typography>
        </div>

        <div style={{ paddingTop: '40px' }}>
          <Grid
            container
            justify="space-around"
            spacing={2}
            className={classes.GridContainer}
          >
            {allProducts.map((value) => (
              <Grid key={value.id} item lg={3} md={4} sm={6}>
                <Produto
                  produto={value}
                  title={type}
                  update={() => {
                    atualiza();
                  }}
                  addItem={(product) => {
                    addItemCart(product, 1);
                  }}
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
