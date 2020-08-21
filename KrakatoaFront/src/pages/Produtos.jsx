/* eslint-disable react/prop-types */
/* Vestidos,Batas,Shorts,Kangas */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core/';
import { useSpring, animated } from 'react-spring';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';
import LoadingComp from '../components/Loading';

const ListaProdutos = lazy(() => import('../components/Produtos'));

const Produtos = ({ categoria, tipo }) => {
  const [product, setProduct] = useState([]);
  const search = useSelector((state) => state.pesquisaBarra);
  const stateProducts = useSelector((state) => state.products);
  const { list, loading } = stateProducts;
  useEffect(() => {
    const getProducts = async () => {
      if (tipo === 'pesquisa') {
        setProduct([]);
        const arrayPesquisa = search.pesquisa.split(' ');
        const arrayAux = [];
        if (arrayPesquisa.length === 1) {
          list.forEach((itemI) => {
            if (
              itemI.nome.toUpperCase().includes(arrayPesquisa[0].toUpperCase())
            ) {
              arrayAux.push(itemI);
            }
          });
          setProduct(arrayAux);
        } else {
          list.forEach((itemI) => {
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
        const ProdutosCategoria = list.filter(
          (produto) =>
            produto.categoria.toUpperCase() === categoria.toUpperCase(),
        );
        setProduct(ProdutosCategoria);
      } else {
        const arrayAuxProdutos = [];
        list.forEach((produto) => {
          if (produto.tipo === tipo) {
            arrayAuxProdutos.push(produto);
          }
        });
        setProduct(arrayAuxProdutos);
      }
    };
    getProducts();
  }, [loading === true, tipo, categoria, search, list]);

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
        <animated.div
          style={{
            opacity: o.interpolate([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1]),
          }}
        >
          <Suspense fallback={LoadingComp}>
            <ListaProdutos products={product} name={tipo} title={categoria} />
          </Suspense>
        </animated.div>
      </Box>
    </>
  );
};
export default withNav(withAnimation(Produtos));
