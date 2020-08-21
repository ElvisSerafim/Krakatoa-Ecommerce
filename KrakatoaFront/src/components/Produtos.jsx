/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Aos from 'aos';
import Produto from './Produto';
import 'aos/dist/aos.css';
import ComboBox from './ComboBox';

const useStyles = makeStyles({
  GridContainer: {
    '@media (min-width: 1024px)': {
      justifyContent: 'flex-start',
    },
    justifyContent: 'space-between',
    marginTop: 32,
  },
});

const Produtos = ({ title, products }) => {
  const [ProdutosOrder, setProdutos] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [habilityOrder, setHabilityOrder] = useState(false);
  const classes = useStyles();
  const lower = title.toLowerCase();

  useEffect(() => {
    Aos.init({ duration: 2000 });
    setProdutos(products);
    setTimeout(() => {
      setHabilityOrder(true);
    }, 300);
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
      alignContent="center"
    >
      {habilityOrder && (
        <Grid
          data-aos="fade-left"
          data-aos-once="true"
          container
          style={{ flexDirection: 'row-reverse' }}
        >
          <ComboBox
            onChange={(event) => {
              setOrderBy(event.target.value);
              ordenar(event.target.value);
            }}
            style={{ maxWidth: 300, marginBottom: 32 }}
            value={orderBy}
            items={['Mais vendidos', 'Menor Preço', 'Maior Preço']}
            label="Ordenar por: "
          />
        </Grid>
      )}

      <>
        {ProdutosOrder.length > 2
          ? ProdutosOrder.map((value) => (
              <>
                <Grid
                  data-aos="fade-up"
                  data-aos-once="true"
                  key={value._id}
                  item
                  lg={3}
                  md={4}
                  sm={6}
                  xs={6}
                >
                  <Produto produto={value} update={() => {}} title={lower} />
                </Grid>
              </>
            ))
          : ProdutosOrder.map((value) => (
              <>
                <Grid
                  data-aos="fade-up"
                  data-aos-once="true"
                  key={value._id}
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                >
                  <Produto produto={value} update={() => {}} title={lower} />
                </Grid>
              </>
            ))}
      </>
    </Grid>
  );
};

export default React.memo(Produtos);
