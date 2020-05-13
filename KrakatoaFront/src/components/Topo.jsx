import React from 'react';
import { Typography, Box, Container } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import Carrinho from '@material-ui/icons/ShoppingCartOutlined';
import Conta from '@material-ui/icons/AccountCircleOutlined';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';
import logo from '../img/logoVermelha.jpg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
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
                  Height="60"
                  margintop="50px"
                  style={{ borderRadius: 5 }}
                />
              </div>
              <Typography
                variant="h3"
                style={{ fontStyle: 'normal', marginTop: 0, marginLeft: 10 }}
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
