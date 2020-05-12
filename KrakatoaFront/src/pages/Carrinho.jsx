import React, { PureComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Grid, Typography, Box, Button, makeStyles,
} from '@material-ui/core/';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import TextField from '../components/TextField';
import { Link } from 'react-router-dom';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
import delivery from '../img/noDelivery.svg';
import payment from '../img/payment.svg';
import circle from '../img/circle.svg';
import Table from '../components/Table';
import { removerCart, removeProducts } from '../reducers/productsCart';
import api from '../Services/ApiService';


const styles = {
  title: {
    fontSize: '2.5em',
    textAlign: 'center',
    color: '#FF5757',
    fontWeight: '700',
  },
  hrstyle: {
    color: 'red',
    backgroundColor: 'red',
    height: 0.5,
    width: '60px',
    borderColor: 'red',
  },
  boxStyle: {
    m: 1,
    border: 5,
    padding: '40px',
  },
  cupomField: {
    borderRadius: 100,
  },
  searchIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 200,
    backgroundColor: 'red',
    color: 'white',
  },
};

const tentativa = {
  table: {
    minWidth: 700,
    borderRadius: 10,
    fontFamily: 'Poppins'
  },
  tableHead: {
    height: 100
  }
}


const Carrinho = ({ children, style, onClick }) => {
  const [totalFinal, setFinalTotal] = useState(0);
  const [totalFrete, setTotalFrete] = useState(0);
  const [total, setTotal] = useState(0);
  const [cep, setCep] = useState('');

  const products = useSelector((state) => state.productsCart);
  console.log(products);
  const dispatch = useDispatch();

  const atualizarTotal = (total) => {
    var auxTotal = 0;
    total.map((item) => {
      auxTotal = auxTotal + item;
    });
    setFinalTotal(auxTotal);
  }

  const removerProduct = (produto) => {
    console.log(`Item: ${produto}`);
    dispatch(removerCart(produto));
  };

  useEffect(() => {
    var totally = 0;
    totally = totalFinal + totalFrete;
    setTotal(totally.toFixed(2));
  }, [totalFinal, totalFrete]);


  const calcularPrazo = async () => {

    const data = {
      cepOrigem: '41610200',
      cepDestino: cep,
      valorDeclarado: 500,
      codigoServico: 41106
    };
    const request = await api.CalcPrazoPreco(data);
    const val = parseFloat(request[0].valor.toString().replace(",", "."));
    setTotalFrete(val);
  }

  const removeAllProducts = () => {
    dispatch(removeProducts());

  }

  return (
    <>
      <Container maxWidth="lg">
        <Topo />
        <Navbar />
        <div
          style={{
            display: 'flex',
            flex: '1',
            flexDirection: 'row',
            marginTop: '64px',
            justifyContent: 'space-between',
          }}
        >
          <Typography style={styles.title}>Carrinho</Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <a href="/carrinho">
              <div style={styles.searchIcon}>
                <ShoppingCartIcon />
              </div>
            </a>

            <hr style={styles.hrstyle} />
            <a href="/endereco">
              <img src={delivery} alt="React Logo" />
            </a>
            <hr style={styles.hrstyle} />
            <a href="/">
              <img src={payment} alt="React Logo" />
            </a>
          </div>
        </div>
        <div style={{ marginTop: '30px' }}>
          <Table estilo={tentativa} actualTotal={atualizarTotal} removerItem={removerProduct} />
        </div>
        <div style={{ display: 'flex', flex: '1', flexDirection: 'row' }}>
         

          <div style={{ display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Button variant="contained" color="primary" style={{ borderRadius: 7, height: 50 }} href="/" >
              Continuar Comprando
        </Button>
            <Button variant="contained" color="primary" onClick={removeAllProducts} style={{ borderRadius: 7, height: 50, width: 120 }}>
              Limpar
            </Button>
          </div>
          <div />
        </div>

        <div style={{ display: 'flex', flex: '1', flexDirection: 'row', paddingTop: '40px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '35%', color: 'white', backgroundColor: '#FF6961', borderRadius: 10, height: 120, fontFamily: 'Poppins', fontSize: 20, padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography style={{ margin: 0, fontWeight: '600' }}>Frete: </Typography>
              <Typography style={{ margin: 0, fontWeight: '600' }}>R$ {totalFrete}</Typography>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <TextField placeholder="Insira seu CEP" onChange={(event) => {
                  setCep(event.target.value);
                }} style={{ color: 'red', backgroundColor: 'white', borderRadius: 7, height: 50 }} numberOnly />
              </div>
              <div style={{ marginLeft: 20, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: 120 }}>
                <Button variant="contained" color="primary" onClick={calcularPrazo} fullWidth style={{ borderRadius: 7, height: 50 }}>
                  Calcular
                </Button>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex', flexDirection: 'column', width: '30%', color: 'white', backgroundColor: '#FF6961', borderRadius: 10, fontFamily: 'Poppins', fontSize: 20, padding: '20px',
          }}
          >
            <p style={{ margin: 0, fontWeight: '600' }}>Total no Carrinho: </p>
            <div>
              <hr style={{
                color: 'red', backgroundColor: 'red', height: 1, borderColor: 'red', width: '100%',
              }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <p>SubTotal:</p>
              <p>R$ {totalFinal}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography style={{ margin: 0 }}>Entrega: </Typography>
              <Typography style={{ margin: 0 }}>R$ {totalFrete}</Typography>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '30px' }}>
              <Typography style={{ margin: 0 }}>Total: </Typography>
              <Typography style={{ margin: 0, fontWeight: '600' }}>R$ {total}</Typography>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex', flex: '1', justifyContent: 'flex-end', alignItems: 'flex-end', paddingTop: 50,
        }}
        >

          <Link
            to={{
              pathname: '/endereco',
              state: {
                totalPedido: total,
                cepEndereco: cep,
              }
            }}

            style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ borderRadius: 7, height: 50 }}
              href="/endereco">
              Checkout
          </Button>
          </Link>

        </div>
      </Container>
      <Footer />
    </>
  );
};
export default Carrinho;
