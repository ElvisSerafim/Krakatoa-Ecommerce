import React from 'react';
import { Typography, Box } from '@material-ui/core/';
import Hidden from '@material-ui/core/Hidden';

const styles = {
  typography: {
    color: 'red',
    fontSize: '1.5em',
  },
  a: {
    textDecoration: 'none',
  },
};

const NavBar = () => (
  <Hidden smDown>
    <div style={{ width: '100%' }}>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="nowrap"
        justifyContent="space-evenly"
        alignItems="center"
        marginTop="2%"
      >
        <a href="/" style={styles.a}>
          <Typography variant="h5" color="primary">
            Inicio
          </Typography>
        </a>
        <a href="/cangas" style={styles.a}>
          <Typography variant="h5" color="primary">
            Cangas
          </Typography>
        </a>
        <a href="/vestidos" style={styles.a}>
          <Typography variant="h5" color="primary">
            Vestidos
          </Typography>
        </a>
        <a href="/batas" style={styles.a}>
          <Typography variant="h5" color="primary">
            Batas
          </Typography>
        </a>
        <a href="/shorts" style={styles.a}>
          <Typography variant="h5" color="primary">
            Shorts
          </Typography>
        </a>
        <a href="/sobre" style={styles.a}>
          <Typography variant="h5" color="primary">
            Sobre
          </Typography>
        </a>
        <a href="/contato" style={styles.a}>
          <Typography variant="h5" color="primary">
            Contato
          </Typography>
        </a>
      </Box>
    </div>
  </Hidden>
);

export default NavBar;
