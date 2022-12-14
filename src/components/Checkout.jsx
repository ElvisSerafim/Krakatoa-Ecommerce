import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { removeAllProducts } from '../reducers/productsCart';
import { credito, debito, cancelar } from '../Services/pagar';
import api from '../Services/ApiService';
import Alerta from './Alerta';

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
    const totalAux = location.state.total;
    const arrayAux = [];
    allProducts.map((item) => {
      const produto = {};
      produto.quantidadePedido = item.quantidadePedido;
      produto.nome = item.nome;
      produto.tamanhoEscolhido = item.tamanhoEscolhido.replace(/[^a-z]/gi, '');
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
  const [returnMsg, setReturn] = useState('Aguarde...');
  const [total, setTotal] = useState(0);
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
        setPag(1);
        setCode('Sucesso, volte sempre!');
        setTid(dado.payment.paymentId);

        const dataa = {
          precoTotal: total,
          frete: location.state.frete,
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
          setMsg('Compra efetuada com sucesso!');
          Setstatus('success');
          dispatch(removeAllProducts());
        } catch (error) {
          setOpen(true);
          setMsg('Ocorreu um erro, seu pagamento sera estornado.');
          Setstatus('error');
          cancelar(dado.payment.paymentId);
        }
      } else {
        setCode('Ocorreu um erro na transa????o');
        setTid('Transa????o falha');
      }
      setReturn(dado.payment.returnMessage);
    } else if (cartao === 'DebitCard') {
      dado = await debito(nome, total, numero, nome, data, cvv, id, flag);
      window.open(dado.payment.authenticationUrl);
      setPag(1);
      setCode(
        'Voc?? ser?? redirecionado para a pagina do seu provedor para terminar o pagamento',
      );
      setTid(dado.payment.paymentId);

      const dataa = {
        precoTotal: total,
        frete: location.state.frete,
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
        setMsg('Compra efetuada com sucesso!');
        Setstatus('success');
        dispatch(removeAllProducts());
      } catch (error) {
        setOpen(true);
        setMsg('Ocorreu um erro, seu pagamento sera estornado.');
        Setstatus('error');
        cancelar(dado.payment.paymentId);
      }
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
                    Bandeira do cart??o
                  </InputLabel>
                  <Select
                    onChange={handleChangeBandeira}
                    value={flag}
                    label="Bandeira do cart??o"
                  >
                    <MenuItem value="Nenhum" />
                    <MenuItem value="VISA">Visa</MenuItem>
                    <MenuItem value="MASTER">Mastercard</MenuItem>
                    <MenuItem value="HIPERCARD">Hipercard</MenuItem>
                    <MenuItem value="ELO">Elo</MenuItem>
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
                    <MenuItem value="Nenhum" />
                    <MenuItem value="CreditCard">Cr??dito</MenuItem>
                    <MenuItem value="DebitCard">D??bito</MenuItem>
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
                  label="Nome no cart??o *"
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
                  label="Numero do cart??o *"
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
                  label="C??digo de seguran??a *"
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
                      setMsg('Por favor, insira a bandeira do cart??o');
                      setOpen(true);
                    } else if (cartao === 'Nenhum') {
                      Setstatus('error');
                      setMsg('Por favor, insira o tipo de cart??o');
                      setOpen(true);
                    } else if (nome.length === 0) {
                      Setstatus('error');
                      setMsg('Por favor, insira o nome que est?? no cart??o');
                      setOpen(true);
                    } else if (numero.toString().length !== 16) {
                      Setstatus('error');
                      setMsg('Por favor, insira um n??mero de cart??o v??lido');
                      setOpen(true);
                    } else if (data.length !== 7) {
                      Setstatus('error');
                      setMsg(
                        'Por favor, insira uma data de expira????o v??lida do cart??o',
                      );
                      setOpen(true);
                    } else if (data.indexOf('/') === -1) {
                      Setstatus('error');
                      setMsg(
                        'Por favor, insira uma barra para separar o m??s e o ano',
                      );
                      setOpen(true);
                    } else if (cvv.toString().length != 3) {
                      Setstatus('error');
                      setMsg(
                        'Por favor, insira um c??digo de seguran??a v??lido!',
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
            // 1234567890123450
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
                  Estatus da transa????o: {code}
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
                  C??digo do pagamento: {tid}
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
                  Grave esse c??digo!
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
