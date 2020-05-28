import React from 'react';
import { Container, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import SobreCompomente from '../components/Sobre';
import Footer from '../components/Footer';

const styles = {
  showmap: {
    marginTop: '65px',
    marginBottom: '150px',
    width: '100%',
    height: '400px',
  },
};

const useStyles = makeStyles((theme) => ({
  Fundo: {
    backgroundColor: theme.palette.background.color,
    marginTop: '20px',
    padding: '2em 1.75em',
    borderRadius: 10,
  },
}));

const Sobre = () => {
  const classes = useStyles();
  return (
    <>
      <Topo />
      <Navbar />
      <Container maxWidth="lg">
        <Typography variant="h2" color="primary">
          Sobre
        </Typography>
        <section>
          <Typography variant="h3" color="primary">
            KRAKATOA
          </Typography>
          <Typography variant="h5" color="primary">
            Conheça um pouco da nossa história
          </Typography>
        </section>
        <section className={classes.Fundo}>
          <Typography variant="body1" color="secondary">
            Estabelecida em Salvador na Bahia desde 2004, a Krakatoa trabalha
            com produtos originais do Sudoeste Asiático . Nossas peças são
            exclusivas e produzidas cuidadosamente a mão , uma a uma ,
            utilizando técnicas milenares de pintura e tingimento. A qualidade e
            o bom gosto de nossos produtos conquistou não somente o mercado
            atacadista/varejista bahiano como também o nacional. Venha nos
            conhecer e conferir !
          </Typography>
        </section>
        <Typography variant="h3" color="primary">
          LOJA FÍSICA
        </Typography>
        <div style={{ marginTop: 64 }}>
          <SobreCompomente />
        </div>
        <section>
          <Typography variant="h3" color="primary">
            Mapa
          </Typography>
          <iframe
            style={styles.showmap}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d289.00561859633353!2d-38.368623842546945!3d-12.947479138519634!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc7930f5df7de9567!2sKRAKATOA%20COM%20DE%20ROUPAS%20LTDA!5e0!3m2!1spt-BR!2sbr!4v1588209418337!5m2!1spt-BR!2sbr"
            aria-hidden="false"
            title="map"
          />
        </section>
      </Container>
      <Footer />
    </>
  );
};
export default Sobre;
