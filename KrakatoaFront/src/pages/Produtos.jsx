/* eslint-disable react/prop-types */
/* Vestidos,Batas,Shorts,Kangas */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';
import { updateProducts } from '../reducers/products';
import ProductList from '../components/Produtos';
import api from '../Services/ApiService';
import Alerta from '../components/Alerta';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

const useStyles = makeStyles((theme) => ({
  margin: theme.spacing(2),
}));

const Produtos = ({ categoria, tipo }) => {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const search = useSelector((state) => state.pesquisaBarra);
  const request = useSelector((state) => state.products.list);
  useEffect(() => {
    const getProducts = async () => {
      if (tipo === 'pesquisa') {
        setProduct([]);
        const arrayPesquisa = search.pesquisa.split(' ');
        const arrayAux = [];
        if (arrayPesquisa.length === 1) {
          request.forEach((itemI) => {
            if (
              itemI.nome.toUpperCase().includes(arrayPesquisa[0].toUpperCase())
            ) {
              arrayAux.push(itemI);
            }
          });
          setProduct(arrayAux);
        } else {
          request.forEach((itemI) => {
            let verifica = true;
            arrayPesquisa.forEach((item) => {
              if (!itemI.nome.toUpperCase().includes(item.toUpperCase())) {
                verifica = false;
              }
            });

            if (verifica === true) {
              arrayAux.push(itemI);
            }
          });

          setProduct(arrayAux);
        }
      } else if (categoria.toUpperCase() !== tipo.toUpperCase()) {
        const ProdutosCategoria = request.filter(
          (produto) => produto.categoria.toUpperCase() === categoria.toUpperCase(),
        );
        setProduct(ProdutosCategoria);
      } else {
        const arrayAuxProdutos = [];
        request.forEach((produto) => {
          if (produto.tipo === tipo) {
            arrayAuxProdutos.push(produto);
          }
        });
        setProduct(arrayAuxProdutos);
      }
    };

    getProducts();
  }, [tipo, categoria, search]);

  const fechar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const classes = useStyles();
  const { o } = useSpring({
    from: { o: 0 },
  });

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        marginBottom="64px"
        style={{ minHeight: 500 }}
      >
        <Alerta
          message="Produto adicionado"
          vertical="top"
          horizontal="right"
          status="success"
          handleClose={fechar}
          openAlert={open}
        />

        <animated.div
          style={{
            opacity: o.interpolate([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1]),
          }}
          className={classes.margin}
        >
          <ProductList
            alert={() => {
              setOpen(true);
            }}
            products={product}
            name={tipo}
            title={categoria}
          />
        </animated.div>
      </Box>
    </>
  );
};
export default withNav(withAnimation(Produtos));
