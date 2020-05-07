/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Produto from './Produto';


const Produtos = () => {

  const products = useSelector((state) => state.products)
  return (
    products && products.map((item) => (
      <Grid container justify="flex-start" spacing="2">
        {item.map((value) => (
          <Grid key={value} item lg={3}>
            <Produto produto={value} />
          </Grid>
        ))}
      </Grid>
    ))
  );
}

export default Produtos;

/* class Produtos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount(){

  }

  render() {
    const { products } = this.props;
    return products && products.map((item) => (
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
 */