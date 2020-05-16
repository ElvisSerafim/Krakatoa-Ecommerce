/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */
/* Pagina de Contato
 */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Container, Grid, Typography, Button } from '@material-ui/core/';
import MaskedInput from 'react-text-mask';
import './Contato.css';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ContaComp from '../components/ContaComp';
import FooterComp from '../components/Footer';
import Topo from '../components/Topo';
import Navbar from '../components/Nav';
import Alerta from '../components/Alerta';
import { useSelector, useDispatch } from 'react-redux';


const styles = {
  background: {
    backgroundColor: '#D0D0D0',
  },
  flexRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: '50',
  },
  quadrado1: {
    backgroundColor: 'white',
    width: 800,
    height: 300,
    paddingTop: 50,
    paddingeft: 20,
    borderRadius: 10,
  },
  botao: {
    marginTop: 30,
    marginLeft: 310,
    height: 50,
    width: '20%',
  },
  tel: { marginLeft: 64, marginTop: 20, width: 200 },
  newpass: { marginLeft: 160, marginTop: 20, width: 200 },
  nome: { marginLeft: 64, marginTop: 50, width: 200 },
  pass: { marginLeft: 160, marginTop: 50, width: 200 },
};

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}
export default function Datalhes() {
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [nome, setNome] = useState('');
  const [tel, setTel] = useState('&366&');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('error');

  const [values, setValues] = React.useState({
    default: '71999362212',
    numberformat: '1320',
  });


  const usuario = useSelector((state) => state.user);


  useEffect(() => {

    const getUser = async () => {

      const tentativa = await usuario;
      const user = tentativa.user;
      const tokenUsuario = localStorage.getItem('token');
      console.log(user);
      console.log(user.password);
      setPass(user.password);
      setNome(user.nome);
      setTel(user.telefone);
    };

    getUser();
  }, []);




  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <Container maxWidth="lg">
        <Topo />
        <Navbar />
        <Alerta
          openAlert={open}
          message={message}
          status={status}
          handleClose={handleClose}
          vertical="top"
          horizontal="right"
        />
        <Typography variant="h2" color="primary" />
        <Grid container spacing={2} diretion="row" justify="flex-start">
          <Grid item lg={4} md={4}>
            <Typography variant="h4" color="primary">
              Minha Conta
            </Typography>
            <ContaComp />
          </Grid>
          <div style={styles.quadrado1}>
            <div style={styles.flexRow}>
              <TextField
                type="password"
                label="Senha Atual"
                style={styles.pass}
                value={pass}
                onChange={(event) => {
                  setPass(event.target.value);
                }}
              />
              <TextField
                color="primary"
                label="Nome"
                defaultValue="Gustavo Santos"
                style={styles.nome}
                value={nome}
                onChange={(event) => {
                  setNome(event.target.value);
                }}
              />
            </div>
            <div style={styles.flexRow}>
              <TextField
                style={styles.newpass}
                type="password"
                label="Nova Senha"
                value={newPass}
                onChange={(event) => {
                  setNewPass(event.target.value);
                }}
              />
              <FormControl style={styles.tel}>
                <InputLabel
                  style={{ fontSize: '1.25em' }}
                  htmlFor="formatted-text-mask-input"
                >
                  Telefone
                </InputLabel>
                <Input
                  defaultValue={values.default}
                  onChange={handleChange}
                  name="textmask"
                  id="formatted-text-mask-input"
                  value={tel}
                  onChange={(event) => {
                    setTel(event.target.value);
                  }}
                  inputComponent={TextMaskCustom}
                />
              </FormControl>
            </div>
            <div>
              <Button
                style={styles.botao}
                onClick={() => {
                  setOpen(true);
                  setStatus('error');
                  switch (true) {
                    case newPass.length > 0:
                      /*
                      VERIFICAR SE A SENHA ATUAL ESTÁ CERTA
                    */

                      /*
                      SE ESTIVER CERTA, RODAR O CÓDIGO ABAIXO:
                    */

                      setMessage('Alterações salvas!');
                      // ATUALIZAR A SENHA PARA NEWPASS
                      break;
                    case nome.length === 0:
                      setMessage('Você deve botar seu nome!');
                      break;
                    case tel.replace(/[^0-9]/g, '').length !== 11 &&
                      tel !== '&366&':
                      setMessage(
                        'Você deve inserir um número de telefone válido com DDD',
                      );
                      break;
                    default:
                      setMessage('Alterações salvas!');
                      setStatus('success');
                      // ATUALIZAR O NOME DO USARIO
                      // ATUALIZAR O TELEFONE DO USARIO
                      break;
                  }
                }}
                variant="contained"
                color="primary"
              >
                SALVAR
              </Button>
            </div>
          </div>
        </Grid>
      </Container>
      <FooterComp />
    </>
  );
}
