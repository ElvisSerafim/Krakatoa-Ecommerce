import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { produce } from 'immer';
import {
  productsUpdate,
  removerCart,
  removeprodutosCart,
} from '../reducers/productsCart';
import ItemMobile from './ItemMobile';
import { Grid } from '@material-ui/core';

const ListItem = ({ atualizarTotal }) => {
  const [total, setTotal] = useState(0);
  const produtosCart = useSelector((state) => state.productsCart);
  const dispatch = useDispatch();

  useEffect(() => {
    let aux = 0;
    produtosCart.map((item, i) => {
      aux += item.preco * item.quantidadePedido;
    });
    setTotal(aux);
    atualizarTotal(aux);
  }, []);

  const removerProduct = (produto) => {
    dispatch(removerCart(produto));
  };

  const updateTotal = (index) => {
    const aux = total + produtosCart[index].preco;
    setTotal(aux);
    atualizarTotal(aux);
    const produtosCarrinho = produce(produtosCart, (newState) => newState);
    const produtoAtualizado = produce(produtosCarrinho[index], (newState) => {
      newState.quantidadePedido += 1;
    });
    dispatch(productsUpdate(produtoAtualizado));
  };

  const updateSubTotal = (index) => {
    const aux = total - produtosCart[index].preco;
    setTotal(aux);
    atualizarTotal(aux);
    const produtosCarrinho = produce(produtosCart, (newState) => newState);
    const produtoAtualizado = produce(produtosCarrinho[index], (newState) => {
      newState.quantidadePedido -= 1;
    });
    dispatch(productsUpdate(produtoAtualizado));
  };

  return (
    <>
      <Grid
        container
        justify="center"
        spacing={2}
        style={{ marginBottom: '64px', marginTop: '64px' }}
      >
        {produtosCart.map((item, i) => (
          <ItemMobile
            produto={item}
            posicao={i}
            diminuirQuantia={updateSubTotal}
            aumentarQuantia={updateTotal}
            removerItem={removerProduct}
          />
        ))}
      </Grid>
    </>
  );
};
export default ListItem;
