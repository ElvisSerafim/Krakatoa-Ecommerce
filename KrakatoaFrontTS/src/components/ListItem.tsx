import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  productsUpdate,
  removerCart,
  removeProducts,
} from '../reducers/productsCart';

import ItemMobile from './ItemMobile';
import { ProdutoTipo } from '../Services/dto/produto.dto';

type ListItemProp = {
  atualizarTotal:Function 
}

const ListItem:React.FunctionComponent<ListItemProp> = ({ atualizarTotal }) => {
  const [products, setProducts] = useState([1, 1]);
  const [total, setTotal] = useState(0);
  const allProducts = useSelector((state:any) => state.productsCart);
  const dispatch = useDispatch();

  useEffect(() => {
    let aux = 0;
    allProducts.map((item:ProdutoTipo, i:number) => {
      aux += item.preco * item.quantidade;
    });
    setTotal(aux);
    atualizarTotal(aux);
  }, []);

  const removerProduct = (produto: ProdutoTipo) => {
    dispatch(removerCart(produto));
  };

  const updateTotal = (index:number) => {
    const aux = total + allProducts[index].preco;
    setTotal(aux);
    atualizarTotal(aux);
    allProducts[index].quantidade++;
    dispatch(productsUpdate(allProducts));
  };

  const updateSubTotal = (index:number) => {
    const aux = total - allProducts[index].preco;
    setTotal(aux);
    atualizarTotal(aux);
    allProducts[index].quantidade--;
    dispatch(productsUpdate(allProducts));
  };

  return (
    <>
      <div style={{ marginBottom: '64px', marginTop: '64px' }}>
        {allProducts.map((item:ProdutoTipo, i:number) => (
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
