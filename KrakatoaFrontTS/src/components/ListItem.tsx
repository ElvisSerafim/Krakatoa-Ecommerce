import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  productsUpdate,
  removerCart,
  removeProducts,
} from '../reducers/productsCart';

import ItemMobile from './ItemMobile';

const ListItem = ({ atualizarTotal }) => {
  const [products, setProducts] = useState([1, 1]);
  const [total, setTotal] = useState(0);
  const allProducts = useSelector((state) => state.productsCart);
  const dispatch = useDispatch();

  useEffect(() => {
    let aux = 0;
    allProducts.map((item, i) => {
      aux += item.preco * item.quantidade;
    });
    setTotal(aux);
    atualizarTotal(aux);
  }, []);

  const removerProduct = (produto) => {
    dispatch(removerCart(produto));
  };

  const updateTotal = (index) => {
    const aux = total + allProducts[index].preco;
    setTotal(aux);
    atualizarTotal(aux);
    allProducts[index].quantidade++;
    dispatch(productsUpdate(allProducts));
  };

  const updateSubTotal = (index) => {
    const aux = total - allProducts[index].preco;
    setTotal(aux);
    atualizarTotal(aux);
    allProducts[index].quantidade--;
    dispatch(productsUpdate(allProducts));
  };

  return (
    <>
      <div style={{ marginBottom: '64px', marginTop: '64px' }}>
        {allProducts.map((item, i) => (
          <ItemMobile
            produto={item}
            posicao={i}
            diminuirQuantia={updateSubTotal}
            aumentarQuantia={updateTotal}
            removerItem={removerProduct}
          />
        ))}
      </div>
    </>
  );
};
export default ListItem;
