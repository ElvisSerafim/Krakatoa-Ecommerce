/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Typography, Box } from '@material-ui/core/';
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

/*
id: "5eb0eb84027f1c2ae9efd09e"
nome: "gabriel kanga4"
preco: 69
quantidade: 24
tamanho: "gg"
tipo: "kangas"
__v: 0
_id: "5eb0eb84027f1c2ae9efd09e"
 */

export default class Produto extends Component {
  constructor(props) {
    super(props);
    const { produto, title } = this.props;

    const {
      id, nome, preco, colecao,
    } = produto;
    const Imageurl = `http://localhost:4000/static/imgs/${id}.jpeg`;
    this.state = {
      preco,
      id,
      promoPrice: '',
      nome,
      colecao,
      Imageurl,
      type: title,
    };
  }

  FuncCapitalize(str) {
    str = str.split(' ');
    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(' ');
  }

  render() {
    const {
      nome,
      colecao,
      preco,
      promoPrice,
      Imageurl,
      id,
      type,
    } = this.state;
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
          height: 454,
          width: 270,
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
            <Link to={`${type}/${id}`} style={{ textDecoration: 'none' }}>
              <div className="container">
                <img src={Imageurl} className="image" alt="Imagem produto" />
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
            {this.FuncCapitalize(nome)}
          </p>

          <Box display="flex" flex="1" flexDirection="row" justifyContent="space-between">
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
                this.props.addItem(product);
              }}
            />
          </Box>
        </Box>
      </div>
    );
  }
}
