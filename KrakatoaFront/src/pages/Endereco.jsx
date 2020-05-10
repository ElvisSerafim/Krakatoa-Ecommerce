import React, { PureComponent } from 'react';
import {
  Container, Typography, Box, Button,
} from '@material-ui/core/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
import TextField from '../components/TextField';
import cartBlank from '../img/cartBlank.svg';
import delivery from '../img/delivery.svg';
import payment from '../img/payment.svg';
import Sedex from '../img/Sedex.svg';
import Pac from '../img/Pac.svg';
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
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
    },
  },
});

export default class Endereco extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pricePac: '0,00',
      priceSedex: '0,00',
      diasUteisPac: '0',
      diasUteisSedex: '0',
      deliverySelected: '',
      borderColorPac: 'black',
      borderColorSedex: 'black',
      cep: ' ',
      telefone: ' ',
      bairro: ' ',
      rua: ' ',
      nome: ' ',
      sobrenome: ' ',
      cpf: ' ',
      cidade: ' ',
      numero: ' ',
      complemento: ' ',
    };
  }

  enviar = async () => {
    try {
      const token = localStorage.getItem('token') !== null
        ? localStorage.getItem('token')
        : sessionStorage.getItem('token');
      if (!token) throw new Error('Acesso não autorizado');
      const {
        cep,
        telefone,
        bairro,
        rua,
        nome,
        sobrenome,
        cpf,
        cidade,
        numero,
        complemento,
      } = this.state;
      const nomeCompleto = [nome, sobrenome].join(' ');
      const data = {
        cep,
        telefone,
        bairro,
        rua,
        cpf,
        cidade,
        numero,
        complemento,
        nome: nomeCompleto,
        token,
      };
      console.log(data);
      const request = await api.UsuarioEndereco(data);
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      children, style, classes, onClick,
    } = this.props;

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
            <Typography style={styles.title}>Endereço</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <a href="/carrinho">
                <img src={cartBlank} alt="Carinho" />
              </a>

              <hr style={styles.hrstyle} />
              <a href="/">
                <img src={delivery} alt="Endereço" />
              </a>
              <hr style={styles.hrstyle} />
                <img src={payment} alt="React Logo" />
            </div>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'row', marginTop: '50px' }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '60%' }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ width: '40%' }}>
                  <TextField
                    label="Nome"
                    onChange={(e) => {
                      this.setState({ nome: e.target.value });
                    }}
                  />
                </div>
                <div style={{ width: '40%' }}>
                  <TextField
                    label="Sobrenome"
                    onChange={(e) => {
                      this.setState({ sobrenome: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: '20px',
                }}
              >
                <div style={{ width: '40%' }}>
                  <TextField
                    label="Celular"
                    onChange={(e) => {
                      this.setState({ telefone: e.target.value });
                    }}
                    numberOnly
                  />
                </div>
                <div style={{ width: '40%' }}>
                  <TextField
                    label="CPF"
                    onChange={(e) => {
                      this.setState({ cpf: e.target.value });
                    }}
                    numberOnly
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: '20px',
                }}
              >
                <div style={{ width: '40%' }}>
                  <TextField
                    label="CEP"
                    onChange={(e) => {
                      this.setState({ cep: e.target.value });
                    }}
                  />
                </div>
                <div style={{ width: '40%' }}>
                  <TextField
                    label="Bairro"
                    onChange={(e) => {
                      this.setState({ bairro: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: '20px',
                }}
              >
                <div style={{ width: '40%' }}>
                  <TextField
                    label="Cidade"
                    onChange={(e) => {
                      this.setState({ cidade: e.target.value });
                    }}
                  />
                </div>
                <div style={{ width: '40%' }}>
                  <TextField
                    label="Rua"
                    onChange={(e) => {
                      this.setState({ rua: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: '20px',
                }}
              >
                <div style={{ width: '40%' }}>
                  <TextField
                    label="Numero"
                    onChange={(e) => {
                      this.setState({ numero: e.target.value });
                    }}
                    numberOnly
                  />
                </div>
                <div style={{ width: '40%' }}>
                  <TextField
                    label="Complemento"
                    onChange={(e) => {
                      this.setState({ complemento: e.target.value });
                    }}
                    email
                  />
                </div>
              </div>
            </div>

            <div
              style={{ display: 'flex', flex: '1', flexDirection: 'column' }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <p style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>
                  Tipo de entrega
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flex: '1',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginLeft: '20px',
                }}
              >
                <Box
                  onClick={() => {
                    this.setState({ deliverySelected: 'Pac' });
                    this.setState({ borderColorPac: 'red' });
                    this.setState({ borderColorSedex: 'black' });
                  }}
                  display="flex"
                  style={{ cursor: 'pointer' }}
                  flexDirection="column"
                  height="55%"
                  alignItems="center"
                  borderColor={this.state.borderColorPac}
                  borderRadius={16}
                  {...styles.boxStyle}
                >
                  <div style={{ paddingBottom: '15px' }}>
                    <img src={Pac} alt="React Logo" />
                  </div>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>
                    {this.state.pricePac}
                  </p>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>
                    {this.state.diasUteisPac}
                    {' '}
                    dias úteis
                  </p>
                </Box>

                <Box
                  onClick={() => {
                    this.setState({ deliverySelected: 'Sedex' });
                    this.setState({ borderColorSedex: 'red' });
                    this.setState({ borderColorPac: 'black' });
                  }}
                  style={{ cursor: 'pointer' }}
                  display="flex"
                  borderColor={this.state.borderColorSedex}
                  height="55%"
                  borderRadius={16}
                  flexDirection="column"
                  alignItems="center"
                  {...styles.boxStyle}
                >
                  <div style={{ paddingBottom: '15px' }}>
                    <img src={Sedex} alt="React Logo" />
                  </div>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>
                    {this.state.priceSedex}
                  </p>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>
                    {this.state.diasUteisSedex}
                    {' '}
                    dias úteis
                  </p>
                </Box>
              </div>
              <MuiThemeProvider theme={theme}>
                <div
                  style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    flex: '1',
                    justifyContent: 'flex-end',
                    fontFamily: 'Poppins',
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      width: '30%',
                      height: '50%',
                      textDecoration: 'none',
                    }}
                    onClick={this.enviar}
                    href="/checkout"
                  >
                    Continuar
                  </Button>
                </div>
              </MuiThemeProvider>
            </div>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}
