import React, { Component } from 'react';
import { Typography, Box } from '@material-ui/core/';
import imagem from '../img/vestido.jpg';

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

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '0,00',
      promoPrice: '',
      productName: 'Vestido Verão',
      collection: ' Primavera',
    };
  }

  render() {
    return (
      <div
        style={{
          height: '373px',
          width: 200,
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
            <div style={styles.imagemContainer}>
              <img src={imagem} style={{ maxHeight: '100%', width: '150px' }} alt="Imagem produto" />
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
