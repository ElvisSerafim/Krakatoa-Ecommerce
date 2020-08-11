/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* Produto em Si */

import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Typography, Button, Paper } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import generateSafeId from 'generate-safe-id';
import produce from 'immer';
import ComboBox from '../components/ComboBox';
import Produto from '../components/Produto';
import { addCart } from '../reducers/productsCart';
import { setImage } from '../reducers/products';
import Estilos from '../Estilos';
import ProdutoMobile from '../components/ProdutoMobile';
import Quantity from '../components/Quantity';
import Alerta from '../components/Alerta';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

const styles = {
  foto: {
    borderRadius: 5,
    height: '100%',
    marginTop: 10,
    maxWidth: '100%',
  },
  quadradao1: {
    borderRadius: 10,
    height: 700,
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quadradao2: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 600,
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollbarMobile: {
    display: 'flex',
    overflowX: 'scroll',
    width: '100%',
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
    cursor: 'pointer',
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
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    minHeight: 700,
    marginTop: 40,
  },
  backgroundC: {
    backgroundColor: theme.palette.background.color,
  },
  GridContainer: {
    '@media (min-width: 954px)': {
      justifyContent: 'flex-start',
    },
  },
}));
const ProdutoPage = ({ match }) => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isCanga, setIsCanga] = useState(false);
  const [type, setType] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [size, setSize] = useState('');
  const [fotoAtual, setFotoAtual] = useState('');
  const [fotos, setFotos] = useState([]);
  const [fotosMobile, setFotosMobile] = useState([]);
  const [open, setOpen] = useState(false);
  const [statusAlerta, setStatusAlerta] = useState('error');
  const [mensagem, setMensagem] = useState('Selecione Tamanho');
  const dispatch = useDispatch();

  const produtosT = useSelector((state) => state.products.list);

  const relacionados = useCallback(() => {
    const newProdutosRelacionados = [];
    const produtosType = [];
    const produtos = JSON.parse(JSON.stringify(produtosT));
    let count = 0;
    const aux = [];
    let last;
    produtos.forEach((item, i) => {
      if (item.tipo === product.tipo) {
        const aux = JSON.parse(JSON.stringify(item));
        produtosType.push(aux);
      }
    });
    while (count < 4) {
      const index = Math.floor(Math.random() * produtosType.length);
      if (index !== type) {
        const randomItem = produtosType[index];
        if (randomItem.nome !== product.nome) {
          const teste = aux.includes(randomItem);
          if (randomItem !== last && teste === false) {
            last = randomItem;
            newProdutosRelacionados.push(randomItem);
            aux.push(randomItem);
            count += 1;
          }
        }
      }
    }
    setAllProducts(newProdutosRelacionados);
  }, [product]);

  const getProduto = (produtos) => {
    let descricaoProduto = [];
    produtos.map((item, i) => {
      if (item._id === match.params.id) {
        setType(item.tipo);
        setSizes(item.tamanho);
        if (item.imagens.length !== 0) {
          setFotoAtual(
            `https://testekrakatoa.tk/imgs/${item.categoria}/${item.imagens[0]}.jpg`,
          );
          setFotos(item.imagens);
          setFotosMobile(item.imagens);
        } else {
          setFotoAtual(item.Imageurl);
        }
        descricaoProduto = item.descricao.split('.');
        setDescricao(descricaoProduto);
        setProduct(item);

        if (item.tipo === 'cangas') setIsCanga(true);
      }
    });
  };
  useEffect(() => {
    (async () => getProduto(produtosT))();
  }, [produtosT]);

  useEffect(() => {
    if (product !== '') {
      relacionados();
    }
  }, [product]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const addItemCart = (produto, quantidade) => {
    if (size !== '') {
      const productCart = produce(produto, (newState) => {
        newState.quantidadePedido = quantidade;
        newState.tamanhoEscolhido = size;
        newState.produto_id = product._id;
        newState.cartId = generateSafeId();
        newState.ImageUrl = fotoAtual;

        if (product.tipo === 'cangas') {
          newState.peso = 250;
        }
        switch (product.categoria) {
          case 'batas':
            newState.peso = 145;
            break;
          case 'vestidos':
            newState.peso = 200;
            break;
          case 'macaquinhos':
            newState.peso = 255;
            break;
          case 'chapeus':
            newState.peso = 80;
            break;
          case 'bolsas':
            if (size === 'Pequena' || size === 'Pequeno') {
              newState.peso = 120;
            } else {
              newState.peso = 350;
            }
            break;
          case 'shorts':
            newState.peso = 80;
            break;
          default:
            break;
        }
      });
      dispatch(addCart(productCart));
      setQuantity(1);
      setSize('');
      setStatusAlerta('success');
      setMensagem('Produto Adicionado !');
      setOpen(true);
      const data = {
        id: product._id,
        img: fotoAtual,
      };
      dispatch(setImage(data));
    } else {
      setStatusAlerta('error');
      setMensagem('Selecione um tamanho !');
      setOpen(true);
    }
  };

  const classes = useStyles();

  return (
    <>
      <Grid
        container
        spacing={2}
        justify="flex-start"
        style={{ marginBottom: 64 }}
      >
        <Hidden smDown>
          <Grid item lg={1} md={1}>
            <div style={styles.marginDiv}>
              {fotos.map((item) => (
                <div style={styles.foto}>
                  {isCanga ? (
                    <img
                      src={`https://testekrakatoa.tk/imgs/${product.categoria}/${item}.jpg`}
                      style={{
                        ...styles.img,
                        transform: 'rotate(90deg)',
                      }}
                      alt="produto"
                    />
                  ) : (
                    <img
                      src={`https://testekrakatoa.tk/imgs/${product.categoria}/${item}.jpg`}
                      onClick={() => {
                        setFotoAtual(
                          `https://testekrakatoa.tk/imgs/${product.categoria}/${item}.jpg`,
                        );
                      }}
                      style={styles.img}
                      alt="produto"
                    />
                  )}
                </div>
              ))}
            </div>
          </Grid>
          <Grid item lg={4} md={4} sm={12}>
            <div
              className={classes.backgroundC}
              style={{ ...styles.quadradao1, backgroundColor: 'white' }}
            >
              {isCanga ? (
                <img
                  src={fotoAtual}
                  style={{
                    ...styles.img,
                    maxWidth: 680,
                    maxHeight: 380,
                    minWidth: 600,
                    minHeight: 300,
                    transform: 'rotate(90deg)',
                  }}
                  alt="produto"
                />
              ) : (
                <img src={fotoAtual} style={styles.img} alt="produto" />
              )}
            </div>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <div style={{ marginTop: 30 }}>
            <ProdutoMobile produto={product} imagens={fotosMobile} />
          </div>
        </Hidden>
        <Grid item lg={1} md={1} />
        <Hidden smDown>
          <Grid item lg={6} md={6}>
            <Paper
              elevation={4}
              style={{
                backgroundColor: '#D2C9C7',
                minHeight: 700,
                marginTop: 40,
              }}
            >
              <div style={styles.quad2inside}>
                <Typography
                  style={{ fontStyle: 'normal', margin: 0 }}
                  variant="h3"
                  color="secondary"
                >
                  {product.nome}
                </Typography>
                <Typography style={{ paddingTop: 30 }} variant="h4" id="price">
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
                    color="secondary"
                    value={size}
                    items={sizes}
                    label="Tamanhos"
                  />
                </div>

                <Alerta
                  message={mensagem}
                  vertical="top"
                  horizontal="right"
                  handleClose={handleClose}
                  status={statusAlerta}
                  openAlert={open}
                />
                <div style={{ ...Estilos.flexColumnStandard, marginTop: 40 }}>
                  <div style={{ paddingTop: 150 }}>
                    <div style={Estilos.flexRowStandard}>
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
                      <div style={{ ...Estilos.flexColumnCENTER }}>
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
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </Hidden>

        <Hidden mdUp>
          <Alerta
            message={mensagem}
            vertical="top"
            horizontal="right"
            handleClose={handleClose}
            status={statusAlerta}
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
            <ComboBox
              onChange={(event) => {
                setSize(event.target.value);
              }}
              style={{
                backgroundColor: 'white',
                width: '100%',
                borderRadius: 7,
              }}
              value={size}
              items={sizes}
              label="Tamanhos"
            />

            <div style={Estilos.flexRowCENTER}>
              <div style={{ marginTop: 20 }}>
                <Quantity
                  quantidade={quantity}
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
            </div>
          </div>

          <div style={Estilos.flexRowCENTER}>
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
          </div>
        </Hidden>

        <Grid item lg={12} md={12} sm={12} xs={12}>
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
              color="textSecondary"
              style={{ marginLeft: '50px', paddingTop: '10px' }}
            >
              Descrição
            </Typography>
          </div>
          <div
            className={classes.backgroundC}
            style={{
              display: 'flex',
              width: '100%',
              maxWidth: 1240,
              minHeight: 350,
            }}
          >
            <p style={{ padding: 32 }}>
              {descricao.map((item) => (
                <Typography
                  variant="h6"
                  color="textSecondary"
                  style={{
                    width: '100%',
                    fontSize: 'clamp(16px, 4vw, 22px)',
                  }}
                >
                  -{item}.
                </Typography>
              ))}
            </p>
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
          <Hidden smDown>
            {allProducts.map((value) => (
              <Grid key={value.id} item lg={3} md={4} sm={6}>
                <Produto
                  produto={value}
                  title={type}
                  addItem={(product) => {
                    setOpen(true);
                    addItemCart(product, 1);
                  }}
                />
              </Grid>
            ))}
          </Hidden>

          <Hidden lgUp>
            <div style={styles.scrollbarMobile}>
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
    </>
  );
};

export default withNav(withAnimation(ProdutoPage));
