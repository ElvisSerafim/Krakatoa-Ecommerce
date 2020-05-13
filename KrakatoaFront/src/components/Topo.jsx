import React from 'react';
import { Typography, Box } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import Carrinho from '@material-ui/icons/ShoppingCartOutlined';
import Conta from '@material-ui/icons/AccountCircleOutlined';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
  Top: {
    '@media (min-width: 1024px)': {
      position: 'fixed',
    },
  },
}));

const Topo = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.Top}>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="nowrap"
        justifyContent="space-around"
        alignItems="center"
        marginTop="2%"
      >
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
        <Hidden smDown="true">
          <a href="/conta/">
            <Conta color="primary" fontSize="large" />
          </a>
        </Hidden>
        <Hidden smDown="true">
          <a href="/carrinho">
            <Carrinho color="primary" fontSize="large" />
          </a>
        </Hidden>
        <Hidden mdUp="true">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {[
                'Inicio',
                'Conta',
                'Carrinho',
                'Cangas',
                'Vestidos',
                'Shorts',
                'Sobre',
                'Contato',
              ].map((text) => (
                <Link to={`/${text}`} style={{ textDecoration: 'none' }}>
                  <ListItem button key={text}>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
        </Hidden>
      </Box>
    </div>
  );
};
export default Topo;
