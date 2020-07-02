/* Pagina de Contato
 */

import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import ContatoComp from '../components/Contato';
import { currentPage } from '../reducers/page';
import './Contato.css';
import fb from '../img/fb.png';
import insta from '../img/insta@2x.png';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

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
});

const Contato = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  dispatch(currentPage(4));
  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: 64 }}>
        <Grid
          container
          spacing={4}

          justify="space-between"
          className={classes.GridContainer}
        >
          <Grid item lg={8} md={12} sm={12} style={{ marginTop: '30px' }}>
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
              KRAKATOA CANGAS
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
              <div style={styles.social}>
                <a href="https://www.facebook.com/profile.php?id=100013226432242">
                  <img src={fb} style={styles.img} alt="Facebook Logo" />
                </a>
                <div style={{ backgroundColor: 'white', width: 20 }} />
                <a href="https://www.instagram.com/krakatoacangas/?hl=pt-br">
                  <img src={insta} style={styles.img} alt="Instagram Logo" />
                </a>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default withNav(withAnimation(Contato));
