import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Hidden,
} from '@material-ui/core/';
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
import Alerta from '../components/Alerta';
import Estilos from '../Estilos';
const styles = {
  title: {
    fontSize: '2.5em',
    color: '#FF5757',
    fontWeight: '700',
    paddingTop: 20,
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

class Endereco extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pricePac: '0,00',
      priceSedex: '0,00',
      diasUteisPac: '0',
      diasUteisSedex: '0',
      deliverySelected: '',
      priceFrete: '',
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
      status: 'error',
      message: '',
      open: false,
    };
    console.log(props);
    
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
        status,
        message,
        open,
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
        message,
        status,
        open,
      };
      this.setState({ open: true });
      this.setState({ status: 'error' });
      switch (true) {
        case nome.length === 0 || nome === ' ':
          this.setState({ message: 'Insira seu nome!' });
          break;
        case sobrenome.length === 0 || sobrenome === ' ':
          this.setState({ message: 'Insira seu sobrenome!' });
          break;
        case telefone.toString().length !== 11:
          this.setState({
            message: 'Você deve inserir um número de telefone válido com DDD',
          });
          break;
        case cpf.length !== 11:
          this.setState({ message: 'CPF inválido!' });
          break;
        case cep.length !== 8:
          this.setState({ message: 'CEP inválido!' });
          break;
        case bairro.length === 0 || bairro === ' ':
          this.setState({ message: 'Insira seu bairro!' });
          break;
        case cidade.length === 0 || cidade === ' ':
          this.setState({ message: 'Insira sua cidade!' });
          break;
        case numero.length === 0 || numero === ' ':
          this.setState({ message: 'Insira o número da sua casa!' });
          break;
        case rua.length === 0 || rua === ' ':
          this.setState({ message: 'Insira sua rua!' });
          break;
        default:
          this.setState({ status: 'success' });
          this.setState({ message: 'Boas compras!' });
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
    if (this.props.location.state != undefined) {
      this.getInformaçõesCep();
    }
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
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({ open: false });
    };
    const { location } = this.props;
    return (
      <>
        <Topo />
        <Navbar />
        <Container maxWidth="lg">
          {location.state == undefined ? (
            <Redirect
              to={{
                pathname: '/carrinho',
              }}
            />
          ) : (
            <>
              <Alerta
                openAlert={this.state.open}
                message={this.state.message}
                status={this.state.status}
                handleClose={handleClose}
                vertical="top"
                horizontal="right"
              />
              <Grid item lg={12} md={12} sm={12}>
                <Typography style={styles.title}>Endereço</Typography>
              </Grid>

              <Grid item lg={12} md={12} sm={12} justify="flex-end" container>
                <div style={Estilos.flexRowCENTER2}>
                  <a href="/carrinho">
                    <img src={cartBlank} alt="Carinho" />
                  </a>
                  <hr style={styles.hrstyle} />
                  <a href="/endereco">
                    <img src={delivery} alt="Endereço" />
                  </a>
                  <hr style={styles.hrstyle} />
                  <img src={payment} alt="React Logo" />
                </div>
              </Grid>
              <Grid item lg={12} container direction="row" justify="center">
                <Grid item lg={3} md={12} sm={12}>
                  <TextField
                    label="Nome"
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      this.setState({ nome: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item lg={1}></Grid>
                <Grid item lg={3} md={12} sm={12}>
                  <TextField
                    label="Sobrenome"
                    onChange={(e) => {
                      this.setState({ sobrenome: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item lg={1}></Grid>

                <Grid item lg={3} md={12} sm={12}>
                  <TextField
                    label="Celular"
                    onChange={(e) => {
                      this.setState({ telefone: e.target.value });
                    }}
                    numberOnly
                  />
                </Grid>
              </Grid>
              <Grid item lg={12} container direction="row" justify="center">
                <Grid item lg={3} md={12} sm={12}>
                  <TextField
                    label="CPF"
                    onChange={(e) => {
                      this.setState({ cpf: e.target.value });
                    }}
                    numberOnly
                  />
                </Grid>
                <Grid item lg={1}></Grid>
                <Grid item lg={3} md={12} sm={12}>
                  <TextField
                    label="CEP"
                    onChange={(e) => {
                      this.setState({ cep: e.target.value });
                    }}
                    numberOnly
                  />
                </Grid>
                <Grid item lg={1}></Grid>
                <Grid item lg={3} md={12} sm={12}>
                  <TextField
                    label="Bairro"
                    onChange={(e) => {
                      this.setState({ bairro: e.target.value });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item lg={12} container direction="row" justify="center">
                <Grid item lg={3} md={12} sm={12}>
                  <TextField
                    label="Cidade"
                    onChange={(e) => {
                      this.setState({ cidade: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item lg={1}></Grid>
                <Grid item lg={3} md={12} sm={12}>
                  <TextField
                    label="Rua"
                    onChange={(e) => {
                      this.setState({ rua: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item lg={1}></Grid>
                <Grid item lg={3} md={12} sm={12}>
                  <TextField
                    label="Numero"
                    onChange={(e) => {
                      this.setState({ numero: e.target.value });
                    }}
                    numberOnly
                  />
                </Grid>
              </Grid>

              <Grid item lg={4} justify="space-between" container>
                <Grid item lg={1}></Grid>
                <Grid item lg={9} md={12} sm={12}>
                  <TextField
                    label="Complemento"
                    onChange={(e) => {
                      this.setState({ complemento: e.target.value });
                    }}
                    email
                  />
                </Grid>
                <Grid item lg={1}></Grid>
              </Grid>
              <Grid item container lg={12} md={12} sm={12} justify="center">
                <p
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                  }}
                >
                  Tipo de entrega
                </p>
              </Grid>
              <Grid
                item
                lg={12}
                container
                md={12}
                sm={12}
                justify="center"
                alignItems="center"
              >
                <Grid item lg={2} md={6} sm={4}>
                  <Box
                    onClick={() => {
                      this.setState({ deliverySelected: 'Pac' });
                      this.setState({ borderColorPac: 'red' });
                      this.setState({ borderColorSedex: 'black' });
                      this.setState({ priceFrete: this.state.pricePac });
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
                </Grid>

                <Grid item lg={2} md={6} sm={4}>
                  <Box
                    onClick={() => {
                      this.setState({ deliverySelected: 'Sedex' });
                      this.setState({ borderColorSedex: 'red' });
                      this.setState({ borderColorPac: 'black' });
                      this.setState({ priceFrete: this.state.priceSedex });
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
                </Grid>
              </Grid>
              <Grid
                item
                justify="center"
                alignItems="center"
                container
                lg={12}
                md={12}
                sm={12}
              >
                <Grid item lg={1} md={12}>
                  <MuiThemeProvider theme={theme}>
                    <div
                      style={{
                        ...Estilos.flexRowStandard,
                        marginTop: '20px',
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
                            totalFrete: this.state.priceFrete,
                            endereco: {
                              telefone: this.state.telefone,
                              bairro: this.state.bairro,
                              rua: this.state.rua,
                              cpf: this.state.cpf,
                              cidade: this.state.cidade,
                              numero: this.state.numero,
                              complemento: this.state.complemento,
                              nome: this.state.nome + '' + this.state.sobrenome,
                            },
                          },
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            width: 120,
                            height: 50,
                            textDecoration: 'none',
                          }}
                          onClick={() => {
                            this.enviar();
                          }}
                          href="/checkout"
                        >
                          Continuar
                        </Button>
                      </Link>
                    </div>
                  </MuiThemeProvider>
                </Grid>
              </Grid>
            </>
          )}
        </Container>
        <Footer />
      </>
    );
  }
}
export default Endereco;
