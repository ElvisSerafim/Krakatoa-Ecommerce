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
import { updateProducts } from '../reducers/products';
import { ProdutoTipo } from '../Services/dto/produto.dto';

export type Order = 'Mais vendidos' | 'Menor Preço' | 'Maior Preço' | undefined;

type ProdutosProps = {
  title: string;
  alert: Function;
  name: string;
};

const useStyles = makeStyles({
  GridContainer: {
    '@media (min-width: 1024px)': {
      justifyContent: 'flex-start',
    },
  },
});

const Produtos: React.FunctionComponent<ProdutosProps> = ({
  title,
  alert,
  name,
}) => {
  const [produtos, setProdutos] = useState<ProdutoTipo[]>();
  const [product, setProduct] = useState<ProdutoTipo>();
  const [orderBy, setOrderBy] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();
  const addItemCart = (productCart) => {
    productCart.quantidade = 1;
    dispatch(addCart(productCart));
    alert();
  };
  const lower = title.toLowerCase();
  const products: ProdutoTipo[] = useSelector((state) => state.products);
  useEffect(() => {
    setProdutos(products);
  }, [products]);

  const ordenar = async (value: Order) => {
    let chave = '';
    if (value === undefined) return;
    if (value === 'Mais vendidos') chave = 'maiorV';
    if (value === 'Menor Preço') chave = 'menorP';
    if (value === 'Maior Preço') chave = 'maiorP';

    const data = {
      tipo: name,
      chave,
    };
    const request = await api.GetProdutos(data);
    const b = [request];
    setProduct(b);
    dispatch(updateProducts(b));
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
        <Grid container lg={12} style={{ flexDirection: 'row-reverse' }}></Grid>
      ) : (
        <Grid container lg={12} style={{ flexDirection: 'row-reverse' }}>
          <ComboBox
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setOrderBy(event.target.value);
              ordenar(event.target.value as Order);
            }}
            style={{ maxWidth: 300 }}
            value={orderBy}
            items={['Mais vendidos', 'Menor Preço', 'Maior Preço']}
            label="Ordenar por: "
          />
        </Grid>
      )}

      <NoSsr defer>
        {item.map((value) => (
          <Grid
            /* id={value.id} */
            item
            lg={3}
            md={4}
            sm={6}
            xm={6}
            className={classes.product}
          >
            <NoSsr defer>
              <Produto
                produto={value}
                update={() => {}}
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
