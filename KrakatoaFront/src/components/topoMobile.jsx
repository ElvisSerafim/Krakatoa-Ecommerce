import React, { useState, useEffect } from 'react';
import { Box, Container, Divider} from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Carrinho from '@material-ui/icons/ShoppingCartOutlined';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SearchDrawer from './SearchDrawer';
import Logo from './Logo';
import IconButton from '@material-ui/core/IconButton';
import Drawer2 from './Drawer';

const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2%',
  },
  colorCart:{
    color: '#44323D'
  },

}));

const StyledBadge = withStyles(() => ({}))(Badge);

const TopoMobile = () => {
  const classes = useStyles();
  const cartProducts = useSelector((state) => state.productsCart);
  const [quantidadeProdutos, setQuantidade] = useState(0);
  useEffect(() => {
    setQuantidade(cartProducts.length);
  }, [cartProducts]);
  return (
    <Container maxWidth="lg">
        <Box className={classes.box}>
            <Drawer2 />
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>

          <div style={{display:'flex',flexDirection:"row",justifyContent:'space-between'}}>

         <SearchDrawer/>
          <a href="/carrinho" >
              <IconButton  learia-label="carrinho">
                <StyledBadge
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  badgeContent={quantidadeProdutos}
                  showZero
                  color="secondary"
                >
                  <Carrinho style={{height:30, width:30}} className={classes.colorCart}  fontSize="large" />
                </StyledBadge>
              </IconButton>
            </a>
          </div>
            
      </Box>
    <Divider style={{marginTop:2}}/>
    </Container>
  );
};
export default TopoMobile ;
