/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import api from '../Services/ApiService';
import Estilos from '../Estilos';
import Quantity from './Quantity';

const useStyles = makeStyles((theme) => ({
  DivItem: {
    backgroundColor: theme.palette.background.color,
    display: 'flex',
    borderRadius: '4.8px',
    position: 'relative',
    marginBottom: '15px',
    width: '100%',
    minHeight: '520px',
    padding: 0,
  },

  imgDiv: {
    height: '250px',
    width: '250px',
  },
}));

const style = {
  typography: {
    color: 'white',
    fontWeight: 'bold',
  },
  typographyPrice: {
    color: 'white',
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
  const [imageUrl, setImageurl] = useState('');
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setProduct(produto);
    setPreco(produto.preco);
    setQuantity(produto.quantidade);
    setTotal(produto.preco * produto.quantidade);
    setImageurl(produto.Imageurl);
    setNome(produto.nome);
    setIndex(posicao);
  }, []);

  return (
    <>
      <div className={classes.DivItem}>
        <div style={{ padding: '0px 30px 30px 30px' }}>
          <div style={{ paddingTop: 15, color: 'white' }}>
            <div style={Estilos.flexRowSPACEBTW}>
              <Typography variant="h6">{nome}</Typography>
              <HighlightOffIcon
                style={{ height: 30, width: 30, cursor: 'pointer' }}
                onClick={() => {
                  removerItem(product);
                }}
              />
            </div>
          </div>
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
                  height: '290px',
                  width: '250px',
                  borderRadius: '5px',
                  objectFit: 'cover',
                }}
                alt="produto"
                src={imageUrl}
                onClick={() => {
                  removerItem(product);
                }}
              />
            </Grid>
          </Grid>
          <div style={{ paddingTop: 10 }}>
            <Typography style={style.typography}>Tamanho: GG</Typography>
            <Typography style={style.typography}>Cor: Azul</Typography>
            <Typography style={style.typography}>Preço: R$ {preco}</Typography>
          </div>
          <div style={{ paddingTop: 15 }}>
            <div style={Estilos.flexRowSPACEBTW}>
              <Quantity
                onClickPlus={() => {
                  let aux = quantity;
                  aux++;
                  setQuantity(aux);
                  setTotal(preco * aux);
                  aumentarQuantia(index);
                }}
                onClickMinus={() => {
                  let aux = quantity;
                  aux--;
                  const comparator = aux;
                  if (comparator >= 1) {
                    setQuantity(aux);
                    setTotal(preco * aux);
                    diminuirQuantia(index);
                  }
                }}
                quantidade={quantity}
              />
              <div style={Estilos.flexRowCENTER}>
                <Typography style={style.typographyPrice}>
                  R$ {total}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemMobile;
