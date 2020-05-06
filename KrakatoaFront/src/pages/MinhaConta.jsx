/* Pagina de Contato
 */

import React, { PureComponent } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import FooterComp from '../components/Footer';
import './Contato.css';
import SettingsIcon from '@material-ui/icons/Settings';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import RoomIcon from '@material-ui/icons/Room';
import PermIdentityTwoToneIcon from '@material-ui/icons/PermIdentityTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import ContaComp from '../components/MinhaConta';
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
  quadrado1:{
    backgroundColor: 'black',
    width: 300,
    height: 230,
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 10,
  },
  quadrado2:{
    backgroundColor: 'black',
    width: 812,
    height: 230,
    marginTop: 68,
    marginLeft: 20,
    borderRadius: 10,
  },
  txt1:{
    paddingLeft: 20,
    paddingTop: 10 },
  
  txt2: {
    paddingLeft: 5, 
    paddingTop: 10
 },
 txt3:{ 
     paddingLeft: 20,
      paddingTop: 30
     },
txt4:{ 
    paddingLeft: 5,
     paddingTop: 30 }
};

export default class MinhaConta extends PureComponent {
  render() {
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
              <div
                style={styles.quadrado1}
              >
                <div fullwidth style={styles.flexRow}>
                  <SettingsIcon
                    style={styles.txt3}
                    color="secondary"
                  />
                  <a style={{ textDecoration: 'none' }} href="#">
                    <Typography
                      style={styles.txt4}
                      color="secondary"
                    >
                      Painel
                    </Typography>
                  </a>
                </div>

                <div style={styles.flexRow}>
                  <EventAvailableIcon
                    style={styles.txt1}
                    color="secondary"
                  />
                  <a style={{ textDecoration: 'none' }} href="#">
                    <Typography
                      style={styles.txt2}
                      color="secondary"
                    >
                      Pedidos
                    </Typography>
                  </a>
                </div>
                <div style={styles.flexRow}>
                  <RoomIcon
                    style={styles.txt1 }
                    color="secondary"
                  />
                  <a style={{ textDecoration: 'none' }} href="#">
                    <Typography
                      style={styles.txt2}
                      color="secondary"
                    >
                      Endereços
                    </Typography>
                  </a>
                </div>
                <div style={styles.flexRow}>
                  <PermIdentityTwoToneIcon
                    style={styles.txt1}
                    color="secondary"
                  />
                  <a style={{ textDecoration: 'none' }} href="#">
                    <Typography
                      style={styles.txt2}
                      color="secondary"
                    >
                      Detalhes da conta
                    </Typography>
                  </a>
                </div>
                <div style={styles.flexRow}>
                  <ExitToAppTwoToneIcon
                    style={styles.txt1}
                    color="secondary"
                  />
                  <a style={{ textDecoration: 'none' }} href="#">
                    <Typography
                      style={styles.txt2}
                      color="secondary"
                    >
                      Sair
                    </Typography>
                  </a>
                </div>
              </div>
            </Grid>
            <div
              style={styles.quadrado2}
            >
              <ContaComp />
            </div>
          </Grid>
        </Container>
        <FooterComp />
      </>
    );
  }
}
