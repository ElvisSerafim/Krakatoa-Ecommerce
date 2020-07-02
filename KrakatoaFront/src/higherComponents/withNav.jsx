import React from 'react';
import Topo from '../components/Topo';
import Navbar from '../components/Nav';
import Footer from '../components/Footer';

const withNav = (Component) => {
  const WithNav = (props) => (
    <>
      <Topo />
      <Navbar />
      <Component {...props} />
      <Footer />
    </>
  );
  return WithNav;
};

export default withNav;
