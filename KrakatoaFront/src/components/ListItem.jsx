import React, { useState, useEffect } from 'react';
import { productsUpdate } from '../reducers/productsCart';
import { useSelector, useDispatch } from 'react-redux';
import { removerCart, removeProducts } from '../reducers/productsCart';
import ItemMobile from './ItemMobile';

const ListItem = ({ }) => {
    const [products, setProducts] = useState([1, 1]);
    const [total, setTotal] = useState(0);
    const allProducts = useSelector((state) => state.productsCart);
    const dispatch = useDispatch();

    useEffect(()=> {

        var aux = 0;
        allProducts.map((item, i) => {
            aux = aux + (item.preco * item.quantidade);
        });
        setTotal(aux);
    });


    const removerProduct = (produto) => {
        dispatch(removerCart(produto));
    };

    const updateTotal = (index) => {
        let aux = total + allProducts[index].preco;
        setTotal(aux);
        allProducts[index].quantidade++;
        dispatch(productsUpdate(allProducts));
      };
    
      const updateSubTotal = (index) => {
        let aux = total - allProducts[index].preco;
        setTotal(aux);
        allProducts[index].quantidade--;
        dispatch(productsUpdate(allProducts));
      };

            

    return (
        <>
            <div style={{ marginBottom: '64px', marginTop: '64px' }}>
                {allProducts.map((item, i) => (
                    <ItemMobile produto={item} posicao={i} diminuirQuantia={updateSubTotal} aumentarQuantia={updateTotal} removerItem={removerProduct}/>
                ))}
            </div>

        </>
    );
}
export default ListItem;