//@ts-nocheck
/* Produto em Si */

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Box } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Navbar from '../components/Nav';
import ComboBox from '../components/ComboBox';
import Topo from '../components/Topo';
import Produto from '../components/Produto';
import Footer from '../components/Footer';
import { addCart } from '../reducers/productsCart';
//@ts-ignore
import api from '../Services/ApiService';
import Estilos from '../Estilos';
//@ts-ignore
import fav from '../img/favorite.svg';
import { ProdutoTipo } from '../Services/dto/produto.dto';
import ProdutoMobile from '../components/ProdutoMobile';
import Quantity from '../components/Quantity';
import Alerta from '../components/Alerta';
import { RouteComponentProps, match } from 'react-router';

const styles = {
  foto: {
    borderRadius: 5,
    height: 122,
    marginTop: 10,
    maxWidth: 116,
  },
  quadradao1: {
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
  },
  marginDiv: {
    marginTop: 40,
  },

  promoText: {
    color: 'white',
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

const useStyles = makeStyles((theme) => ({
  quadradao2: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 10,
    height: 600,
    marginTop: 40,
  },
  backgroundC: {
    backgroundColor: theme.palette.common.white,
  },
  GridContainer: {
    '@media (min-width: 954px)': {
      justifyContent: 'flex-start',
    },
  },
  scrollbarMobile: {
    display: 'flex',
    overflowX: 'scroll',
    width: '100%',
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  promo: {
    backgroundColor: 'red',
    borderRadius: '10px 0px 20px 0px',
    height: 33,
    width: '150px',
    padding: '3px',
    textAlign: 'center',
  },
}));



const ProdutoPage:React.FunctionComponent<RouteComponentProps> = ({ match }) => {
  const [product, setProduct] = useState<ProdutoTipo>();
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState('');
  const [posicao, setPosicao] = useState();
  const [allProducts, setAllProducts] = useState<ProdutoTipo[]>();
  const [atualizar, setAtualizar] = useState(false);
  const [sizes, setSizes] = useState<ProdutoTipo['tamanho']>();
  const [color, setColor] = useState<ProdutoTipo['cores']>();
  const [colors, setColors] = useState<ProdutoTipo['cores']>();
  const [, setProducts] = useState([]);
  const [fotoAtual, setFotoAtual] = useState('');
  const [fotos, setFotos] = useState<ProdutoTipo['imagens']>();
  const [fotosMobile, setFotosMobile] = useState<ProdutoTipo['imagens']>();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let request: ProdutoTipo[] = [];
    const getProducts = async () => {
      request = await api.ListaProdutos();
      setProducts(request);
      await getProduto(request);
    };
    getProducts();
  }, [atualizar]);

  const handleClose = (event: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const getProduto = (produtos: ProdutoTipo[]) => {
    const produtosType = [];
    let tipo: string;
    produtos.map((item, i) => {
      //@ts-ignore
      if (item.id === match.params.id) {
        tipo = item.tipo;
        setSizes(item.tamanho);
        setColors(item.cores);
        //@ts-ignore
        setPosicao(i);
        if (item.imagens.length != 0) {
          item.Imageurl = `http://64.227.106.165/imgs/${tipo}/${item.imagens[0]}.jpg`;
          setFotoAtual(
            `http://64.227.106.165/imgs/${tipo}/${item.imagens[0]}.jpg`
          );
          setFotos(item.imagens);
          setFotosMobile(item.imagens);
        } else {
          item.Imageurl = `http://64.227.106.165/imgs/${item.id}.jpg`;
          setFotoAtual(item.Imageurl);
        }
        setProduct(item);
        setType(item.tipo);
      }
    });

    produtos.map((item) => {
      //@ts-ignore
      if (item.tipo === tipo && item.id !== match.params.id) {
        produtosType.push(item);
      }
    });

    relacionados(produtosType);
  };

  const addItemCart = (productCart, quantity: number) => {
    productCart.quantidade = quantity;
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
      <Topo />
      <Navbar />
      <Container maxWidth="lg" style={{ marginBottom: 64 }}>
        <Grid container spacing={2} justify="flex-start">
          <Hidden smDown>
            <Grid item lg={1} md={1}>
              <div style={styles.marginDiv}>
                {fotos.map((item) => (
                  <div style={styles.foto}>
                    {
                      //@ts-ignore
                    }
                    <img
                      src={`http://64.227.106.165/imgs/${product.tipo}/${item}.jpg`}
                      onClick={() => {
                        setFotoAtual(
                          `http://64.227.106.165/imgs/${product.tipo}/${item}.jpg`
                        );
                      }}
                      className={classes.img}
                      alt="produto"
                    />
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item lg={4} md={4}>
              <div className={classes.backgroundC} style={styles.quadradao1}>
                {
                  //@ts-ignore
                }
                <img src={fotoAtual} className={classes.img} alt="produto" />
              </div>
            </Grid>
          </Hidden>
          <Hidden lgUp>
            <div style={{ marginTop: 30 }}>
              <ProdutoMobile produto={product} imagens={fotosMobile} />
            </div>
          </Hidden>
          <Grid item lg={1} md={1} />
          <Hidden smDown>
            <Grid item lg={6} md={6}>
              <div className={classes.quadradao2}>
                <Box
                  //@ts-ignore
                  justifyContent="space-between"
                  style={{
                    paddingBottom: '50',
                  }}
                >
                  <div className={classes.promo}>
                    <Typography style={styles.promoText} variant="body1">
                      Promoção
                    </Typography>
                  </div>
                  <Box>
                    <Typography style={styles.product} variant="body1">
                      ID do Produto: {//@ts-ignore 
                      match.params.id}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  flexDirection="column"
                  justifyContent="space-between"
                  style={{ padding: '2em 4em' }}
                >
                  <Typography
                    style={{ fontStyle: 'normal', margin: 0 }}
                    color="secondary"
                    variant="h3"
                  >
                    {product.nome}
                  </Typography>
                  <Typography
                    style={{ paddingTop: 30, color: 'red' }}
                    variant="h4"
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
                      value={[size]}
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

                  <Alerta
                    message="Produto adicionado!"
                    vertical="top"
                    horizontal="right"
                    handleClose={handleClose}
                    status="success"
                    openAlert={open}
                  />
                  <Box flexDirection="column" style={{ marginTop: 40 }}>
                    <div style={{ paddingTop: 150 }}>
                      <Box>
                        <Quantity
                          onClickPlus={() => {
                            let aux = quantity;
                            aux++;
                            setQuantity(aux);
                          }}
                          quantidade={quantity}
                          onClickMinus={() => {
                            let aux = quantity;
                            aux--;
                            const comparator = aux;
                            if (comparator >= 1) {
                              setQuantity(aux);
                            }
                          }}
                        />
                        <div>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{
                              marginLeft: 70,
                              width: '100%',
                              maxHeight: '100%',
                            }}
                            onClick={() => {
                              setOpen(true);
                              addItemCart(product, quantity);
                            }}
                          >
                            ADICIONAR AO CARRINHO
                          </Button>
                        </div>
                        <a style={{ marginLeft: 120, height: 10 }} href="##">
                          <img src={fav} alt="Favorite" />
                        </a>
                      </Box>
                    </div>
                  </Box>
                </Box>
              </div>
            </Grid>
          </Hidden>

          <Hidden lgUp>
            <Alerta
              message="Produto adicionado!"
              vertical="top"
              horizontal="right"
              handleClose={handleClose}
              status="success"
              openAlert={open}
            />
            <div
              style={{
                marginTop: 50,
                width: '100%',
                backgroundColor: '#44323D',
                padding: 10,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <ComboBox
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: '150px',
                    borderRadius: 7,
                  }}
                  value={[size]}
                  items={sizes}
                  label="Tamanhos"
                />

                <ComboBox
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: '150px',
                    borderRadius: 7,
                  }}
                  value={color}
                  items={colors}
                  label="Cores"
                />
              </div>

              <Box justifyContent="center" alignItems="center">
                <div style={{ marginTop: 20 }}>
                  <Quantity
                    onClickPlus={() => {
                      let aux = quantity;
                      aux++;
                      setQuantity(aux);
                    }}
                    quantidade={quantity}
                    onClickMinus={() => {
                      let aux = quantity;
                      aux--;
                      const comparator = aux;
                      if (comparator >= 1) {
                        setQuantity(aux);
                      }
                    }}
                  />
                </div>
              </Box>
            </div>

            <Box justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                style={{ width: '100%', maxHeight: '100%' }}
                onClick={() => {
                  setOpen(true);
                  addItemCart(product, quantity);
                }}
              >
                ADICIONAR AO CARRINHO
              </Button>
            </Box>
          </Hidden>

          <Grid item lg={12} md={12}>
            <div
              className={classes.backgroundC}
              style={{
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
              className={classes.backgroundC}
              style={{
                width: '100%',
                maxWidth: 1240,
                height: 350,
              }}
            >
              <Typography
                variant="h6"
                color="secondary"
                style={{
                  paddingTop: '64px',
                  width: '100%',
                  fontSize: 'clamp(16px, 4vw, 22px)',
                  marginLeft: 5,
                }}
              >
                {product.descricao}
                <br />
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Box
          justifyContent="flex-start"
          style={{
            paddingBottom: '40x',
          }}
        >
          <Typography variant="h4" color="primary" style={{ marginTop: 64 }}>
            Produtos Relacionados
          </Typography>
        </Box>

        <div style={{ paddingTop: '40px' }}>
          <Grid
            container
            justify="space-around"
            spacing={2}
            className={classes.GridContainer}
          >
            <Hidden smDown>
              {allProducts.map((value) => (
                <Grid key={value.id} item lg={3} md={4} sm={6}>
                  <Produto
                    produto={value}
                    title={type}
                    update={() => {
                      atualiza();
                    }}
                    addItem={(product) => {
                      setOpen(true);
                      addItemCart(product, 1);
                    }}
                  />
                </Grid>
              ))}
            </Hidden>

            <Hidden lgUp>
              <div
                className={classes.scrollbarMobile}
              >
                {allProducts.map((value) => (
                  <Grid
                    key={value.id}
                    item
                    lg={3}
                    md={4}
                    sm={6}
                    style={{ marginLeft: 10 }}
                  >
                    <Produto
                      produto={value}
                      title={type}
                      update={() => {
                        atualiza();
                      }}
                      addItem={(product) => {
                        setOpen(true);
                        addItemCart(product, 1);
                      }}
                    />
                  </Grid>
                ))}
              </div>
            </Hidden>
          </Grid>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default ProdutoPage;
