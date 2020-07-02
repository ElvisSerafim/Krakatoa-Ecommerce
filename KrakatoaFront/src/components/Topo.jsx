import React from 'react';
import { Box, Container } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Carrinho from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Conta from '@material-ui/icons/AccountCircleOutlined';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';
import Logo from './Logo';

import Drawer from './Drawer';

const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '2%',
  },

  colorPrimary: {
    color: 'white',
    backgroundColor: '#44323D',
  },
}));

const StyledBadge = withStyles((theme) => ({}))(Badge);

const Topo = () => {
  const classes = useStyles();
  const allProducts = useSelector((state) => state.productsCart);

  return (
    <Container maxWidth="lg">
      <Box className={classes.Top}>
        <Box className={classes.box}>
          <Hidden mdUp>
            <Drawer />
          </Hidden>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>
          <Hidden smDown>
            <Box style={{ minWidth: '200px', maxWidth: '100%' }}>
              <SearchBar />
            </Box>
          </Hidden>
          <Hidden smDown>
            <a href="/conta/">
              <IconButton aria-label="conta">
                <Conta color="primary" fontSize="large" />
              </IconButton>
            </a>
          </Hidden>
          <Hidden smDown>
            <a href="/carrinho">
              <IconButton aria-label="carrinho">
                <StyledBadge
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  classes={{
                    colorPrimary: classes.colorPrimary,
                  }}
                  badgeContent={allProducts.length}
                  showZero
                  color="primary"
                >
                  <Carrinho color="primary" fontSize="large" />
                </StyledBadge>
              </IconButton>
            </a>
          </Hidden>
        </Box>
      </Box>
    </Container>
  );
};
export default React.memo(Topo);
