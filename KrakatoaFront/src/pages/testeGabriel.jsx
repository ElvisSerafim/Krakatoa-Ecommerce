/* Pagina de Sobre
 */
import React, { useState,PureComponent } from 'react';
import { Container, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import { withRouter } from 'react-router-dom';
import Footer from '../components/Footer';
import { func } from 'prop-types';
import { useSelector,useDispatch} from 'react-redux';
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

const TesteGabriel=()=> {
  const [mec, setSearch] = useState('');
  const pesquisa = useSelector((state)=>state.pesquisaBarra);
  console.log(pesquisa);
  return (
      <>
        <Container maxWidth="lg">
          <Topo/>
          <Navbar />
        </Container>
        <Footer />
      </>
    );
  }
   export default TesteGabriel
  

