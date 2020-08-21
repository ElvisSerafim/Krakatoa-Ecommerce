import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAllProducts } from '../reducers/productsCart';
import InputMask from 'react-input-mask';
import { useLocation } from 'react-router-dom';
import {
  InputLabel,
  FormControl,
  Paper,
  Select,
  MenuItem,
  makeStyles,
  Grid,
  Typography,
  Button,
  TextField,
} from '@material-ui/core/';
import { credito, debito } from '../Services/pagar';
import api from '../Services/ApiService';
import Alerta from '../components/Alerta';
const useStyles = makeStyles(() => ({
  inputLabel: {
    color: '#44323D',
  },
}));
const Checkout = () => {
  const allProducts = useSelector((state) => state.productsCart);
  const token = useSelector((state) => state.user.token);
  const [produtosPedidos, setProdutosPedidos] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    let totalAux = location.state.total;
    let arrayAux = [];
    allProducts.map((item) => {
      let produto = {};
      produto.quantidadePedido = item.quantidadePedido;
      produto.tamanhoEscolhido = item.tamanhoEscolhido;
      produto.produto_id = item.produto_id;
      arrayAux.push(produto);
    });
    setTotal(totalAux);
    setProdutosPedidos(arrayAux);
  }, []);
  const classes = useStyles();
  const handleChangeBandeira = (event) => {
    setFlag(event.target.value);
  };
  const handleChangeCartao = (event) => {
    setCartao(event.target.value);
  };
  const location = useLocation();
  const [pag, setPag] = useState(0);
  const [code, setCode] = useState(0);
  const [tid, setTid] = useState(0);
  const [flag, setFlag] = useState('Nenhum');
  const [cartao, setCartao] = useState('Nenhum');
  const [numero, setNumero] = useState(0);
  const [cvv, setCvv] = useState(0);
  const [data, setData] = useState('');
  const [nome, setNome] = useState('');
  const [open, setOpen] = useState(false);
  const [status, Setstatus] = useState('error');
  const [msg, setMsg] = useState('Erro');
  const [returnMsg, setReturn]=useState('Aguarde...')
  const [total, setTotal] = useState(0);
  let dado;
  let generateSafeId = require('generate-safe-id');
  let id;
  const pagar = async () => {
    id = generateSafeId();
    if (cartao === 'CreditCard') {
      dado = await credito(nome, total, numero, nome, data, cvv, id, flag);
      if (dado.payment.returnCode == 0 || dado.payment.returnCode == 11) {
        setPag(1);
        setCode('Sucesso, volte sempre!');
        setTid(dado.payment.paymentId);

        let dataa = {
          precoTotal: total,
          frete: location.state.frete,
          data: '12/12/2122',
          produtos: produtosPedidos,
          metodo: 'cartaoCredito',
          idPedido: id,
          idPagamento: dado.payment.paymentId,
          token: token,
        };
        const request = await api.enviarPedido(dataa);
        dispatch(removeAllProducts());
      } else {
        setCode('Ocorreu um erro na transação');
        setTid('Transação falha');
      }
    } else if (cartao == 'DebitCard') {
      dado = await debito(nome, total, numero, nome, data, cvv, id, flag);
      window.open(dado.payment.authenticationUrl);
      setPag(1);
      setCode(
        'Você será redirecionado para a pagina do seu provedor para terminar o pagamento',
      );
      setTid(dado.payment.paymentId);

      let dataa = {
        precoTotal: total,
        frete: location.state.frete,
        data: '12/12/2122',
        produtos: produtosPedidos,
        metodo: 'cartaoCredito',
        idPedido: id,
        idPagamento: dado.payment.paymentId,
        token: token,
      };
      const request = await api.enviarPedido(dataa);
    }
  };
  return (
    <>
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
      <Grid item container xs={12} justify="center" style={{ marginTop: 20 }}>
        <Paper
          elevation={3}
          style={{ backgroundColor: '#D2C9C7', height: 710, width: '95%' }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h1"
              style={{
                paddingBottom: 20,
                paddingTop: 30,
                textAlign: 'center',
                color: '#44323D',
              }}
            >
              Pagamento
            </Typography>
          </Grid>
          {pag === 0 ? (
            <>
              <Grid container item justify="center" xs={12}>
                <FormControl variant="outlined" style={{ width: '77%' }}>
                  <InputLabel style={{ color: '#44323D' }}>
                    Bandeira do cartão
                  </InputLabel>
                  <Select
                    onChange={handleChangeBandeira}
                    value={flag}
                    label="Bandeira do cartão"
                  >
                    <MenuItem value={'Nenhum'}></MenuItem>
                    <MenuItem value={'VISA'}>Visa</MenuItem>
                    <MenuItem value={'MASTER'}>Mastercard</MenuItem>
                    <MenuItem value={'HIPERCARD'}>Hipercard</MenuItem>
                    <MenuItem value={'ELO'}>Elo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                container
                item
                justify="center"
                style={{ paddingTop: 10 }}
                xs={12}
              >
                <FormControl variant="outlined" style={{ width: '77%' }}>
                  <InputLabel style={{ color: '#44323D' }}>
                    Meio de pagamento
                  </InputLabel>
                  <Select
                    onChange={handleChangeCartao}
                    value={cartao}
                    label="Meio de pagamento"
                  >
                    <MenuItem value={'Nenhum'}></MenuItem>
                    <MenuItem value={'CreditCard'}>Crédito</MenuItem>
                    <MenuItem value={'DebitCard'}>Débito</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ paddingTop: 10 }}
                container
                justify="center"
              >
                <TextField
                  InputLabelProps={{ classes: { root: classes.inputLabel } }}
                  defaultValue={nome}
                  variant="outlined"
                  label="Nome no cartão *"
                  onChange={(event) => setNome(event.target.value)}
                  style={{ width: '77%', color: 'black' }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ paddingTop: 10 }}
                container
                justify="center"
              >
                <TextField
                  InputLabelProps={{ classes: { root: classes.inputLabel } }}
                  defaultValue={numero}
                  onChange={(event) => setNumero(event.target.value)}
                  variant="outlined"
                  style={{ width: '77%' }}
                  type="number"
                  label="Numero do cartão *"
                />
              </Grid>
              <Grid item xs={12} container justify="center">
                <InputMask
                  mask="99/9999"
                  onChange={(event) => setData(event.target.value)}
                >
                  {() => (
                    <TextField
                      style={{ width: '77%' }}
                      label="Data de expiração *"
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
              <Grid
                item
                xs={12}
                style={{ paddingTop: 10 }}
                container
                justify="center"
              >
                <TextField
                  InputLabelProps={{ classes: { root: classes.inputLabel } }}
                  defaultValue={cvv}
                  style={{ width: '77%' }}
                  onChange={(event) => setCvv(event.target.value)}
                  variant="outlined"
                  type="number"
                  label="Código de segurança *"
                />
              </Grid>
              <Typography
                style={{
                  textAlign: 'center',
                  paddingTop: 15,
                  fontSize: '1.0em',
                }}
              >
                Total: R${total / 100}
              </Typography>
              <Grid
                item
                xs={12}
                style={{ paddingTop: 10 }}
                container
                justify="center"
              >
                <Button
                  style={{
                    backgroundColor: '#44323D',
                    width: '40%',
                    color: 'white',
                  }}
                  onClick={() => {
                    if (flag === 'Nenhum') {
                      Setstatus('error');
                      setMsg('Por favor, insira a bandeira do cartão');
                      setOpen(true);
                    } else if (cartao === 'Nenhum') {
                      Setstatus('error');
                      setMsg('Por favor, insira o tipo de cartão');
                      setOpen(true);
                    } else if (nome.length == 0) {
                      Setstatus('error');
                      setMsg('Por favor, insira o nome que está no cartão');
                      setOpen(true);
                    } else if (numero.toString().length != 16) {
                      Setstatus('error');
                      setMsg('Por favor, insira um número de cartão válido');
                      setOpen(true);
                    } else if (data.length != 7) {
                      Setstatus('error');
                      setMsg(
                        'Por favor, insira uma data de expiração válida do cartão',
                      );
                      setOpen(true);
                    } else if (data.indexOf('/') == -1) {
                      Setstatus('error');
                      setMsg(
                        'Por favor, insira uma barra para separar o mês e o ano',
                      );
                      setOpen(true);
                    } else if (cvv.toString().length != '3') {
                      Setstatus('error');
                      setMsg(
                        'Por favor, insira um código de segurança válido!',
                      );
                      setOpen(true);
                    } else {
                      pagar();
                    }
                  }}
                >
                  Finalizar
                </Button>
              </Grid>
            </>
          ) : (
            //1234567890123450
            <>
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  style={{
                    paddingTop: 50,
                    color: '#44323D',
                    textAlign: 'center',
                  }}
                >
                  Estatus da transação: {code}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  style={{
                    paddingTop: 20,
                    color: '#44323D',
                    textAlign: 'center',
                  }}
                >
                  Código do pagamento: {tid}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  style={{
                    paddingTop: 20,
                    color: '#44323D',
                    textAlign: 'center',
                  }}
                >
                  Grave esse código!
                </Typography>
              </Grid>
              <Grid item xs={12}>
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
            </>
          )}
        </Paper>
      </Grid>
    </>
  );
};
export default Checkout;
