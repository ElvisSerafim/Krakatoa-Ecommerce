/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Button } from '@material-ui/core/';
import fav from '../img/favorite.svg';
import Quantity from './Quantity';
import Alerta from './Alerta';
import Estilos from '../Estilos'

const ProdutoEmSi = ({ addItem }) => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Alerta
        message="Produto adicionado!"
        vertical="top"
        horizontal="right"
        handleClose={handleClose}
        status="success"
        openAlert={open}
      />
      <div style={{...Estilos.flexColumnStandard, marginTop:40}}>
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
            <div>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: 70, width: '100%', maxHeight: '100%' }}
                onClick={() => {
                  setOpen(true);
                  addItem(quantity);
                }}
              >
                ADICIONAR AO CARRINHO
              </Button>
            </div>
            <a style={{ marginLeft: 120, height: 10 }} href="##">
              <img src={fav} alt="Favorite" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProdutoEmSi;
