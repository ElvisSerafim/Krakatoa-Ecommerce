import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core/';
import Topo from '../components/Topo';
import Navbar from '../components/Nav';
import Footer from '../components/Footer';

const useStyles = makeStyles(() => ({
  container: {
    '@media (min-width: 960px)': {
      minHeight: 700,
      alignItems: 'center',
    },
    minHeight: 500,
    alignContent: 'center',
    display: 'flex',
  },
}));
const withNav = (Component) => {
  const WithNav = (props) => {
    const classes = useStyles();
    return (
      <>
        <Topo />
        <Navbar />
        <Container maxWidth="lg" className={classes.container}>
          <Component {...props} />
        </Container>
        <Footer />
      </>
    );
  };
  return WithNav;
};

export default withNav;
