/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Produto from './Produto';
import { addCart } from '../reducers/productsCart';

const Produtos = ({ title }) => {
  const dispatch = useDispatch();
  const addItemCart = (productCart) => {
    console.log(productCart);
    dispatch(addCart(productCart));
  };
  const lower = title.toLowerCase();
  const products = useSelector((state) => state.products);
  return (
    products && products.map((item) => (
      <Grid container justify="flex-start" spacing="2">
        {item.map((value) => (
          <Grid key={value.id} item lg={3}>
            <Link to={`${lower}/${value.id}`} style={{ textDecoration: 'none' }}>
              <Produto produto={value} addItem={addItemCart} />
            </Link>
          </Grid>
        ))}
      </Grid>
    ))
  );
};

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
