/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Box, Paper } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Quantity from './Quantity';

const useStyles = makeStyles(() => ({
  DivItem: {
    display: 'flex',
    borderRadius: '4.8px',
    position: 'relative',
    marginBottom: '15px',
    width: '100%',
    minHeight: '600px',
    padding: 0,
    justifyContent: 'center',
  },

  imgDiv: {
    height: '250px',
    width: '250px',
  },
}));

const style = {
  typography: {
    fontWeight: 'bold',
  },
  typographyPrice: {
    fontWeight: 'bold',
    fontSize: 20,
  },
};

const ItemMobile = ({
  produto,
  removerItem,
  posicao,
  diminuirQuantia,
  aumentarQuantia,
}) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [preco, setPreco] = useState(0);
  const [product, setProduct] = useState('');
  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [ImageUrl, setImageurl] = useState('');
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setProduct(produto);
    setTamanho(produto.tamanhoEscolhido);
    setPreco(produto.preco);
    setQuantity(produto.quantidadePedido);
    setTotal(produto.preco * produto.quantidadePedido);
    setImageurl(produto.ImageUrl);
    setNome(produto.nome);
    setIndex(posicao);
  }, []);

  return (
    <>
      <Grid
        item
        lg={12}
        md={12}
        sm={6}
        xm={12}
        container
        className={classes.DivItem}
      >
        <Paper
          elevation={4}
          style={{ width: '100%', padding: 16, backgroundColor: '#44323D' }}
        >
          <Box
            flex
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              display: 'flex',
              width: '100%',
              height: '100%',
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" color="textSecondary">
                {nome}
              </Typography>
              <HighlightOffIcon
                style={{
                  height: 30,
                  width: 30,
                  cursor: 'pointer',
                  color: 'white',
                }}
                onClick={() => {
                  removerItem(product);
                }}
              />
            </Box>

            <Grid
              justify="space-around"
              container
              direction="row"
              item
              style={{ paddingTop: 15 }}
            >
              <Grid item lg={6} md={3} sm={12}>
                <img
                  style={{
                    height: '300px',
                    width: '250px',
                    objectFit: 'cover',
                    objectPosition: 'top',
                  }}
                  alt="produto"
                  src={ImageUrl}
                />
              </Grid>
            </Grid>
            <Box
              display="flex"
              justifyContent="space-around"
              style={{ paddingTop: 10 }}
            >
              <Typography color="textSecondary" style={style.typography}>
                Tamanho: {tamanho}{' '}
              </Typography>
              <Typography color="textSecondary" style={style.typography}>
                Preço: R$ {`${preco},00`}
              </Typography>
            </Box>

            <Grid
              container
              justify="center"
              sitem
              lg={12}
              md={12}
              sm={12}
              xm={12}
            >
              <Grid
                item
                md={12}
                sm={12}
                xm={12}
                style={{ justifyContent: 'center' }}
              >
                <Quantity
                  onClickPlus={() => {
                    let aux = quantity;
                    aux += 1;
                    setQuantity(aux);
                    setTotal(preco * aux);
                    aumentarQuantia(index);
                  }}
                  onClickMinus={() => {
                    let aux = quantity;
                    aux -= 1;
                    const comparator = aux;
                    if (comparator >= 1) {
                      setQuantity(aux);
                      setTotal(preco * aux);
                      diminuirQuantia(index);
                    }
                  }}
                  quantidade={quantity}
                />
              </Grid>
            </Grid>
            <Grid item md={12} xm={12} sm={12}>
              <Typography
                color="textSecondary"
                style={{ textAlign: 'center', ...style.typographyPrice }}
              >
                Total R$ {`${total},00`}
              </Typography>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default ItemMobile;
