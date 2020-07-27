/* Pagina de Sobre
 */
import React, { useState, useEffect } from 'react';
import withNav from '../higherComponents/withNav';
import withAnimation from '../higherComponents/withAnimation';
import {
  Typography,
  Box,
  Avatar,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItem,
  ListItemText,
  ListItemAvatar,
  List,
  Divider
} from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route, Redirect, withRouter, useHistory } from 'react-router-dom';
import { removeAllProducts } from '../reducers/productsCart';
import Alerta from '../components/Alerta';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const styles = {
  title: {
    padding: '64px 0px 40px 0px',
    fontSize: '2.5em',
    color: '#FF5757',
    fontWeight: '700',
  },

  text: {
    fontWeight: '700',
  }
}

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  root: {
    width: '100%',
    minWidth: 320,
    backgroundColor: '#D2C9C7',
  },
}));

const TesteGabriel = ({ location }) => {
  const [open, setOpen] = useState(false);
  const [status, Setstatus] = useState('error');
  const [msg, setMsg] = useState('Erro');
  const classes = useStyles();
  return (
    <>
      <Grid spacing={2} style={{ marginTop: 50, marginBottom: 64 }}>
        <Grid item lg={12}>
          <Typography variant="h4" color="primary">
            Sumário
              </Typography>
        </Grid>
        <Grid item lg={8} />
        <Grid item lg={4} container justify="flex-end">

        </Grid>
        <div style={{ display: 'flex', flex: 1 }}>
          <List className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src="https://assets.xtechcommerce.com/uploads/images/medium/115a3c0d7173c97921ab6d6623dcd7db.jpg" className={classes.large} />
              </ListItemAvatar>
              <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography style={styles.text}>
                    Vestido Saida de praia
                    </Typography>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Typography style={styles.text}>
                      Tam: M
                         </Typography>
                    <Typography style={styles.text}>
                      Qnt: 5
                         </Typography>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <Typography style={styles.text}>
                    R$ 290
                    </Typography>
                </div>
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </div>
        <Typography variant="h6" color="primary">
          Endereço
        </Typography>

        <div style={{ marginTop: 10 }}>
          <Typography style={styles.text}>
            Elvis Michael Souza Serafim
          </Typography>
          <Typography style={styles.text}>
            Rua Visconde do rio Branco, {' '}
            Centro, Numero°{' '}
            12
          </Typography>
          <Typography style={styles.text}>
            Feira de Santana
          </Typography>
          <Typography style={styles.text}>
            Proximo universidade UEFS
          </Typography>
          <Typography style={styles.text}>
            75 98217446
          </Typography>

          <Box
            style={{ cursor: 'pointer', marginTop: 10 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Link
              style={{ textDecoration: 'none' }}
            >
              <Button variant="contained" color="secondary" fullWidth>
                MUDAR ENDEREÇO
                    </Button>
            </Link>
          </Box>
          <Divider style={{marginTop: 5}}/>
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography color="primary" style={styles.text}>
              SubTotal
          </Typography>
            <Typography style={styles.text}>
              R$ 200
          </Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
            <Typography color="primary" style={styles.text}>
              Frete
          </Typography>
            <Typography style={styles.text}>
              R$ 85,60
          </Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
            <Typography color="primary" variant="h5">
              Total
          </Typography>
            <Typography style={styles.text}>
              R$ 285,60
          </Typography>
          </div>
          <Divider />
        </div>
        <div style={{ paddingTop: 20 }} >
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel style={{ color: '#44323D' }}>
              Formas de pagamento
                    </InputLabel>
            <Select
              label="Formas de pagamento"
            >
              <MenuItem value="Nenhum" />
              <MenuItem value="CARTAO">
                Cartão de crédito/débito
                      </MenuItem>
              <MenuItem value="BOLETO">Boleto</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div style={{ width: '100%', marginTop: 30 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
          >
            Finalizar Compra
          </Button>
        </div>

      </Grid>
    </>
  );
};
export default withAnimation(withNav(TesteGabriel));
