/* eslint-disable react/prop-types */
/* Vestidos,Batas,Shorts,Kangas */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { updateProducts } from '../reducers/products';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import ProductList from '../components/Produtos';
import Footer from '../components/Footer';
import api from '../Services/ApiService';
import Alerta from '../components/Alerta';

const useStyles = makeStyles((theme) => ({
  margin: theme.spacing(2),
}));

const Produtos = ({ title, name }) => {
  const [product, setProduct] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState('');
  const search = useSelector((state) => state.pesquisaBarra);

  useEffect(() => {
    setNome(name);
    const getProducts = async () => {
      const data = {
        tipo: name,
        chave: '',
      };

      const request = await api.GetProdutos(data);

      const a = [request];
      console.log(a);
      if (name === 'pesquisa') {
        setProduct([[]]);
        const arrayPesquisa = search.split(' ');
        const arrayAux = [];

        if (arrayPesquisa.length === 1) {
          request.forEach((itemI, i) => {
            if (
              itemI.nome.toUpperCase().includes(arrayPesquisa[0].toUpperCase())
            ) {
              console.log(itemI);
              arrayAux.push(itemI);
            }
          });
          setProduct([arrayAux]);
        } else {
          request.forEach((itemI, i) => {
            let verifica = true;
            arrayPesquisa.forEach((item, index) => {
              if (itemI.nome.toUpperCase().includes(item.toUpperCase())) {
              } else {
                verifica = false;
              }
            });

            if (verifica === true) {
              arrayAux.push(itemI);
            }
          });

          setProduct([arrayAux]);
        }
      } else {
        setProduct(a);
      }
    };

    getProducts();
  }, [name, title, search]);
  const dispatch = useDispatch();
  dispatch(updateProducts(product));

  const abrir = () => {};
  const fechar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        marginBottom="64px"
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
          <div className={classes.margin}>
            <ProductList
              alert={() => {
                setOpen(true);
              }}
              products={product}
              name={name}
              title={title}
            />
          </div>
        </Container>
      </Box>
      <Footer />
    </>
  );
};
export default Produtos;
