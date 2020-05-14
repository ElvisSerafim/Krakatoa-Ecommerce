/* eslint-disable react/prop-types */
/* Vestidos,Batas,Shorts,Kangas */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const [nome, setNome] = useState('');
  const search = useSelector((state) => state.pesquisaBarra);
  console.log(search);
  useEffect(() => {

    setNome(name);
    const getProducts = async () => {
      const data = {
        tipo: name,
        chave: '',
      };

      const request = await api.GetProdutos(data);

      const a = [request];
      if (name === 'pesquisa') {
        setProduct([[]]);
        let arrayPesquisa = search.split(' ');
        let arrayAux = [];

        if (arrayPesquisa.length === 1) {

          request.forEach((itemI, i) => {

            if (itemI.nome.toUpperCase().includes(arrayPesquisa[0].toUpperCase())) {
              console.log(itemI);
              arrayAux.push(itemI);
            }

          })
          setProduct([arrayAux]);

        } else {

          arrayPesquisa.forEach((item, index) => {
       
            request.forEach((itemI, i) => {

              if (itemI.nome.toUpperCase().includes(item.toUpperCase())) {
                console.log('Encontrei');
                console.log(itemI);
                arrayAux.push(itemI);
              }

            })

          })

          setProduct([arrayAux]);

        }

      }

      else {

        setProduct(a);
      }

    };


    getProducts();
  }, [name, title, search]);
  const dispatch = useDispatch();
  dispatch(updateProducts(product));

  const abrir = () => { };
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
