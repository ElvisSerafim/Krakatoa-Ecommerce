/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import InputMask from 'react-input-mask';
import { useLocation } from 'react-router-dom';

import {
  InputLabel,
  FormControl,
  Paper,
  Select,
  Container,
  MenuItem,
  Hidden,
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Typography,
  Button,
  Box,
  TextField,
} from '@material-ui/core/';
import Checkout2 from '../components/Checkout';
import { removeAllProducts } from '../reducers/productsCart';

import visa from '../img/visa.png';
import elo from '../img/elo.png';
import Alerta from '../components/Alerta';
import hipercard from '../img/hipercard.png';
import mastercard from '../img/mastercard.png';
import { credito, debito, cancelar } from '../Services/pagar';
import withAnimation from '../higherComponents/withAnimation';
import api from '../Services/ApiService';
import withNav from '../higherComponents/withNav';

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
  payment: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 200,
    backgroundColor: 'red',
    color: 'white',
  },
  width40: { width: '40%' },
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  inputLabel: {
    color: '#44323D',
  },
}));

function getSteps() {
  return ['Meios de pagamentos', 'Detalhes do pagamento', 'Resumo'];
}
function getStepContent(
  allProducts,
  frete,
  token,
  produtosPedidos,
  classes,
  setCode,
  setTid,
  total,
  setOpen,
  setMsg,
  setStatus,
  numero,
  setNumero,
  cvv,
  setCvv,
  nome,
  setNome,
  data,
  setData,
  activeStep,
  steps,
  handleNext,
  handleBack,
  cartao,
  handleChange,
  stepIndex,
  v,
  m,
  h,
  e,
  flag,
  setS,
  setV,
  setM,
  setH,
  setE,
  setReturn,
  dispatch,
) {
  let dado;
  const generateSafeId = require('generate-safe-id');
  let id;

  const pagar = async () => {
    id = generateSafeId();
    if (cartao === 'CreditCard') {
      dado = await credito(nome, total, numero, nome, data, cvv, id, flag);
      if (
        dado.payment.returnCode === '00' ||
        dado.payment.returnCode === '11'
      ) {
        setTid(dado.payment.paymentId);
        // Enviar Pedido
        const dataa = {
          precoTotal: total,
          frete,
          data: '12/12/2122',
          produtos: produtosPedidos,
          metodo: 'cartaoCredito',
          idPedido: id,
          idPagamento: dado.payment.paymentId,
          token,
        };
        try {
          const request = await api.enviarPedido(dataa);
          if (!request.ok) {
            throw Error(request);
          }
          setOpen(true);
          setCode('Sucesso, volte sempre!');
          setMsg('Compra efetuada com sucesso!');
          setStatus('success');
          dispatch(removeAllProducts());
        } catch (error) {
          setOpen(true);
          setCode('Erro, seu pagamento sera estornado.');
          setMsg('Ocorreu um erro, seu pagamento sera estornado.');
          setStatus('error');
          const teste = await cancelar(dado.payment.paymentId);
          console.log(teste);
        }
      } else {
        setCode('Ocorreu um erro na transa????o');
        setTid('Transa????o falha');
      }
      setReturn(dado.payment.returnMessage);
    } else if (cartao === 'DebitCard') {
      dado = await debito(nome, total, numero, nome, data, cvv, id, flag);
      window.open(dado.payment.authenticationUrl);
      setCode(
        'Voc?? ser?? redirecionado para a pagina do seu provedor para terminar o pagamento',
      );
      setTid(dado.payment.paymentId);
      setReturn(dado.payment.returnMessage);
      const dataa = {
        precoTotal: total,
        frete,
        data: '12/12/2122',
        produtos: produtosPedidos,
        metodo: 'cartaoDebito',
        idPedido: id,
        idPagamento: dado.payment.paymentId,
        token,
      };
      try {
        const request = await api.enviarPedido(dataa);
        if (!request.ok) {
          throw Error(request);
        }
        setOpen(true);
        setMsg('Compra efetuada com sucesso!');
        setStatus('success');
        dispatch(removeAllProducts());
      } catch (error) {
        setOpen(true);
        setMsg('Ocorreu um erro, seu pagamento sera estornado.');
        setStatus('error');
        cancelar(dado.payment.paymentId);
      }
    }
  };

  switch (stepIndex) {
    case 0:
      return (
        <>
          <div style={{ height: 20 }} />
          <Typography
            variant="h1"
            style={{ textAlign: 'center', color: '#44323D' }}
          >
            SELECIONE UM MEIO DE PAGAMENTO
          </Typography>
          <Grid
            item
            container
            style={{ paddingTop: 30, paddingBottom: 30 }}
            lg={12}
            justify="center"
            alignItems="center"
          >
            <Grid item lg={2} item>
              <Paper
                elevation={v}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#D2C9C7',
                  width: 100,
                  height: 60,
                }}
              >
                <img
                  onClick={() => {
                    setS('VISA');
                    setV(0);
                    setM(3);
                    setH(3);
                    setE(3);
                  }}
                  alt="Cart??o Visa"
                  style={{ padding: 5 }}
                  src={visa}
                />
              </Paper>
            </Grid>
            <Grid item lg={2} item>
              <Paper
                elevation={m}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#D2C9C7',
                  width: 100,
                  height: 60,
                }}
              >
                <img
                  onClick={() => {
                    setS('MASTER');
                    setV(3);
                    setM(0);
                    setH(3);
                    setE(3);
                  }}
                  alt="Cart??o MasterCard"
                  src={mastercard}
                  style={{ padding: 5 }}
                />
              </Paper>
            </Grid>
            <Grid item lg={2} item>
              <Paper
                elevation={h}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#D2C9C7',
                  width: 120,
                  height: 60,
                }}
              >
                <img
                  onClick={() => {
                    setS('HIPERCARD');
                    setV(3);
                    setM(3);
                    setH(0);
                    setE(3);
                  }}
                  alt="Cart??o HiperCard"
                  src={hipercard}
                  style={{ padding: 5 }}
                />
              </Paper>
            </Grid>
            <Grid item lg={2}>
              <Paper
                elevation={e}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#D2C9C7',
                  width: 100,
                  height: 60,
                }}
              >
                <img
                  onClick={() => {
                    setS('ELO');
                    setV(3);
                    setM(3);
                    setH(3);
                    setE(0);
                  }}
                  src={elo}
                  alt="Cart??o Elo"
                  style={{ padding: 8 }}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid item container lg={12} justify="center" />
          <Grid
            item
            container
            justify="center"
            lg={12}
            style={{ paddingRight: 30, paddingTop: 20 }}
          >
            <FormControl variant="outlined" style={{ width: 500 }}>
              <InputLabel style={{ color: '#44323D' }}>
                Tipo de cart??o
              </InputLabel>
              <Select
                onChange={handleChange}
                value={cartao}
                label="Tipo de cart??o"
              >
                <MenuItem value="CreditCard">CR??DITO</MenuItem>
                <MenuItem value="DebitCard">D??BITO</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <div style={{ paddingTop: 20 }} />
          <Grid item lg={12} justify="space-between" container>
            <Grid item lg={1} container />
            <Grid item lg={2} container>
              <Button
                style={{ color: '#44323D' }}
                disabled
                onClick={handleBack}
              >
                Voltar
              </Button>
            </Grid>
            <Grid item lg={4} container>
              <Button
                style={{ color: 'white', backgroundColor: '#44323D' }}
                variant="contained"
                onClick={() => {
                  if (cartao !== 'CreditCard' && cartao !== 'DebitCard') {
                    setStatus('error');
                    setMsg(
                      'Por favor, selecione o tipo do seu cart??o: cr??dito ou d??bito',
                    );
                    setOpen(true);
                  } else if (flag === 'Nenhum') {
                    setStatus('error');
                    setMsg('Por favor, selecione a bandeira do seu cart??o');
                    setOpen(true);
                  } else {
                    handleNext();
                  }
                }}
              >
                Pr??ximo
              </Button>
            </Grid>
          </Grid>
        </>
      );
    case 1:
      return (
        <>
          <Box
            borderRadius={12}
            style={{ marginLeft: 35, height: '45%', width: '90%' }}
          >
            <Typography
              style={{ color: '#44323D', paddingTop: 20, textAlign: 'center' }}
              variant="h1"
            >
              Detalhes do cart??o
            </Typography>
            <div style={{ height: 20 }} />
            <Grid
              item
              container
              justify="center"
              style={{ paddingLeft: 20 }}
              lg={12}
            >
              <Grid item lg={5}>
                <TextField
                  InputLabelProps={{ classes: { root: classes.inputLabel } }}
                  defaultValue={nome}
                  variant="outlined"
                  label="Nome no cart??o *"
                  onChange={(event) => setNome(event.target.value)}
                  style={{ width: 250, color: 'black' }}
                />
              </Grid>
              <Grid item lg={5}>
                <TextField
                  InputLabelProps={{ classes: { root: classes.inputLabel } }}
                  defaultValue={numero}
                  onChange={(event) => setNumero(event.target.value)}
                  variant="outlined"
                  style={{ width: 266 }}
                  type="number"
                  label="Numero do cart??o *"
                />
              </Grid>
              <Grid item lg={5}>
                <InputMask
                  mask="99/9999"
                  onChange={(event) => setData(event.target.value)}
                >
                  {() => (
                    <TextField
                      style={{ width: '92%' }}
                      label="Data de expira????o *"
                      margin="normal"
                      InputLabelProps={{
                        classes: { root: classes.inputLabel },
                      }}
                      variant="outlined"
                      type="text"
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item lg={5} style={{ paddingTop: 17 }}>
                <TextField
                  defaultValue={cvv}
                  style={{ width: '98%' }}
                  onChange={(event) => setCvv(event.target.value)}
                  InputLabelProps={{ classes: { root: classes.inputLabel } }}
                  variant="outlined"
                  type="number"
                  label="C??digo de seguran??a *"
                />
              </Grid>
            </Grid>
          </Box>
          <Grid item lg={12} justify="space-between" container>
            <Grid item lg={1} container />
            <Grid item lg={2} container>
              <Button
                style={{ fontWeight: 'bold', color: '#44323D' }}
                onClick={handleBack}
              >
                Voltar
              </Button>
            </Grid>
            <Grid item lg={4} container>
              <Button
                style={{ color: 'white', backgroundColor: '#44323D' }}
                variant="contained"
                onClick={() => {
                  if (nome.length === 0) {
                    setStatus('error');
                    setMsg('Por favor, insira o nome que est?? no cart??o');
                    setOpen(true);
                  } else if (numero.toString().length !== 16) {
                    setStatus('error');
                    setMsg('Por favor, insira o n??mero do cart??o');
                    setOpen(true);
                  } else if (data.length !== 7) {
                    setStatus('error');
                    setMsg(
                      'Por favor, insira uma data de expira????o v??lida do cart??o',
                    );
                    setOpen(true);
                  } else if (data.indexOf('/') === -1) {
                    setStatus('error');
                    setMsg(
                      'Por favor, insira uma barra para separar o m??s e o ano',
                    );
                    setOpen(true);
                  } else if (cvv.toString().length !== 3) {
                    setStatus('error');
                    setMsg('Por favor, insira um c??digo de seguran??a v??lido!');
                    setOpen(true);
                  } else {
                    handleNext();
                  }
                }}
              >
                Pr??ximo
              </Button>
            </Grid>
          </Grid>
          <hr style={{ width: '70%', marginTop: 20 }} />
        </>
      );
    case 2:
      return (
        <>
          <Box
            borderRadius={12}
            style={{ marginLeft: 35, height: '45%', width: '90%' }}
          >
            <Typography
              variant="h1"
              style={{ paddingTop: 20, color: '#44323D', textAlign: 'center' }}
            >
              Resumo do cart??o
            </Typography>
            <div style={{ height: 20 }} />
            <Grid item container lg={12} style={{ paddingLeft: 60 }}>
              <Grid item lg={6} container>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    paddingTop: 20,
                    paddingLeft: 20,
                    color: '#44323D',
                  }}
                >
                  BANDEIRA : {flag}
                </Typography>
              </Grid>
              <Grid item lg={6} container>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    paddingTop: 20,
                    paddingLeft: 20,
                    color: '#44323D',
                  }}
                >
                  TIPO DE CART??O : {cartao}
                </Typography>
              </Grid>
              <Grid item lg={6} container>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    paddingTop: 20,
                    paddingLeft: 20,
                    color: '#44323D',
                  }}
                >
                  NOME NO CART??O : {nome}
                </Typography>
              </Grid>
              <Grid item lg={6} container>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    paddingTop: 20,
                    paddingLeft: 20,
                    color: '#44323D',
                  }}
                >
                  N??MERO DO CART??O : {numero}
                </Typography>
              </Grid>
              <Grid item lg={6} container>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    paddingTop: 20,
                    paddingLeft: 20,
                    color: '#44323D',
                  }}
                >
                  C??DIGO DE SEGURAN??A : {cvv}
                </Typography>
              </Grid>
              <Grid item lg={6} container>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    paddingTop: 20,
                    paddingLeft: 20,
                    color: '#44323D',
                  }}
                >
                  DATA : {data}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid
            item
            lg={12}
            style={{ paddingTop: 20 }}
            justify="space-between"
            container
          >
            <Grid item lg={1} container />
            <Grid item lg={2} container>
              <Button
                style={{ fontWeight: 'bold', color: '#44323D' }}
                onClick={handleBack}
              >
                Voltar
              </Button>
            </Grid>
            <Typography
              style={{ textAlign: 'center', paddingTop: 15, fontSize: '1.0em' }}
            >
              Total: R${total / 100}
            </Typography>
            <Grid item lg={4} container>
              <Button
                style={{ color: 'white', backgroundColor: '#44323D' }}
                variant="contained"
                onClick={() => {
                  handleNext();
                  pagar();
                }}
              >
                Finalizar
              </Button>
            </Grid>
          </Grid>
          <hr style={{ width: '70%', marginTop: 20 }} />
        </>
      );

    default:
      return 'Unknown stepIndex';
  }
}
const Checkout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productsCart);
  const [produtosPedidos, setProdutosPedidos] = useState([]);
  const [cartao, setCartao] = React.useState('Nenhum');
  const handleChange = (event) => {
    setCartao(event.target.value);
  };
  const classes = useStyles();
  const [code, setCode] = useState(0);
  const [tid, setTid] = useState(0);
  const [open, setOpen] = useState(false);
  const [status, Setstatus] = useState('error');
  const [msg, setMsg] = useState('Erro');
  const [numero, setNumero] = useState(0);
  const [cvv, setCvv] = useState(0);
  const [data, setData] = useState('');
  const [nome, setNome] = useState('');
  const [selectedFlag, setSelectedFlag] = useState('Nenhum');
  const [visaElev, setVisaElev] = useState(3);
  const [hiperElev, setHiperElev] = useState(3);
  const [eloElev, setEloElev] = useState(3);
  const [masterElev, setMasterElev] = useState(3);
  const [activeStep, setActiveStep] = React.useState(0);
  const [total, setTotal] = useState(0);
  const [returnMsg, setReturn] = useState('Aguarde...');
  const steps = getSteps();
  const token = useSelector((state) => state.user.token);
  const [frete, setFrete] = useState(location.state.frete);

  useEffect(() => {
    const totalAux = location.state.total;
    const arrayAux = [];
    allProducts.forEach((item) => {
      const produto = {};
      produto.quantidadePedido = item.quantidadePedido;
      produto.nome = item.nome;
      produto.tamanhoEscolhido = item.tamanhoEscolhido.includes('??nico')
        ? '??nico'
        : item.tamanhoEscolhido.replace(/[^a-z]/gi, '');
      produto.produto_id = item.produto_id;
      arrayAux.push(produto);
    });
    setTotal(totalAux);
    setProdutosPedidos(arrayAux);
  }, []);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Alerta
          openAlert={open}
          message={msg}
          status={status}
          handleClose={(event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            setOpen(false);
          }}
          vertical="top"
          horizontal="right"
        />
        <Grid
          item
          justify="center"
          container
          spacing={2}
          style={{ marginTop: 64, marginBottom: 64 }}
        >
          <Hidden mdDown>
            <Paper
              elevation={3}
              style={{ backgroundColor: '#D2C9C7', height: 600, width: '62%' }}
            >
              <Grid item lg={12}>
                <div style={{ height: 30 }} />
              </Grid>
              <Grid item lg={12} container justify="center" alignItems="center">
                <div className={classes.root}>
                  <Stepper
                    style={{ backgroundColor: '#D2C9C7' }}
                    activeStep={activeStep}
                    alternativeLabel
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
              </Grid>
              {activeStep === steps.length ? (
                <>
                  <Grid item lg={12}>
                    <Typography
                      variant="h1"
                      style={{
                        paddingTop: 10,
                        color: '#44323D',
                        textAlign: 'center',
                      }}
                    >
                      Seu pagamento est?? sendo autenticado, por favor aguarde!
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography
                      variant="h1"
                      style={{
                        paddingTop: 50,
                        color: '#44323D',
                        textAlign: 'center',
                      }}
                    >
                      Estatus da transa????o: {code}
                    </Typography>
                    <Grid item lg={12}>
                      <Typography
                        variant="h1"
                        style={{
                          paddingTop: 20,
                          color: '#44323D',
                          textAlign: 'center',
                        }}
                      >
                        C??digo do pagamento: {tid}
                      </Typography>
                    </Grid>
                    <Grid item lg={12}>
                      <Typography
                        variant="h1"
                        style={{
                          paddingTop: 20,
                          color: '#44323D',
                          textAlign: 'center',
                        }}
                      >
                        Grave esse c??digo!
                      </Typography>
                    </Grid>
                    <Grid item lg={12}>
                      <Typography
                        variant="h1"
                        style={{
                          paddingTop: 20,
                          color: '#8C0705',
                          textAlign: 'center',
                        }}
                      >
                        Resposta do provedor: {returnMsg}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  {getStepContent(
                    allProducts,
                    frete,
                    token,
                    produtosPedidos,
                    classes,
                    setCode,
                    setTid,
                    total,
                    setOpen,
                    setMsg,
                    Setstatus,
                    numero,
                    setNumero,
                    cvv,
                    setCvv,
                    nome,
                    setNome,
                    data,
                    setData,
                    activeStep,
                    steps,
                    handleNext,
                    handleBack,
                    cartao,
                    handleChange,
                    activeStep,
                    visaElev,
                    masterElev,
                    hiperElev,
                    eloElev,
                    selectedFlag,
                    setSelectedFlag,
                    setVisaElev,
                    setMasterElev,
                    setHiperElev,
                    setEloElev,
                    setReturn,
                    dispatch,
                  )}
                </>
              )}
            </Paper>
          </Hidden>
          <Hidden lgUp>
            <Checkout2 />
          </Hidden>
        </Grid>
      </Container>
    </>
  );
};
export default withNav(withAnimation(Checkout));
