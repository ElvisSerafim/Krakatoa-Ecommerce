/* Pagina de Contato
 */

import '../pages/Contato.css';
import fb from '../img/fb.png';
import insta from '../img/insta.png';
import React, { PureComponent } from 'react';
import { Container, Grid, Typography, TextField } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import red from '@material-ui/core/colors/red';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ContatoComp from '../components/Contato'
import FooterComp from '../components/Footer'
const styles = {
  title: {
    fontSize: "3.75em",
    textAlign: "center",
    margin: "64px",
    color: "#FF5757",
  },
  default: {
    fontSize: "2.25em",
    fontWeight: '1000',
    color: "#FF5757",
  },
  name: {
    backgroundColor: 'gray',
    color: "#FF5757",
    width: '30%',
    height: '50px',
  },
  subtitle: {
    fontSize: "1.25em",
    fontWeight: '1000',
    color: "#FF5757",
  },
  itapoa: {
    fontSize: "1.25em",
    color: "#FF5757",
    marginRight: 190
  },
  paragrafo: {
    flexDirection: 'column',
    display: 'flex',
    flex: 1,
    fontSize: "1.25em",
    color: "#FF5757",
    fontWeight: '1000',

  },
  componentes: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  description: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginLeft: 240
  },
  rowGenerico: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  colunaGenerica: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginTop: 10
  },
  social: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  }
}

export default class Contato extends PureComponent {
  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <section>
            <Typography style={styles.title}>Contato</Typography>
          </section>
          <div style={styles.colunaGenerico}>
            <div style={styles.rowGenerico}>
              <Typography style={styles.default}>FALE CONOSCO</Typography>
              <Typography style={styles.default}>KRAKATOA KANGAS</Typography>
            </div>
            <div style={styles.rowGenerico}>
              <Typography style={styles.subtitle}>UTILIZE O FORMULÁRIO ABAIXO PARA ENTRAR EM CONTATO CONOSCO</Typography>
              <div style={styles.description}>
                <Typography style={styles.itapoa}>Loja de Itapõa</Typography>
                <div style={styles.paragrafo}>
                  <Typography>Rua do Palame, nº 43 – Itapuã </Typography>
                  <Typography>CEP.: 41610-200 – Salvador/BA</Typography>
                  <Typography>Fone/Fax: (71) 3375-3856</Typography>
                  <Typography>contato@krakatoacangas.com.br</Typography>
                </div>
                <div style={styles.social}>
                  <a href="#">
                    <img src={fb} style={{ width: "12px" }}></img>
                  </a>
                  <div style={{ backgroundColor: "white", width: 20 }}></div>
                  <a href="#">
                    <img src={insta} style={{ width: "23px" }}></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.componentes}>
            <ContatoComp />
          </div>
        </Container>
        <FooterComp/>
      </>
    );
  }
}

