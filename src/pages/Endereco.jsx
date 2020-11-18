import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  Backdrop,
  CircularProgress,
  makeStyles,
} from '@material-ui/core/';
import { useSelector } from 'react-redux';
import InputMask from 'react-input-mask';
import { useForm, Controller } from 'react-hook-form';
import api from '../Services/ApiService';
import Alerta from '../components/Alerta';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Endereco = ({ location, history }) => {
  const Redux = useSelector((state) => state.user);
  const products = useSelector((state) => state.productsCart);
  const { token, user: usuario } = Redux;
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [dadosEntrega, setDadosEntrega] = useState('');
  const [pricePac, setpricePac] = useState('');
  const [priceSedex, setpriceSedex] = useState('');
  const [priceFrete, setpriceFrete] = useState('');
  const [diasUteisPac, setDiasUteisPac] = useState('');
  const [diasUteisSedex, setDiasUteisSedex] = useState('');
  const [deliverySelected, setDeliverySelected] = useState('');
  const [opacityPac, setOpacityPac] = useState(0.5);
  const [opacitySedex, setOpacitySedex] = useState(0.5);
  const [pesoTotal, setPesoTotal] = useState(0);
  const [altura, setAltura] = useState(0);
  const classes = useStyles();
  const [flagRecalcular, setFlagRecalcular] = useState(false);
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      telefone: usuario.telefone ? usuario.telefone : '',
      nome: usuario.nome ? usuario.nome : '',
      estado: usuario.endereco ? usuario.endereco.estado : '',
      cep: usuario.endereco ? usuario.endereco.cep : '',
      cpf: usuario.cpf ? usuario.cpf : '',
      bairro: usuario.endereco ? usuario.endereco.bairro : '',
      cidade: usuario.endereco ? usuario.endereco.cidade : '',
      rua: usuario.endereco ? usuario.endereco.rua : '',
      numero: usuario.endereco ? usuario.endereco.numero : '',
      complemento: usuario.endereco ? usuario.endereco.complemento : '',
    },
  });

  const enviar = async (data) => {
    try {
      var cepEnvio;
      if (data.cep.length === 9) {
        cepEnvio = data.cep.replace('-', '');
      } else {
        cepEnvio = data.cep;
      }

      switch (true) {
        case data.nome.length === 0:
          throw new Error('Insira seu nome!');
        case data.telefone.toString().length !== 14:
          throw new Error(
            'Você deve inserir um número de telefone válido com DDD',
          );
        case data.cpf.toString().replace(/[^0-9a-z]/gi, '').length !== 11:
          throw new Error('CPF inválido!');
        case cepEnvio.length !== 8:
          throw new Error('CEP inválido!');
        case data.bairro.length === 0:
          throw new Error('Insira seu bairro!');
        case data.cidade.length === 0:
          throw new Error('Insira sua cidade!');
        case data.numero.length === 0:
          throw new Error('Insira o número da sua casa!');
        case data.rua.length === 0:
          throw new Error('Insira sua rua!');
        case deliverySelected === '':
          throw new Error('Escolha uma Forma de Entrega');
        case cepEnvio !== location.state.cepEndereco:
          if (flagRecalcular === false) {
            throw new Error('Recalculando !');
          }
        default:
          break;
      }
      const request = await api.UsuarioEndereco({ data, token });
      if (request) {
        setOpen(true);
        setStatus('success');
        setMessage('Boas compras!');
        const {
          telefone,
          bairro,
          rua,
          cpf,
          cidade,
          numero,
          complemento,
          cep,
          nome,
        } = data;

        setTimeout(
          history.push({
            pathname: '/sumario',
            state: {
              totalPedido: location.state.totalPedido,
              cepEndereco: cepEnvio,
              dadosCep: dadosEntrega,
              altura: location.state.altura,
              peso: location.state.pesoTotal,
              entregaSelecionada: deliverySelected,
              totalFrete: priceFrete,
              endereco: {
                telefone,
                bairro,
                rua,
                cpf,
                cidade,
                numero,
                complemento,
                nome,
              },
            },
          }),
          2000,
        );
      }
    } catch (error) {
      setOpen(true);
      setStatus('error');
      setMessage(error.message);
      if (error.message === 'Recalculando !') {
        setOpenBackdrop(true);
        setFlagRecalcular(true);
        getDadosFrete(cepEnvio);
      }
    }
  };

  const getInformaçõesLocal = async (localCep) => {
    const requestLocal = await api.getLocalEntrega(localCep);
    setValue('cep', localCep);
    setValue('bairro', requestLocal.bairro);
    setValue('cidade', requestLocal.localidade);
    setValue('rua', requestLocal.logradouro);
    setValue('estado', requestLocal.uf);
  };
  const getDadosFrete = async (cepCalcular) => {
    const data = {
      cepDestino: cepCalcular,
      valorDeclarado: location.state.totalPedido,
      peso: location.state.peso,
      altura: location.state.altura,
    };
    const request = await api.CalcPrazoPreco(data);
    setDadosEntrega(request);
    setDiasUteisSedex(request.tempo[0].prazoEntrega);
    setDiasUteisPac(request.tempo[1].prazoEntrega);
    setpriceSedex(request.sedex[0].valor);
    setpricePac(request.pac[0].valor);
    setOpenBackdrop(false);
  };

  useEffect(() => {
    try {
      getInformaçõesLocal(location.state.cepEndereco);
      setDadosEntrega(location.state.dadosCep);
      setDiasUteisSedex(location.state.dadosCep.tempo[0].prazoEntrega);
      setDiasUteisPac(location.state.dadosCep.tempo[1].prazoEntrega);
      setpriceSedex(location.state.dadosCep.sedex[0].valor);
      setpricePac(location.state.dadosCep.pac[0].valor);
    } catch (error) {
      setOpen(true);
      setStatus('error');
      setMessage('Erro em Calcular o Frete');
    }
  }, [location]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {location.state === undefined ? (
        <Redirect
          to={{
            pathname: '/carrinho',
          }}
        />
      ) : (
        <>
          <Alerta
            openAlert={open}
            message={message}
            status={status}
            handleClose={handleClose}
            vertical="top"
            horizontal="right"
          />
          <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <form
            onSubmit={handleSubmit((data) => {
              if (data.cep.length === 9) {
                const cep = data.cep.replace('-', '');
                if (cep !== location.state.cepEndereco) {
                  getDadosFrete(cep);
                }
              }
              enviar(data);
            })}
          >
            <Grid container spacing={2} style={{ marginTop: 16 }}>
              <Grid
                item
                lg={6}
                md={6}
                sm={12}
                xm={12}
                spacing={3}
                container
                direction="row"
                justify="center"
              >
                {/* Nome */}
                <Grid item lg={6} md={6} sm={6} xm={12}>
                  <TextField
                    label="Nome"
                    name="nome"
                    id="Nome"
                    type="text"
                    placeholder="Digite Seu Nome"
                    fullWidth
                    variant="filled"
                    inputRef={register}
                  />
                </Grid>
                {/* Telefone */}
                <Grid item lg={6} md={6} sm={6} xm={12}>
                  <Controller
                    as={InputMask}
                    control={control}
                    name="telefone"
                    mask="(99)99999-9999"
                    maskChar=" "
                  >
                    {() => (
                      <TextField
                        label="Telefone"
                        id="Telefone"
                        type="text"
                        placeholder="Digite Seu Telefone"
                        variant="filled"
                        numberOnly
                        fullWidth
                      />
                    )}
                  </Controller>
                </Grid>
                {/* CPF */}
                <Grid item lg={6} md={6} sm={6} xm={12}>
                  <Controller
                    as={InputMask}
                    control={control}
                    mask="999.999.999-99"
                    name="cpf"
                    maskChar=" "
                  >
                    {() => (
                      <TextField
                        label="CPF"
                        id="CPF"
                        type="text"
                        placeholder="Digite Seu CPF"
                        variant="filled"
                        fullWidth
                      />
                    )}
                  </Controller>
                </Grid>
                {/* CEP */}
                <Grid item lg={6} md={6} sm={6} xm={12}>
                  <Controller
                    control={control}
                    as={InputMask}
                    mask="99999-999"
                    disabled={false}
                    maskChar=" "
                    name="cep"
                  >
                    {() => (
                      <TextField
                        label="CEP"
                        id="CEP"
                        type="text"
                        placeholder="Digite Seu CEP"
                        variant="filled"
                        fullWidth
                      />
                    )}
                  </Controller>
                </Grid>
                {/* Bairro */}
                <Grid item lg={6} md={6} sm={6} xm={12}>
                  <Controller
                    as={TextField}
                    control={control}
                    label="Bairro"
                    name="bairro"
                    id="Bairro"
                    type="text"
                    placeholder="Digite Seu Bairro"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                {/* Cidade */}
                <Grid item lg={6} md={6} sm={6} xm={12}>
                  <Controller
                    as={TextField}
                    control={control}
                    label="Cidade"
                    name="cidade"
                    id="Cidade"
                    type="text"
                    placeholder="Digite Seu Cidade"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                {/* Rua */}
                <Grid item lg={6} md={6} sm={6} xm={12}>
                  <Controller
                    as={TextField}
                    control={control}
                    label="Rua"
                    name="rua"
                    id="Rua"
                    type="text"
                    placeholder="Digite Seu Rua"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                {/* Numero */}
                <Grid item lg={6} md={6} sm={6} xm={12}>
                  <Controller
                    as={TextField}
                    control={control}
                    label="Numero"
                    name="numero"
                    id="Numero"
                    type="text"
                    placeholder="Digite Seu Numero"
                    variant="filled"
                    fullWidth
                    numberOnly
                  />
                </Grid>
                {/* Complemento */}
                <Grid item lg={6} md={6} sm={6} xm={12}>
                  <Controller
                    as={TextField}
                    control={control}
                    TextField
                    label="Complemento"
                    name="complemento"
                    id="Complemento"
                    type="text"
                    placeholder="Digite Seu Complemento"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                {/* Estado */}
                <Grid item lg={6} md={6} sm={6} xm={12}>
                  <Controller
                    as={InputMask}
                    control={control}
                    mask="aa"
                    name="estado"
                    maskChar=" "
                  >
                    {() => (
                      <TextField
                        label="Estado"
                        id="Estado"
                        type="text"
                        placeholder="Digite Seu Estado"
                        variant="filled"
                        fullWidth
                      />
                    )}
                  </Controller>
                </Grid>
              </Grid>
              <Grid container item lg={6} md={6} sm={12} xm={12}>
                <Grid item lg={12} md={12} sm={12} xm={12}>
                  <Typography
                    color="secondary"
                    variant="h4"
                    style={{ textAlign: 'center' }}
                  >
                    Tipo de entrega
                  </Typography>
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
                  <Grid item lg={6} md={6} sm={4}>
                    <Box
                      onClick={() => {
                        setDeliverySelected('Pac');
                        setOpacitySedex(0.5);
                        setOpacityPac(1);
                        setpriceFrete(pricePac);
                      }}
                      display="flex"
                      style={{
                        cursor: 'pointer',
                        opacity: opacityPac,
                      }}
                      flexDirection="column"
                      alignItems="center"
                      borderRadius={16}
                    >
                      <Typography>Pac</Typography>
                      <Typography>{diasUteisPac} dias úteis</Typography>
                      <Typography>{pricePac}</Typography>
                    </Box>
                  </Grid>

                  <Grid item lg={6} md={6} sm={4}>
                    <Box
                      onClick={() => {
                        setDeliverySelected('Sedex');
                        setOpacitySedex(1);
                        setOpacityPac(0.5);
                        setpriceFrete(priceSedex);
                      }}
                      style={{
                        cursor: 'pointer',
                        opacity: opacitySedex,
                        border: 3,
                        padding: 40,
                      }}
                      display="flex"
                      borderRadius={16}
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Typography>Sedex</Typography>
                      <Typography>{diasUteisSedex} dias úteis</Typography>
                      <Typography>{priceSedex}</Typography>
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
                  <Grid item lg={2} md={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{
                        width: 120,
                        height: 50,
                        textDecoration: 'none',
                      }}
                    >
                      Continuar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </>
  );
};
export default withNav(withAnimation(Endereco));
