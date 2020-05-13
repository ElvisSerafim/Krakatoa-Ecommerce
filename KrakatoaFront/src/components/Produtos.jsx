/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Produto from './Produto';
import { addCart } from '../reducers/productsCart';

const Produtos = ({ title, alert }) => {
  const [produtos, setProdutos] = useState([]);
  const dispatch = useDispatch();

  const addItemCart = (productCart) => {
    productCart.quantidade = 1;
    console.log(productCart);
    dispatch(addCart(productCart));
    alert();
  };
  const lower = title.toLowerCase();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    setProdutos(products);
  }, [products]);

  return (
    products.map((item) => (
      <Grid container justify="flex-start" spacing={2}>
        {item.map((value) => (
          <Grid key={value.id} item lg={3}>
            <Produto produto={value} update={()=>{}} title={lower} addItem={addItemCart} />
          </Grid>
        ))}
      </Grid>
    ))
  );
};

export default Produtos;