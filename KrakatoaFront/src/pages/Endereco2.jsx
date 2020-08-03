import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Typography, Box, Button, Grid, TextField } from '@material-ui/core/';
import { useSelector } from 'react-redux';
import InputMask from 'react-input-mask';
import { useForm, Controller } from 'react-hook-form';
import api from '../Services/ApiService';
import Alerta from '../components/Alerta';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

const Endereco = ({ location }) => {
  const Redux = useSelector((state) => state.user);
  const { token, user: usuario } = Redux;

  const [estado, setEstado] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [cpf, setCpf] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [pricePac, setpricePac] = useState('');
  const [priceSedex, setpriceSedex] = useState('');
  const [priceFrete, setpriceFrete] = useState('');
  const [diasUteisPac, setDiasUteisPac] = useState('');
  const [diasUteisSedex, setDiasUteisSedex] = useState('');
  const [deliverySelected, setDeliverySelected] = useState('');
  const [opacityPac, setOpacityPac] = useState(0.5);
  const [opacitySedex, setOpacitySedex] = useState(0.5);

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      estado: usuario.endereco.estado,
      nome: usuario.nome,
      telefone: usuario.telefone,
      cep: usuario.endereco.cep,
      cpf: usuario.cpf,
      bairro: usuario.endereco.bairro,
      cidade: usuario.endereco.cidade,
      rua: usuario.endereco.rua,
      numero: usuario.endereco.numero,
      complemento: usuario.endereco.complemento,
    },
  });

  const enviar = async (data) => {
    try {
      switch (true) {
        case data.nome.length === 0:
          throw new Error('Insira seu nome!');
        case data.telefone.toString().length !== 14:
          throw new Error(
            'Você deve inserir um número de telefone válido com DDD',
          );
        case cpf.length !== 11:
          throw new Error('CPF inválido!');
        case cep.length !== 8:
          throw new Error('CEP inválido!');
        case bairro.length === 0:
          throw new Error('Insira seu bairro!');
        case cidade.length === 0:
          throw new Error('Insira sua cidade!');
        case numero.length === 0:
          throw new Error('Insira o número da sua casa!');
        case rua.length === 0:
          throw new Error('Insira sua rua!');
        default:
          break;
      }
      const request = await api.UsuarioEndereco({ data, token });
      if (request) {
        setOpen(true);
        setStatus('success');
        setMessage('Boas compras!');
      }
    } catch (error) {
      setOpen(true);
      setStatus('error');
      setMessage(error.message);
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
  const getDadosFrete = async (localCep) => {
    const data = {
      cepOrigem: '41610200',
      cepDestino: localCep,
      valorDeclarado: 500,
      codigoServico: 41106,
    };
    const data2 = {
      cepOrigem: '41610200',
      cepDestino: localCep,
      valorDeclarado: 500,
      codigoServico: 40010,
    };
    const request = await api.CalcPrazoPreco(data);
    console.log(request);
    setpricePac(request[0].valor);

    const request2 = await api.CalcPrazoPreco(data2);
    console.log(request2);
    setpriceSedex(request2[0].valor);

    const data3 = {
      cepOrigem: '41610200',
      cepDestino: localCep,
    };
    const request3 = await api.CalcPrazo(data3);
    console.log(request3);
    setDiasUteisSedex(request3[0].prazoEntrega);
    setDiasUteisPac(request3[1].prazoEntrega);
  };

  useEffect(() => {
    getDadosFrete(location.state.cepEndereco);
    getInformaçõesLocal(location.state.cepEndereco);
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
          <form
            onSubmit={handleSubmit((data) => {
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
                    value={numero}
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
                    value={complemento}
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
                    <Link
                      style={{
                        textDecoration: 'none',
                      }}
                      to={{
                        pathname: '/sumario',
                        state: {
                          totalPedido: location.state.totalPedido,
                          cepEndereco: location.state.cepEndereco,
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
                      }}
                    >
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
                    </Link>
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
