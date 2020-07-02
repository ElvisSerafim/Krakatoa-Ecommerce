/* Pagina de Sobre
 */
import React from 'react';
import { Container } from '@material-ui/core/';
import withNav from '../higherComponents/withNav';
import withAnimation from '../higherComponents/withAnimation';


const TesteGabriel = () => (
  <>
    <Container maxWidth="lg">
      <h1>Teste</h1>
    </Container>
  </>
);
export default withAnimation(withNav(TesteGabriel));
