/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Produto from './Produto';
import { addCart } from '../reducers/productsCart';
import ComboBox from './ComboBox';
import api from '../Services/ApiService';
import Hidden from '@material-ui/core/Hidden';
import { updateProducts } from '../reducers/products';

const useStyles = makeStyles({
  GridContainer: {
    '@media (min-width: 1024px)': {
      justifyContent: 'flex-start',
    },
    marginTop: '60px'
  },
});

const Produtos = ({ title, alert, name }) => {
  const [produtos, setProdutos] = useState([]);
  const [product, setProduct] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();
  const addItemCart = (productCart) => {
    productCart.quantidade = 1;
    dispatch(addCart(productCart));
    alert();
  };
  const lower = title.toLowerCase();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    setProdutos(products);
  }, [products]);

  const ordenar = async (value) => {
    const arrayAux = products[0];

    if (value === '') return;
    if (value === 'Mais vendidos'){
       arrayAux.sort((a, b) => {
        if(a.vendas < b.vendas){
           return -1;
        }
        if (a.vendas > b.vendas){
          return 1;
        }
        return 0;
      });
    } 
    if (value === 'Menor Preço'){
      arrayAux.sort((a, b) => {
        if(a.preco < b.preco){
           return -1;
        }
        if (a.preco > b.preco){
          return 1;
        }
        return 0;
      });
    }
    if (value === 'Maior Preço'){
      arrayAux.sort((a, b) => {
        if(a.preco > b.preco){
           return -1;
        }
        if (a.preco < b.preco){
          return 1;
        }
        return 0;
      });
    }

    setProduct([arrayAux]);
    dispatch(updateProducts([arrayAux]));
  };
  const [state, setState] = React.useState({ open: false, defer: false });
  return products.map((item) => (

      <Grid
        container
        justify="space-evenly"
        spacing={2}
        className={classes.GridContainer}
      >
        {name == 'pesquisa' ? (
          <Grid container lg={12} style={{ flexDirection: 'row-reverse' }}>

          </Grid>
        ) : <Grid container lg={12} style={{ flexDirection: 'row-reverse' }}>
            <ComboBox
              onChange={(event) => {
                setOrderBy(event.target.value);
                ordenar(event.target.value);
              }}
              style={{ maxWidth: 300 }}
              value={orderBy}
              items={['Mais vendidos', 'Menor Preço', 'Maior Preço']}
              label="Ordenar por: "
            />
          </Grid>}


        <NoSsr defer>
          {item.map((value) => (
            <Grid
              key={value.id}
              item
              lg={3}
              md={4}
              sm={6}
              xs={6}
              className={classes.product}
            >
              <NoSsr defer>
                <Produto
                  produto={value}
                  update={() => { }}
                  title={lower}
                  addItem={addItemCart}
                />
              </NoSsr>
            </Grid>
          ))}
        </NoSsr>
      </Grid>

   
  ));
};

export default Produtos;
