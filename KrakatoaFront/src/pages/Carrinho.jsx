import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Button } from '@material-ui/core/';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import TextField from '../components/TextField';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
import delivery from '../img/noDelivery.svg';
import payment from '../img/payment.svg';
import Table from '../components/Table';
import { removerCart, removeProducts } from '../reducers/productsCart';
import api from '../Services/ApiService';
import Estilos from '../Estilos';

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
  priceText : {color: 'white',
              backgroundColor: '#FF6961',
              borderRadius: 10,
              fontFamily: 'Poppins',
              fontSize: 20,
              padding: '20px'
},
  borderHeight : { borderRadius: 7, height: 50 },
  linha:{
    color: 'red',
    backgroundColor: 'red',
    height: 1,
    borderColor: 'red',
    width: '100%',
  }
};

const tentativa = {
  table: {
    minWidth: 700,
    borderRadius: 10,
    fontFamily: 'Poppins',
  },
  tableHead: {
    height: 100,
  },
};

const Carrinho = () => {
  const [totalFinal, setFinalTotal] = useState(0);
  const [totalFrete, setTotalFrete] = useState(0);
  const [total, setTotal] = useState(0);
  const [cep, setCep] = useState('');

  const products = useSelector((state) => state.productsCart);
  const dispatch = useDispatch();

  const atualizarTotal = (totalMap) => {
    let auxTotal = 0;
    totalMap.map((item) => {
      auxTotal += item;
    });
    setFinalTotal(auxTotal);
  };

  const removerProduct = (produto) => {
    dispatch(removerCart(produto));
  };

  useEffect(() => {
    let totally = 0;
    totally = totalFinal + totalFrete;
    setTotal(totally.toFixed(2));
  }, [totalFinal, totalFrete]);

  const calcularPrazo = async () => {
    const data = {
      cepOrigem: '41610200',
      cepDestino: cep,
      valorDeclarado: 500,
      codigoServico: 41106,
    };
    const request = await api.CalcPrazoPreco(data);
    const val = parseFloat(request[0].valor.toString().replace(',', '.'));
    setTotalFrete(val);
  };

  const removeAllProducts = () => {
    dispatch(removeProducts());
  };

  return (
    <>
      <Container maxWidth="lg">
        <Topo />
        <Navbar />
        <div
          style={Estilos.flexRowSPACEBTW}
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
          <Table
            estilo={tentativa}
            actualTotal={atualizarTotal}
            removerItem={removerProduct}
          />
        </div>
        <div style={Estilos.flexRowStandard}>
          <div style={{...Estilos.flexRowSPACEBTW, width: '50%', alignItems: 'flex-end'}}>
            <Button
              variant="contained"
              color="primary"
              style={styles.borderHeight}
              href="/"
            >
              Continuar Comprando
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={removeAllProducts}
              style={{...styles.borderHeight, width: 120 }}
            >
              Limpar
            </Button>
          </div>
          <div />
        </div>

        <div style={{...Estilos.flexRowSPACEBTW, paddingTop: '40px'}}>
          <div
            style={{...Estilos.flexColumnStandard2,width: '35%',height: 120,...styles.priceText}}>
            <div style={{...Estilos.flexRowSPACEBTW}} >
              <Typography style={Estilos.marginFont}>
                Frete:
              </Typography>
              <Typography style={Estilos.marginFont}>
                R$
                {totalFrete}
              </Typography>
            </div>

            <div style={Estilos.flexRowStandard2}>
              <div>
                <TextField
                  placeholder="Insira seu CEP"
                  onChange={(event) => {
                    setCep(event.target.value);
                  }}
                  style={{color: 'red',backgroundColor: 'white',...styles.borderHeight}} numberOnly/>
              </div>
              <div
                style={{marginLeft: 20,width: 120,...Estilos.flexRowEND2}}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={calcularPrazo}
                  fullWidth
                  style={styles.borderHeight}
                >
                  Calcular
                </Button>
              </div>
            </div>
          </div>

          <div style={{...Estilos.flexColumnStandard2,width: '30%',...styles.priceText}}>
            <p style={Estilos.marginFont}>Total no Carrinho: </p>
            <div>
              <hr style={styles.linha}
              />
            </div>

            <div style={Estilos.flexRowSPACEBTW}>
              <p>SubTotal:</p>
              <p>
                R$
                {totalFinal}
              </p>
            </div>

            <div
              style={Estilos.flexRowSPACEBTW} >

              <Typography style={Estilos.noMargin}>Entrega: </Typography>
              <Typography style={Estilos.noMargin}>
                R$
                {totalFrete}
              </Typography>
            </div>

            <div style={{...Estilos.flexRowSPACEBTW,paddingTop: '30px'}} >
              <Typography style={Estilos.noMargin}>Total: </Typography>
              <Typography style={Estilos.marginFont}>
                R$
                {total}
              </Typography>
            </div>
          </div>
        </div>

        <div
          style={{...Estilos.flexRowEND,paddingTop: 50}}
        >
          <Link
            to={{
              pathname: '/endereco',
              state: {
                totalPedido: total,
                cepEndereco: cep,
              },
            }}
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="contained"
              color="primary"
              style={styles.borderHeight}
              href="/endereco"
            >
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
