import React, { PureComponent } from 'react';
import { Typography, Box } from '@material-ui/core/';
import { yellow } from '@material-ui/core/colors';

const styles = {
  typography: {
    textDecoration: 'none',
    color: 'red',
    fontSize: '1.5em',
  },
  '&:hover': {
    color: yellow,
  },
  a: {
    textDecoration: 'none',
  },
};

export default class NavBar extends PureComponent {
  render() {
    return (
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
            <Typography style={styles.typography}>Inicio</Typography>
          </a>
          <a href="/kangas" style={styles.a}>
            <Typography style={styles.typography}>Kangas</Typography>
          </a>
          <a href="/vestidos" style={styles.a}>
            <Typography style={styles.typography}>Vestidos</Typography>
          </a>
          <a href="/batas" style={styles.a}>
            <Typography style={styles.typography}>Batas</Typography>
          </a>
          <a href="/shorts" style={styles.a}>
            <Typography style={styles.typography}>Shorts</Typography>
          </a>
          <a href="/sobre" style={styles.a}>
            <Typography style={styles.typography}>Sobre</Typography>
          </a>
          <a href="/contato" style={styles.a}>
            <Typography style={styles.typography}>Contato</Typography>
          </a>
        </Box>
      </div>
    );
  }
}
