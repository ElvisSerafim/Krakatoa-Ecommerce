/* Pagina de Sobre
 */

import React, { PureComponent } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import SobreCompomente from '../components/Sobre';
import Footer from '../components/Footer';

const styles = {
  title: {
    fontSize: '3.75em',
    textAlign: 'center',
    margin: '64px',
    color: '#FF5757',
  },
  krakatoa: {
    fontSize: '3.25em',
    fontWeight: '1000',
    fontStyle: 'italic',

    color: '#FF5757',
  },
  subtitle: {
    fontSize: '1.5em',
    color: '#FF5757',
    marginTop: '0px',
  },
  story: {
    fontSize: '1.5em',
    color: 'white',
    marginTop: '20px',
    marginBottom: '64px',
    backgroundColor: 'gray',
    paddingTop: '36px',
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingBottom: '36px',
    borderRadius: 19,
  },
  lojaFisica: {
    fontSize: '3.25em',
    color: '#FF5757',
    fontWeight: '1000',
    fontStyle: 'italic',
    marginTop: 'px',
  },
  map: {
    fontSize: '3.25em',
    color: '#FF5757',
    fontWeight: '1000',
    fontStyle: 'italic',
    marginTop: '64px',
  },
  showmap: {
    marginTop: '65px',
    marginBottom: '150px',
    width: '100%',
    height: '400px',
  },
};

export default class Sobre extends PureComponent {
  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Topo />
          <Navbar />
          <Typography style={styles.title}>Sobre</Typography>
          <section>
            <Typography style={styles.krakatoa}>KRAKATOA</Typography>
            <Typography style={styles.subtitle}>
              Conheça um pouco da nossa história
            </Typography>
          </section>
          <section>
            <Typography style={styles.story}>
              Fundada em 2004 em Salvador na Bahia, a KRAKATOA trabalha com
              produtos originais do Sudoeste Asiático. Fruto da Arte e de
              Técnicas Milenares de pintura e tingimento, nossas peças são
              produzidas cuidadosamente a mão, uma a uma, o que as tornam únicas
              e exclusivas.
            </Typography>
          </section>
          <Typography style={styles.lojaFisica}>LOJAS FÍSICAS</Typography>
          <SobreCompomente />
          <section>
            <Typography style={styles.map}>Mapa</Typography>
            <iframe
              style={styles.showmap}
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d289.00561859633353!2d-38.368623842546945!3d-12.947479138519634!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc7930f5df7de9567!2sKRAKATOA%20COM%20DE%20ROUPAS%20LTDA!5e0!3m2!1spt-BR!2sbr!4v1588209418337!5m2!1spt-BR!2sbr"
              allowFullscreen=""
              aria-hidden="false"
              title="map"
            />
          </section>
        </Container>
        <Footer />
      </>
    );
  }
}
