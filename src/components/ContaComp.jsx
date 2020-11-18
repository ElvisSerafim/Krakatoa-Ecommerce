import React from 'react';
import { Typography, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import RoomIcon from '@material-ui/icons/Room';
import PermIdentityTwoToneIcon from '@material-ui/icons/PermIdentityTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { useDispatch } from 'react-redux';
import Estilos from '../Estilos';
import { logout } from '../reducers/user';

const useStyles = makeStyles((theme) => ({
  Quadrado: {
    backgroundColor: theme.palette.background.color,
    width: 300,
    height: 230,
    marginTop: 20,
    borderRadius: 10,
  },
  Paper: {
    '@media (min-width: 1280px)': {
      width: '75%',
    },
    width: '145%',
    '@media (max-width: 600px)': {},
  },
}));

const styles = {
  background: {
    backgroundColor: '#D0D0D0',
  },
  quadrado2: {
    backgroundColor: 'black',
    width: 812,
    height: 230,
    marginTop: 68,
    marginLeft: 20,
    borderRadius: 10,
  },
  quadrado1: {
    backgroundColor: 'black',
    width: 300,
    height: 230,
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 10,
  },
  txt1: {
    paddingLeft: 20,
    paddingTop: 10,
  },

  txt2: {
    paddingLeft: 5,
    paddingTop: 10,
  },
  txt3: {
    paddingLeft: 20,
    paddingTop: 30,
  },
  txt4: {
    paddingLeft: 5,
    paddingTop: 30,
  },
};

const ContaComp = (theme) => {
  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const logoutNow = () => {
    dispatch(logout());
  };

  return (
    <>
      <Paper
        className={classes.Paper}
        elevation={3}
        style={{
          backgroundColor: '#D2C9C7',
          borderRadius: 10,
          height: 220,
        }}
      >
        <div style={{ ...Estilos.flexRowStandard, paddingBottom: '50' }}>
          <SettingsIcon style={styles.txt3} color="primary" />
          <a style={{ textDecoration: 'none' }} href="/conta/">
            <Typography
              style={{ ...styles.txt4, fontWeight: 'bold' }}
              color="textPrimary"
            >
              Painel
            </Typography>
          </a>
        </div>

        <div style={{ ...Estilos.flexRowStandard, paddingBottom: '50' }}>
          <EventAvailableIcon style={styles.txt1} color="primary" />
          <a style={{ textDecoration: 'none' }} href="pedidos">
            <Typography
              style={{ ...styles.txt2, fontWeight: 'bold' }}
              color="textPrimary"
            >
              Pedidos
            </Typography>
          </a>
        </div>
        <div style={{ ...Estilos.flexRowStandard, paddingBottom: '50' }}>
          <RoomIcon style={styles.txt1} color="primary" />
          <a style={{ textDecoration: 'none' }} href="meuendereco">
            <Typography
              style={{ ...styles.txt2, fontWeight: 'bold' }}
              color="textPrimary"
            >
              Endereços
            </Typography>
          </a>
        </div>
        <div style={{ ...Estilos.flexRowStandard, paddingBottom: '50' }}>
          <PermIdentityTwoToneIcon style={styles.txt1} color="primary" />
          <a style={{ textDecoration: 'none' }} href="detalhes">
            <Typography
              style={{ ...styles.txt2, fontWeight: 'bold' }}
              color="textPrimary"
            >
              Detalhes da conta
            </Typography>
          </a>
        </div>
        <div style={{ ...Estilos.flexRowStandard, paddingBottom: '50' }}>
          <ExitToAppTwoToneIcon style={styles.txt1} color="primary" />
          <a style={{ textDecoration: 'none' }} onClick={logoutNow} href="/">
            <Typography
              style={{ ...styles.txt2, fontWeight: 'bold' }}
              color="textPrimary"
              onClick={logoutNow}
            >
              Sair
            </Typography>
          </a>
        </div>
      </Paper>
    </>
  );
};

export default ContaComp;
