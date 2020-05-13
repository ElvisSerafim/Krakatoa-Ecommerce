/* Pagina de Sobre
 */
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import { func } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
import useScript from '../components/useScript';
import Drawer from '../components/Drawer';

const styles = {
  story: {
    marginTop: '20px',
    backgroundColor: 'black',
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
const TesteGabriel = () => {
  useScript('https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js');
  useScript('https://ecommerce.int.granito.xyz/js/paymentmethodnonce.min.js');

  const [mec, setSearch] = useState('');
  const pesquisa = useSelector((state) => state.pesquisaBarra);
  console.log(pesquisa);
  return (
    <>
      <Container maxWidth="lg">
        <Topo />
        <Navbar />
        <Drawer />
      </Container>
      <Footer />
    </>
  );
};
export default TesteGabriel;
