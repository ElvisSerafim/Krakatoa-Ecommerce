import React, { Component } from 'react';
import { Typography, Box } from '@material-ui/core/';
import imagem from '../img/vestido.jpg';
import './Produto.css';

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


export default class Produto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '0,00',
      promoPrice: '',
      productName: 'Vestido Verão',
      collection: ' Primavera',
      typeProduct: ''
    };
  }

  render() {
    return (
      <div
        style={{
          height: 454,
          width: 270,
        }}
      >
        <Box
          onClick={() => {}}
          fontFamily="Poppins"
          style={{ cursor: 'pointer' }}
          display="flex"
          flex="1"
          flexDirection="column"
          padding="20px"
          bgcolor="#9e9e9e"
        >
          <div style={styles.media}>
            <div className="container">
              <img src={imagem} className="image" alt="Imagem produto" />
            </div>
          </div>
          <p
            style={{
              paddingTop: 10,
              margin: 0,
              color: 'white',
              fontSize: '0.9em',
            }}
          >
            Coleção:{this.state.collection}
          </p>

          <p style={{ marginTop: 2, color: 'white', fontSize: '1.1em' }}>
            {this.state.productName}
          </p>

          <Box display="flex" flex="1" flexDirection="row">
            <p
              style={{
                margin: 0,
                color: 'white',
              }}
            >
              {this.state.price}
            </p>

            <p
              style={{
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 15,
                color: 'red',
              }}
            >
              {this.state.promoPrice}
            </p>
          </Box>
        </Box>
      </div>
    );
  }
}
