import React, { PureComponent } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Container, Grid, Typography, Box, Button, makeStyles } from '@material-ui/core/';
import TextField from '../components/TextField';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
import delivery from '../img/noDelivery.svg';
import payment from '../img/payment.svg';
import circle from '../img/circle.svg';
import Table from '../components/Table';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
    borderRadius: 100
  },
  searchIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 200,
    backgroundColor: 'red',
    color: 'white'
  }
};


const Carrinho = ({children, style, onClick}) => {

  const products = useSelector((state) => state.productsCart)
  console.log(products)

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
            <a href="/">
              <div style={styles.searchIcon}>
                <ShoppingCartIcon />
              </div>
            </a>

            <hr style={styles.hrstyle} />
            <a href="/">
              <img src={delivery} alt="React Logo" />
            </a>
            <hr style={styles.hrstyle} />
            <a href="/">
              <img src={payment} alt="React Logo" />
            </a>
          </div>
        </div>
        <div style={{ marginTop: '30px' }}>
          <Table produtos={products}/>
        </div>
        <div style={{ display: 'flex', flex: '1', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'flex-start' }}>
            <div>
              <TextField placeholder="Código do Cupom" style={{ color: 'white', backgroundColor: 'black', borderRadius: 7, height: 50 }} numberOnly />
            </div>
            <div style={{ marginLeft: 20, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: 120 }}>
              <Button variant="contained" color="primary" fullWidth style={{ borderRadius: 7, height: 50 }}>
                Aplicar
        </Button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Button variant="contained" color="primary" style={{ borderRadius: 7, height: 50 }}>
              Continuar Comprando
        </Button>
            <Button variant="contained" color="primary" style={{ borderRadius: 7, height: 50, width: 120 }}>
              Limpar
        </Button>
          </div>
          <div>
          </div>
        </div>
        <div style={{ display: 'flex', flex: '1', flexDirection: 'row', paddingTop: '40px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '35%', color: 'white', backgroundColor: 'black', borderRadius: 10, height: 120, fontFamily: 'Poppins', fontSize: 20, padding: '20px' }}>
            <Typography style={{ margin: 0, fontWeight: '600' }}>Frete: </Typography>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <TextField placeholder="Insira seu CEP" style={{ color: 'red', backgroundColor: 'white', borderRadius: 7, height: 50 }} numberOnly />
              </div>
              <div style={{ marginLeft: 20, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: 120 }}>
                <Button variant="contained" color="primary" fullWidth style={{ borderRadius: 7, height: 50 }}>
                  Calcular
        </Button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '30%', color: 'white', backgroundColor: 'black', borderRadius: 10, fontFamily: 'Poppins', fontSize: 20, padding: '20px' }}>
            <p style={{ margin: 0, fontWeight: '600' }}>Total no Carrinho: </p>
            <div>
              <hr style={{ color: "red", backgroundColor: 'red', height: 1, borderColor: 'red', width: '100%' }} />
            </div>

            <div>
              <p>SubTotal: </p>
            </div>

            <div>
              <p>Entrega: </p>
            </div>

            <div style={{ paddingTop: '20px' }}>
              <p>Total: </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flex: '1', justifyContent: 'flex-end', alignItems: 'flex-end', paddingTop: 50 }}>
          <Button variant="contained" color="primary" style={{ borderRadius: 7, height: 50 }}>
            Finalizar Compra
        </Button>
        </div>
      </Container >
      <Footer />
    </>
  )
}
export default Carrinho;
