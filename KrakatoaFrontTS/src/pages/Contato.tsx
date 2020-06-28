/* Pagina de Contato
 */

import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import ContatoComp from '../components/Contato';
import FooterComp from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { currentPage } from '../reducers/page';
import './Contato.css';
import fb from '../img/fb.png';
import insta from '../img/insta@2x.png';

const styles = {
  social: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  img: {
    height: 23,
  },
  paragrafo: {
    marginTop: 40,
  },
};

const useStyles = makeStyles({
  GridContainer: {
    marginBottom: 64,
    '@media (min-width: 1024px)': {
      justifyContent: 'flex-start',
    },
  },
  social: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  img: {
    height: 23,
  },
  paragrafo: {
    marginTop: 40,
  },
});

const Contato = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  dispatch(currentPage(4));
  return (
    <>
      <Topo />
      <Navbar />
      <Container maxWidth="lg">
        <Typography variant="h2" color="primary">
          Contato
        </Typography>
        <Grid
          container
          spacing={4}
          justify="space-between"
          className={classes.GridContainer}
        >
          <Grid item lg={8} md={12} sm={12}>
            <Typography variant="h4" color="primary">
              FALE CONOSCO
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              UTILIZE O FORMULÁRIO ABAIXO PARA ENTRAR EM CONTATO CONOSCO
            </Typography>
            <ContatoComp />
          </Grid>
          <Grid item lg={4} md={12} sm={12} style={{ width: '100%' }}>
            <Typography variant="h4" color="primary">
              KRAKATOA KANGAS
            </Typography>
            <div>
              <Typography variant="h5" color="primary">
                Loja de Itapõa
              </Typography>
              <div style={styles.paragrafo}>
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
              <div className={classes.social}>
                <a href="https://www.facebook.com/profile.php?id=100013226432242">
                  <img src={fb} className={classes.img} alt="Facebook Logo" />
                </a>
                <div style={{ backgroundColor: 'white', width: 20 }} />
                <a href="https://www.instagram.com/krakatoacangas/?hl=pt-br">
                  <img src={insta} className={classes.img} alt="Instagram Logo" />
                </a>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <FooterComp />
    </>
  );
};
export default Contato;