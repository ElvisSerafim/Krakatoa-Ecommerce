import React from 'react';
import { Typography, Box, makeStyles } from '@material-ui/core/';
import logo from '../img/logo192.png';
const useStyles = makeStyles((theme) => ({
  mobile: {
    '@media (max-width:1024px)': {
      height: 50,
      width: 50,
    },
    '@media (min-width:1024px)': {
      borderRadius: 5,
      height: '8vw',
      maxHeight: '120px',
      width: 'auto',
    },
  },
  titulo: {
    '@media (max-width:1024px)': {
      fontStyle: 'normal',
      fontSize: '1.25em',
      marginTop: 0,
      marginLeft: 10,
    },
    '@media (min-width:1024px)': {
      fontStyle: 'normal',
      fontSize: 'max(3vw, 40px)',
      marginTop: 0,
      marginLeft: 10,
    },
  },
}));
const Logo = () => {
  const classes = useStyles();
  return (
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
          className={classes.mobile}
        />
      </div>

      <Typography variant="h4" className={classes.titulo} color="primary">
        KRAKATOA
      </Typography>
    </Box>
  );
};

export default React.memo(Logo);
