import React, { PureComponent } from 'react';
import { Container, Typography, Box, Button } from '@material-ui/core/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { Link } from 'react-router-dom';
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
import Alerta from '../components/Alerta'


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
let path = '';
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
      const token =
        localStorage.getItem('token') !== null
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
      
      switch (true) {
        case nome.length == 0 || nome == ' ':
          alert('Insira seu nome!');
        break;
        case sobrenome.length == 0 || sobrenome == ' ':
          alert('Insira seu sobrenome!');
          break;
        case telefone.length != 11 :
          alert('Insira um número de telefone válido com DDD');
          break;
        case cpf.length != 11:
          alert('Cpf inválido!');
          break;
        case cep.length != 8:
          alert('Cep inválido!');
          break;
        case bairro.length == 0 || bairro == ' ':
          alert('Insira seu bairro!');
          break;
        case cidade.length == 0 || cidade == ' ':
          alert('Insira sua cidade!');
          break;
        case numero.length == 0 || numero == ' ':
          alert('Insira o numero da sua casa!');
          break;
        case rua.length == 0 || rua == ' ':
          alert('Insira sua rua!');
          break;
        default:
          path = '/sumario';
          break;
      }
      console.log(data);
      const request = await api.UsuarioEndereco(data);
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getInformaçõesCep();
  }

  getInformaçõesCep = async () => {
    const cep = this.props.location.state.cepEndereco;
    const data = {
      cepOrigem: '41610200',
      cepDestino: cep,
      valorDeclarado: 500,
      codigoServico: 41106,
    };
    const data2 = {
      cepOrigem: '41610200',
      cepDestino: cep,
      valorDeclarado: 500,
      codigoServico: 40010,
    };
    const request = await api.CalcPrazoPreco(data);
    console.log(request);
    this.setState({ pricePac: request[0].valor });

    const request2 = await api.CalcPrazoPreco(data2);
    console.log(request2);
    this.setState({ priceSedex: request2[0].valor });

    const data3 = {
      cepOrigem: '41610200',
      cepDestino: cep,
    };

    const request3 = await api.CalcPrazo(data3);
    this.setState({ diasUteisSedex: request3[0].prazoEntrega });
    this.setState({ diasUteisPac: request3[1].prazoEntrega });
    console.log(request3);
  };

  render() {
    const { children, style, classes, onClick, location } = this.props;
    console.log('endereco');
    console.log(location.state.cepEndereco);
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
                    {this.state.diasUteisPac} dias úteis
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
                    {this.state.diasUteisSedex} dias úteis
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
                  <Link
                    to={{
                      pathname: path,
                      state: {
                        totalPedido: location.state.totalPedido,
                        cepEndereco: location.state.cepEndereco,
                        entregaSelecionada: this.state.deliverySelected,
                        endereco: {
                          telefone: this.state.telefone,
                          bairro: this.state.bairro,
                          rua: this.state.rua,
                          cpf: this.state.cpf,
                          cidade: this.state.cidade,
                          numero: this.state.numero,
                          complemento: this.state.complemento,
                          nome: this.state.nome,
                        },
                      },
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
                  </Link>
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
