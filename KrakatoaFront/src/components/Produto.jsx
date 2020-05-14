/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import './Produto.css';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const styles = {
  media: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagemContainer: {
    height: '200px',
    width: '150px',
    margin: 0,
  },
};

const Produto = ({ produto, title, addItem, update }) => {
  const { id, nome, preco, colecao } = produto;
  const [promoPrice, setpromoPrice] = useState('');
  const [Imageurl, setImageurl] = useState('');
  const [type, setType] = useState(title);

  useEffect(() => {
    setImageurl(`http://localhost:4000/static/imgs/${id}.jpeg`);
  }, []);
  const FuncCapitalize = (str) => {
    str = str.split(' ');
    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(' ');
  };
  const product = {
    nome,
    colecao,
    preco,
    promoPrice,
    Imageurl,
  };
  return (
    <div
      style={{
        maxHeight: 454,
        maxWidth: 270,
      }}
    >
      <Box
        fontFamily="Poppins"
        style={{ cursor: 'pointer' }}
        display="flex"
        flex="1"
        flexDirection="column"
        padding="20px"
        bgcolor="#9e9e9e"
      >
        <div style={styles.media}>
          <Link to={`/${type}/${id}`} style={{ textDecoration: 'none' }}>
            <div className="container">
              <img
                src={Imageurl}
                onClick={() => {
                  update();
                }}
                className="image"
                alt="Imagem produto"
              />
            </div>
          </Link>
        </div>
        <p
          style={{
            paddingTop: 10,
            margin: 0,
            color: 'white',
            fontSize: '0.9em',
          }}
        >
          {colecao}
        </p>

        <p style={{ marginTop: 2, color: 'white', fontSize: '1.1em' }}>
          {FuncCapitalize(nome)}
        </p>

        <Box
          display="flex"
          flex="1"
          flexDirection="row"
          justifyContent="space-between"
        >
          <p
            style={{
              margin: 0,
              color: 'white',
            }}
          >
            {preco}
          </p>

          <p
            style={{
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 15,
              color: 'red',
            }}
          >
            {promoPrice}
          </p>
          <AddShoppingCartIcon
            style={{ color: 'white' }}
            onClick={() => {
              addItem(product);
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Produto;
