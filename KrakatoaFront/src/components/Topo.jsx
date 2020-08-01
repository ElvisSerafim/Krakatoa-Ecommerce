import React, { useState, useEffect } from 'react';
import { Box, Container } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Carrinho from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Conta from '@material-ui/icons/AccountCircleOutlined';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';
import Logo from './Logo';
import TopoMobile from './topoMobile';

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

const StyledBadge = withStyles(() => ({}))(Badge);

const Topo = () => {
  const classes = useStyles();
  const cartProducts = useSelector((state) => state.productsCart);
  const [quantidadeProdutos, setQuantidade] = useState(0);
  useEffect(() => {
    setQuantidade(cartProducts.length);
  }, [cartProducts]);
  return (
    <>
      <Hidden mdDown>
        <Container maxWidth="lg">
          <Box className={classes.Top}>
            <Box className={classes.box}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Logo />
              </Link>
              <Box style={{ minWidth: '200px', maxWidth: '100%' }}>
                <SearchBar />
              </Box>
              <a href="/conta/">
                <IconButton aria-label="conta">
                  <Conta color="primary" fontSize="large" />
                </IconButton>
              </a>
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
                    badgeContent={quantidadeProdutos}
                    showZero
                    color="primary"
                  >
                    <Carrinho color="primary" fontSize="large" />
                  </StyledBadge>
                </IconButton>
              </a>
            </Box>
          </Box>
        </Container>
      </Hidden>
      <Hidden lgUp>
        <TopoMobile />
      </Hidden>
    </>
  );
};
export default React.memo(Topo);
