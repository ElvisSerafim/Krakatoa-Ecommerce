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
    marginTop: '60px',
  },
});

const Produtos: React.FunctionComponent<ProdutosProps> = ({
  title,
  alert,
  name,
}) => {
  const [produtos, setProdutos] = useState<ProdutoTipo[][]>();
  const [product, setProduct] = useState<ProdutoTipo[][]>();
  const [orderBy, setOrderBy] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();
  const addItemCart = (productCart: ProdutoTipo) => {
    productCart.quantidade = 1;
    dispatch(addCart(productCart));
    alert();
  };
  const lower = title.toLowerCase();
  const products: ProdutoTipo[][] = useSelector((state: any) => state.products);
  useEffect(() => {
    setProdutos(products);
  }, [products]);

  const ordenar = async (value: string): Promise<void> => {
    const arrayAux = products[0];

    if (value === undefined) return;
    if (value === 'Mais vendidos') {
      arrayAux.sort((ProdA: ProdutoTipo, ProdB: ProdutoTipo) => {
        if (ProdA.vendas < ProdB.vendas) {
          return -1;
        }
        if (ProdA.vendas > ProdB.vendas) {
          return 1;
        }
        return 0;
      });
    }
    if (value === 'Menor Preço') {
      arrayAux.sort((ProdA: ProdutoTipo, ProdB: ProdutoTipo) => {
        if (ProdA.preco < ProdB.preco) {
          return -1;
        }
        if (ProdA.preco > ProdB.preco) {
          return 1;
        }
        return 0;
      });
    }
    if (value === 'Maior Preço') {
      arrayAux.sort((ProdA: ProdutoTipo, ProdB: ProdutoTipo) => {
        if (ProdA.preco > ProdB.preco) {
          return -1;
        }
        if (ProdA.preco < ProdB.preco) {
          return 1;
        }
        return 0;
      });
    }

    setProduct([arrayAux]);
    dispatch(updateProducts([arrayAux]));
  };
  const [state, setState] = React.useState({ open: false, defer: false });

  return (
    <>
      {products.map((item: ProdutoTipo[]) => (
        <Grid
          container
          justify="space-evenly"
          spacing={2}
          className={classes.GridContainer}
        >
          {name == 'pesquisa' ? (
            <Grid
              container
              lg={12}
              style={{ flexDirection: 'row-reverse' }}
            ></Grid>
          ) : (
            <Grid container lg={12} style={{ flexDirection: 'row-reverse' }}>
              <ComboBox
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setOrderBy(event.target.value);
                  ordenar(event.target.value);
                }}
                style={{ maxWidth: 300 }}
                value={[orderBy]}
                items={['Mais vendidos', 'Menor Preço', 'Maior Preço']}
                label="Ordenar por: "
              />
            </Grid>
          )}

          <NoSsr defer>
            {item.map((value) => (
              <Grid key={value.id} item lg={3} md={4} sm={6} xs={6}>
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
      ))}
    </>
  );
};

export default Produtos;
