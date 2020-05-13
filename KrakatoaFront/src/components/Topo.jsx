import React, { PureComponent } from 'react';
import { Typography, Box } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import Carrinho from '@material-ui/icons/ShoppingCartOutlined';
import Conta from '@material-ui/icons/AccountCircleOutlined';

import SearchBar from './SearchBar';
import logo from '../img/logoNav.svg';

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
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <img
                src={logo}
                alt="Logo Krakatoa"
                height="60"
                margintop="50px"
                style={{ paddingRight: '20px' }}
              />
              <Typography
                variant="h3"
                style={{ fontStyle: 'normal', marginTop: 0 }}
                color="primary"
              >
                KRAKATOA
              </Typography>
            </Box>
          </Link>
          <div style={{ width: '400px' }}>
            <SearchBar/>
          </div>
          {/* <BodyData/> */}
          <a href="/conta/">
            <Conta color="primary" fontSize="large" />
          </a>
          <a href="/carrinho">
            <Carrinho color="primary" fontSize="large" />
          </a>
        </Box>
      </div>
    );
  }
}
export default Topo;
