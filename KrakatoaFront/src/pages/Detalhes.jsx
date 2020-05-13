/* eslint-disable react/jsx-props-no-spreading */
/* Pagina de Contato
 */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Container, Grid, Typography, Button, TableCell } from '@material-ui/core/';
import MaskedInput from 'react-text-mask';
import './Contato.css';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import ContaComp from '../components/MinhaConta';
import FooterComp from '../components/Footer';
import Topo from '../components/Topo';
import Navbar from '../components/Nav';
import Alerta from '../components/Alerta';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

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
  const [nome, setNome] = useState('-1');
  const [tel, setTel] = useState('&366&');
  const [open,setOpen] = useState(false);
  const [message,setMessage] = useState('');
  const [status,setStatus] = useState('error');
  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal} = state;

  const [values, setValues] = React.useState({
    default: '71999362212',
    numberformat: '1320',
  });

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
        <Alerta openAlert={open} message={message} status={status} handleClose={handleClose} vertical='top' horizontal='center'/>
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
                onChange={(event) => {
                  setPass(event.target.value);
                }}
              />
              <TextField
                color="primary"
                label="Nome"
                defaultValue="Gustavo Santos"
                style={styles.nome}
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
                  switch (true) {
                    case newPass.length>0:
                    /*
                      VERIFICAR SE A SENHA ATUAL ESTÁ CERTA
                    */
                    
                    /*
                      SE ESTIVER CERTA, RODAR O CÓDIGO ABAIXO:
                    */
                    
                      setOpen(true);
                      setMessage('Alterações salvas!')
                      setStatus('success');
                      //ATUALIZAR A SENHA PARA NEWPASS
                    break;
                    case nome.length==0:
                        setOpen(true);
                        setMessage('Você deve botar seu nome!');
                        setStatus('error');
                      break;
                    case tel.replace(/[^0-9]/g,'').length!=11 && tel!='&366&':
                        setOpen(true);
                        setMessage('Você deve inserir um número de telefone válido com DDD');
                        setStatus('error');
                    break;
                    default:
                      setOpen(true);
                      setMessage('Alterações salvas!')
                      setStatus('success');
                    //ATUALIZAR O NOME DO USARIO
                    //ATUALIZAR O TELEFONE DO USARIO
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
