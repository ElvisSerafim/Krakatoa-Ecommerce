import React from 'react';
import { Typography, Box, Container } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Carrinho from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Conta from '@material-ui/icons/AccountCircleOutlined';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
  },

  colorPrimary: {
    color: "white",
    backgroundColor: "#44323D"
  }
}));


const StyledBadge = withStyles((theme) => ({
}))(Badge);

const Topo = () => {
  const classes = useStyles();
  const allProducts = useSelector((state) => state.productsCart);

  return (
    <Container maxWidth="lg">
      <div className={classes.Top}>
        <Box className={classes.box}>
          <Hidden mdUp>
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
          <Hidden smDown>
            <div style={{ minWidth: '200px', maxWidth: '100%' }}>
              <SearchBar />
            </div>
          </Hidden>
          <Hidden smDown="true">
            <a href="/conta/">
              <IconButton aria-label="conta">
                <Conta color="primary" fontSize="large" />
              </IconButton>
            </a>
          </Hidden>
          <Hidden smDown="true">
            <a href="/carrinho">
              <IconButton aria-label="carrinho">
                <StyledBadge anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }} 
                classes={{
                  colorPrimary: classes.colorPrimary
                }}
                badgeContent={allProducts.length} showZero color="primary">
                  <Carrinho color="primary" fontSize="large" />
                </StyledBadge>
              </IconButton>
            </a>
          </Hidden>
        </Box>
        <Hidden lgUp>
            <div style={{ paddingLeft: 10,display: 'flex', flex: 1,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center', maxWidth: '95%', marginTop: '10px'}}>
              <SearchBar />
            </div>
          </Hidden>
      </div>
    </Container>
  );
};
export default Topo;
