import React from 'react';
import { Typography, Box, Container } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import Carrinho from '@material-ui/icons/ShoppingCartOutlined';
import Conta from '@material-ui/icons/AccountCircleOutlined';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';
import logo from '../img/logoVermelha.jpg';
import Drawer from './Drawer';

const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '2%',
    '@media (max-width: 950px)': {
      /* flexDirection: 'row-reverse', */
    },
  },
}));

const Topo = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <div className={classes.Top}>
        <Box className={classes.box}>
          <Hidden mdUp="true">
            <Drawer />
          </Hidden>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              flexWrap="nowrap"
              justifyContent="flex-start"
            >
              <div style={{ borderRadius: 20 }}>
                <img
                  src={logo}
                  alt="Logo Krakatoa"
                  margintop="50px"
                  style={{
                    borderRadius: 5,
                    height: '8vw',
                    maxHeight: '60px',
                    width: 'auto',
                  }}
                />
              </div>
              <Typography
                variant="h3"
                style={{
                  fontStyle: 'normal',
                  fontSize: 'max(3vw, 40px)',
                  marginTop: 0,
                  marginLeft: 10,
                }}
                color="primary"
              >
                KRAKATOA
              </Typography>
            </Box>
          </Link>
          <Hidden smDown="true">
            <div style={{ minWidth: '200px', maxWidth: '100%' }}>
              <SearchBar />
            </div>
          </Hidden>

          <a href="/conta/">
            <Conta color="primary" fontSize="large" />
          </a>

          <a href="/carrinho">
            <Carrinho color="primary" fontSize="large" />
          </a>
        </Box>
      </div>
    </Container>
  );
};
export default Topo;
