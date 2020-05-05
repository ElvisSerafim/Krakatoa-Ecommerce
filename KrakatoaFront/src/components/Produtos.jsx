import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Product from './Produto';

export default class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }

  componentWillMount() {
    this.setState({ product: this.props.products });
  }

  render() {
    const { product } = this.state;
    return this.props.products.map((item) => (
      <Grid container justify="flex-start" spacing="2">
        {item.map((value) => (
          <Grid key={value} item lg={3}>
            <Product />
          </Grid>
        ))}
      </Grid>
    ));
  }
}
