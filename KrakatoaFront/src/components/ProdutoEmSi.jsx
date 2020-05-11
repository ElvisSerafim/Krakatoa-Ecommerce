/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Typography, Button } from '@material-ui/core/';
import Box from '@material-ui/core/Box';
import ComboBox from './ComboBox';
import ComboBoxP from './ComboBoxProduto';
import './ProdutoEmSi.css';
import fav from '../img/favorite.svg';
import Quantity from './Quantity';

const defaultProps = {
  bgcolor: '#D0D0D0',
  borderColor: '#D0D0D0',
  m: 1,
  border: 1,
  style: { width: '2rem', height: '2rem' },
};
const padrao = {};
const color1 = {
  bgcolor: 'red',
  borderColor: 'red',
  m: 1,
  border: 1,
  style: { width: '1rem', height: '1rem' },
};
const color2 = {
  bgcolor: 'white',
  borderColor: 'white',
  m: 1,
  border: 1,
  style: { width: '1rem', height: '1rem' },
};
const color3 = {
  bgcolor: 'yellow',
  borderColor: 'yellow',
  m: 1,
  border: 1,
  style: { width: '1rem', height: '1rem' },
};
const color4 = {
  bgcolor: 'orange',
  borderColor: 'orange',
  m: 1,
  border: 1,
  style: { width: '1rem', height: '1rem' },
};
const styles = {
  flexRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: '50',
    backgroundColor: 'black'
  },
  img: {
    height: 37,
  },
};


const ProdutoEmSi = ({addItem}) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');

  return (
    <>
      <div style={{ paddingTop: 80, paddingLeft: 400 }}>
        <div style={styles.flexRow}>
          <LocalShippingOutlinedIcon
            style={{ paddingTop: 10, paddingRight: 20 }}
            color="secondary"
          />
          <div>
            <a href="#" style={{ textDecoration: 'none' }}>
              <Typography variant="body1" color="secondary">
                Entrega Normal
              </Typography>
            </a>
            <Typography variant="body1" style={{ color: '#F0F0F0' }}>
              Prazo de N dias
            </Typography>
          </div>
        </div>
      </div>
      <Typography style={{ paddingLeft: 100 }} variant="h6" color="secondary">
        {' '}
        Cores:
      </Typography>
      <div style={{ paddingLeft: 95 }}>
        <div style={styles.flexRow}>
          <a href="#">
            <Box borderRadius={2} {...color1} />
          </a>

          <a href="#" style={{ textDecoration: 'none' }}>
            <Box borderRadius={2} {...color2} />
          </a>
          <a href="#" style={{ textDecoration: 'none' }}>
            <Box borderRadius={2} {...color3} />
          </a>
          <a href="#" style={{ textDecoration: 'none' }}>
            <Box borderRadius={2} {...color4} />
          </a>
        </div>
      </div>
      <div style={{ paddingTop: 54, paddingLeft: 400 }}>
        <div style={styles.flexRow}>
          <LocalShippingIcon
            style={{ paddingTop: 10, paddingRight: 20 }}
            color="secondary"
          />
          <div>
            <a href="#" style={{ textDecoration: 'none' }}>
              <Typography variant="body1" color="secondary">
                Entrega Rápida
              </Typography>
            </a>
            <Typography variant="body1" style={{ color: '#F0F0F0' }}>
              Prazo de N dias
            </Typography>
          </div>
        </div>
      </div>
      <div
        style={{
          paddingLeft: '95px',
          paddingTop: 30,
        }}
      >
        <ComboBox
          onChange={(event) => {
              setSize(event.target.value)
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
        <div style={{ paddingTop: 50 }}>
          <div style={styles.flexRow}>
            <Quantity
              onClickPlus={() => {
                var aux = quantity;
                aux++;
                setQuantity(aux);
              }}
              quantidade={quantity}
              onClickMinus={()=>{
                var aux = quantity;
                aux--;
                var comparator = aux;
                if (comparator >= 1) {
                    setQuantity(aux);
                }
              }} />
            <div className="container">
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: 70, width: '100%', maxHeight: '100%' }}
                onClick={() => {addItem(quantity) }}
              >
                ADICIONAR AO CARRINHO
              </Button>
            </div>
            <a style={{ marginLeft: 120, height: 10 }} href="##">
              <img src={fav} style={styles.img} alt="Favorite" />
            </a>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default ProdutoEmSi;