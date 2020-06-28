/* eslint-disable react/prop-types */
/* Vestidos,Batas,Shorts,Kangas */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { updateProducts } from '../reducers/products';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import ProductList from '../components/Produtos';
import Footer from '../components/Footer';
import api from '../Services/ApiService';
import Alerta from '../components/Alerta';
import { ProdutoTipo } from '../Services/dto/produto.dto';

const useStyles = makeStyles((theme) => ({
  margin: { margin: theme.spacing(2) },
}));

type ProdutosProps = {
  title: string;
  name: string;
};

const Produtos: React.FunctionComponent<ProdutosProps> = ({ title, name }) => {
  const [product, setProduct] = useState<ProdutoTipo>();
  const [orderBy, setOrderBy] = useState('');
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState('');
  const search = useSelector((state) => state.pesquisaBarra);

  useEffect(() => {
    setNome(name);
    const getProducts = async () => {
      const data = {
        tipo: name,
        chave: '',
      };

      const request = await api.GetProdutos(data);

      const a = [request];
      console.log(a);
      if (name === 'pesquisa') {
        setProduct([[]]);
        const arrayPesquisa = search.split(' ');
        const arrayAux = [];

        if (arrayPesquisa.length === 1) {
          request.forEach((itemI, i:number) => {
            if (
              itemI.nome.toUpperCase().includes(arrayPesquisa[0].toUpperCase())
            ) {
              console.log(itemI);
              arrayAux.push(itemI);
            }
          });
          setProduct([arrayAux]);
        } else {
          request.forEach((itemI, i:number) => {
            let verifica = true;
            arrayPesquisa.forEach((item, index) => {
              if (itemI.nome.toUpperCase().includes(item.toUpperCase())) {
              } else {
                verifica = false;
              }
            });

            if (verifica === true) {
              arrayAux.push(itemI);
            }
          });

          setProduct([arrayAux]);
        }
      } else {
        if (title.toUpperCase() !== name.toUpperCase()) {
          let aux = request;
          let category;
          request.forEach((item, index) => {
            category = aux.filter((iten, index) => {
              if (iten.categoria != undefined) {
                return iten.categoria.toUpperCase() === title.toUpperCase();
              }
            });
          });
          setProduct([category]);
        } else {
          setProduct(a);
        }
      }
    };

    getProducts();
  }, [name, title, search]);
  const dispatch = useDispatch();
  dispatch(updateProducts(product));

  const abrir = () => {};
  const fechar = (event: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <>
      <Topo />
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        marginBottom="64px"
      >
        <Container maxWidth="lg">
          <Alerta
            message="Produto adicionado"
            vertical="top"
            horizontal="right"
            status="success"
            handleClose={fechar}
            openAlert={open}
          />
          <Typography variant="h2" color="primary">
            {title}
          </Typography>
          <div className={classes.margin}>
            <ProductList
              alert={() => {
                setOpen(true);
              }}
              name={name}
              title={title}
            />
          </div>
        </Container>
      </Box>
      <Footer />
    </>
  );
};
export default Produtos;
