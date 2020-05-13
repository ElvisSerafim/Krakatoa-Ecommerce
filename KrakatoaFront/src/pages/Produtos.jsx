/* eslint-disable react/prop-types */
/* Vestidos,Batas,Shorts,Kangas */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography } from '@material-ui/core/';
import { updateProducts } from '../reducers/products';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import ProductList from '../components/Produtos';
import Paginator from '../components/Paginator';
import Footer from '../components/Footer';
import api from '../Services/ApiService';
import Alerta from '../components/Alerta';

const Produtos = ({ title, name }) => {
  const [product, setProduct] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      const data = {
        tipo: name,
        chave: '',
      };

      const request = await api.GetProdutos(data);

      const a = [request];
      setProduct(a);
    };

    getProducts();
  }, []);
  const dispatch = useDispatch();
  dispatch(updateProducts(product));

  const abrir = () => {};
  const fechar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <flexbox
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <Alerta
            message="Produto adicionado"
            vertical="top"
            horizontal="right"
            status="success"
            handleClose={fechar}
            openAlert={open}
          />
          <Typography variant="h2" color="primary">
            {title}
          </Typography>
          <ProductList
            alert={() => {
              setOpen(true);
            }}
            products={product}
            name={name}
            title={title}
          />
          <div style={{ marginTop: '50px' }}>
            <Paginator />
          </div>
        </Container>
        <Footer />
      </flexbox>
    </>
  );
};
export default Produtos;
