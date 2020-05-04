import React, { PureComponent } from 'react';
import { Typography, Box, fade, makeStyles } from '@material-ui/core/';
import SearchBar from './SearchBar';
import logo from '../img/logoNav.svg';
import avatar from '../img/avatar.png';
import cart from '../img/cart.png';

const styles = {
  typography: {
    textDecoration: 'none',
    color: 'red',
    fontSize: '3em',
    fontWeight: '700',
  },
};

class Topo extends PureComponent {
  render() {
    return (
      <div style={{ width: '100%' }}>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="nowrap"
          justifyContent="space-around"
          alignItems="center"
          marginTop="2%"
        >
          <Box display="flex" flexDirection="row" alignItems="center">
            <img
              src={logo}
              alt="Logo Krakatoa"
              height="60"
              margintop="50px"
              style={{ paddingRight: '20px' }}
            />
            <Typography style={styles.typography}>KRAKATOA</Typography>
          </Box>
          <div style={{ width: '400px' }}>
            <SearchBar />
          </div>
          {/* <BodyData/> */}
          <a href="/minhaconta">
            <img src={avatar} alt="avatar" height="20" margintop="50px" />
          </a>
          <a href="/carrinho">
            <img src={cart} alt="cart" height="20" margintop="50px" />
          </a>
        </Box>
      </div>
    );
  }
}
export default Topo;
