/* Pagina de Sobre
 */

import React, { PureComponent } from 'react';
import { Container, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import SobreCompomente from '../components/Sobre';
import Footer from '../components/Footer';

const styles = {
  story: {
    marginTop: '20px',
    backgroundColor: 'gray',
    padding: '2em 1.75em',
    borderRadius: 10,
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
          <Typography variant="h2" color="primary">Sobre</Typography>
          <section>
            <Typography variant="h3" color="primary">KRAKATOA</Typography>
            <Typography
              variant="h5"
              color="primary"
            >
              Conheça um pouco da nossa história
            </Typography>
          </section>
          <section style={styles.story}>
            <Typography variant="body1" color="secondary">
              Fundada em 2004 em Salvador na Bahia, a KRAKATOA trabalha com
              produtos originais do Sudoeste Asiático. Fruto da Arte e de
              Técnicas Milenares de pintura e tingimento, nossas peças são
              produzidas cuidadosamente a mão, uma a uma, o que as tornam únicas
              e exclusivas.
            </Typography>
          </section>
          <Typography variant="h3" color="primary">LOJAS FÍSICAS</Typography>
          <SobreCompomente />
          <section>
            <Typography variant="h3" color="primary">Mapa</Typography>
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
