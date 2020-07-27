/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Produto from './Produto';
import ComboBox from './ComboBox';
import Estilos from '../Estilos';

const useStyles = makeStyles({
  GridContainer: {
    '@media (min-width: 1024px)': {
      justifyContent: 'flex-start',
    },
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 60,
  },
});

const Produtos = ({ title, products }) => {
  const [ProdutosOrder, setProdutos] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const classes = useStyles();
  const lower = title.toLowerCase();

  useEffect(() => {
    setProdutos(products);
  }, [products]);

  const ordenar = async (value) => {
    const arrayAux = JSON.parse(JSON.stringify(products));

    if (value === '') return;
    if (value === 'Mais vendidos') {
      arrayAux.sort((produtoLeft, produtoRight) => {
        if (produtoLeft.vendas < produtoRight.vendas) {
          return -1;
        }
        if (produtoLeft.vendas > produtoRight.vendas) {
          return 1;
        }
        return 0;
      });
    }
    if (value === 'Menor Preço') {
      arrayAux.sort((produtoLeft, produtoRight) => {
        if (produtoLeft.preco < produtoRight.preco) {
          return -1;
        }
        if (produtoLeft.preco > produtoRight.preco) {
          return 1;
        }
        return 0;
      });
    }
    if (value === 'Maior Preço') {
      arrayAux.sort((produtoLeft, produtoRight) => {
        if (produtoLeft.preco > produtoRight.preco) {
          return -1;
        }
        if (produtoLeft.preco < produtoRight.preco) {
          return 1;
        }
        return 0;
      });
    }

    setProdutos(arrayAux);
  };

  return (
    <Grid
      container
      justify="space-evenly"
      spacing={2}
      className={classes.GridContainer}
    >
      {products.length === 0 ? (
        <Grid container style={{ flexDirection: 'row-reverse' }} />
      ) : (
          <Grid container style={{ flexDirection: 'row-reverse' }}>
            <ComboBox
              onChange={(event) => {
                setOrderBy(event.target.value);
                ordenar(event.target.value);
              }}
              style={{ maxWidth: 300, marginBottom: 36 }}
              value={orderBy}
              items={['Mais vendidos', 'Menor Preço', 'Maior Preço']}
              label="Ordenar por: "
            />
          </Grid>
        )}

      {products.length === 0 ? (
        <div
          style={{
            ...Estilos.flexRowCENTER,
            paddingTop: 64,
            paddingBottom: 64,
            minHeight: 700,
          }}
        >
          <Typography
            color="primary"
            variant="h5"
            style={{ fontSize: '3.0em', fontWeight: 'Bold' }}
          >
            Sem produtos na categoria
          </Typography>
        </div>
      ) : (
          <>
            {ProdutosOrder.map((value) => (
            
              <Grid
                key={value.id}
                item
                lg={3}
                md={4}
                sm={6}
                xs={6}
              >
                <Produto produto={value} update={() => { }} title={lower} />
              </Grid>
            ))}
          </>
        )}
    </Grid>
  );
};

export default Produtos;
