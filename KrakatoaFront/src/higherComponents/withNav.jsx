import React from 'react';
import { Container } from '@material-ui/core/';
import Topo from '../components/Topo';
import Navbar from '../components/Nav';
import Footer from '../components/Footer';

const withNav = (Component) => {
  const WithNav = (props) => (
    <>
      <Topo />
      <Navbar />
      <Container maxWidth="lg" style={{ minHeight: 700 }}>
        <Component {...props} />
      </Container>
      <Footer />
    </>
  );
  return WithNav;
};

export default withNav;
