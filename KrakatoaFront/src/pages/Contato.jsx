/* Pagina de Contato
 */

import React, { PureComponent } from 'react';
import { Container, Grid, Typography, TextField } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import ContatoComp from '../components/Contato';
import FooterComp from '../components/Footer';
import './Contato.css';
import fb from '../img/fb.png';
import insta from '../img/insta.png';

const styles = {
  social: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
};

export default class Contato extends PureComponent {
  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <Typography variant="h2" color="primary">
            Contato
          </Typography>
          <Grid container spacing={2} diretion="row" justify="flex-start">
            <Grid item Lg={8} md={8}>
              <Typography variant="h4" color="primary">
                FALE CONOSCO
              </Typography>
              <Typography variant="h6" color="primary">
                UTILIZE O FORMULÁRIO ABAIXO PARA ENTRAR EM CONTATO CONOSCO
              </Typography>
              <ContatoComp />
            </Grid>
            <Grid item Lg={4} md={4}>
              <Typography variant="h4" color="primary">
                KRAKATOA KANGAS
              </Typography>
              <div>
                <Typography variant="h5" color="primary">
                  Loja de Itapõa
                </Typography>
                <div>
                  <Typography variant="body1" color="primary">
                    Rua do Palame, nº 43 – Itapõa
                  </Typography>
                  <Typography variant="body1" color="primary">
                    CEP.: 41610-200 – Salvador/BA
                  </Typography>
                  <Typography variant="body1" color="primary">
                    Fone/Fax: (71) 3375-3856
                  </Typography>
                  <Typography variant="body1" color="primary">
                    contato@krakatoacangas.com.br
                  </Typography>
                </div>
                <div style={styles.social}>
                  <a href="#">
                    <img src={fb} style={{ width: '12px' }} />
                  </a>
                  <div style={{ backgroundColor: 'white', width: 20 }} />
                  <a href="#">
                    <img src={insta} style={{ width: '23px' }} />
                  </a>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <FooterComp />
      </>
    );
  }
}
