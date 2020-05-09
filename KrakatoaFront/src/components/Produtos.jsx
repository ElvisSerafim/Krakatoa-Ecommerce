/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Produto from './Produto';
import {addCart} from '../reducers/productsCart';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const dispatch = useDispatch();

  const addItemCart = (product) => {
    product['quantidade'] = 1;
    console.log(product);
    dispatch(addCart(product));
  }
  
  const products = useSelector((state) => state.products);
  useEffect(() => {
    setProdutos(products);   
  }, [products]);

  return (
    products.map((item) => (
      <Grid container justify="flex-start" spacing="2">
        {item.map((value) => (
          <Grid key={value} item lg={3}>
            <Produto produto={value} addItem={addItemCart}/>
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