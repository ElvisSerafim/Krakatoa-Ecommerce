/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Produto from './Produto';

class Produtos extends Component {
  render() {
    const { products } = this.props;
    return products.map((item) => (
      <Grid container justify="flex-start" spacing="2">
        {item.map((value) => (
          <Grid key={value} item lg={3}>
            <Produto produto={value} />
          </Grid>
        ))}
      </Grid>
    ));
  }
}
export default Produtos;
