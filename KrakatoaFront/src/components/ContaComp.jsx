import React, { PureComponent } from 'react';
import { Typography } from '@material-ui/core/';
import './Contato.css';
import SettingsIcon from '@material-ui/icons/Settings';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import RoomIcon from '@material-ui/icons/Room';
import PermIdentityTwoToneIcon from '@material-ui/icons/PermIdentityTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import api from '../Services/ApiService';

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
    backgroundColor: 'black',
    width: 300,
    height: 230,
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 10,
  },
  quadrado2: {
    backgroundColor: 'black',
    width: 812,
    height: 230,
    marginTop: 68,
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

export default class ContaComp extends PureComponent {
  logout = async () => {
    const token = sessionStorage.getItem('token');
    api.Logout(token);
    sessionStorage.removeItem('token');
  };
  render() {
    return (
      <>
        <div style={styles.quadrado1}>
          <div style={styles.flexRow}>
            <SettingsIcon style={styles.txt3} color="secondary" />
            <a style={{ textDecoration: 'none' }} href="/conta/">
              <Typography style={styles.txt4} color="secondary">
                Painel
              </Typography>
            </a>
          </div>

          <div style={styles.flexRow}>
            <EventAvailableIcon style={styles.txt1} color="secondary" />
            <a style={{ textDecoration: 'none' }} href="pedidos">
              <Typography style={styles.txt2} color="secondary">
                Pedidos
              </Typography>
            </a>
          </div>
          <div style={styles.flexRow}>
            <RoomIcon style={styles.txt1} color="secondary" />
            <a style={{ textDecoration: 'none' }} href="meuendereco">
              <Typography style={styles.txt2} color="secondary">
                Endereços
              </Typography>
            </a>
          </div>
          <div style={styles.flexRow}>
            <PermIdentityTwoToneIcon style={styles.txt1} color="secondary" />
            <a style={{ textDecoration: 'none' }} href="detalhes">
              <Typography style={styles.txt2} color="secondary">
                Detalhes da conta
              </Typography>
            </a>
          </div>
          <div style={styles.flexRow}>
            <ExitToAppTwoToneIcon style={styles.txt1} color="secondary" />
            <a
              style={{ textDecoration: 'none' }}
              onClick={this.logout}
              href="/"
            >
              <Typography
                style={styles.txt2}
                color="secondary"
                onClick={this.logout}
              >
                Sair
              </Typography>
            </a>
          </div>
        </div>
      </>
    );
  }
}