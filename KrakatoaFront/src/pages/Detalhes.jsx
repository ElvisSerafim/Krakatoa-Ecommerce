/* Pagina de Contato
 */
import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import { Container, Grid, Typography, Button } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import MaskedInput from 'react-text-mask';
import FooterComp from '../components/Footer';
import './Contato.css';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import ContaComp from '../components/MinhaConta';
import InputLabel from '@material-ui/core/InputLabel';
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
  const classes = useStyles();
  const [values, setValues] = React.useState({
    default:'7199936221',
    numberformat: '1320',
  });
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
        <Typography variant="h2" color="primary"></Typography>
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
              />
              <TextField
                color="primary"
                label="Nome"
                defaultValue="Gustavo Santos"
                style={styles.nome}
              />
            </div>
            <div style={styles.flexRow}>
              <TextField
                style={styles.newpass}
                type="password"
                label="Nova Senha"
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
                  inputComponent={TextMaskCustom}
                />
              </FormControl>
            </div>
            <div>
            <Button style={styles.botao} variant="contained" color="primary">
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
