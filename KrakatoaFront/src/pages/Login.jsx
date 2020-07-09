import React from 'react';
import { Typography, Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import Login from '../components/Login';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

const useStyles = makeStyles((theme) => ({
  Fundo: {
    backgroundColor: theme.palette.background.color,
    AlignItems: 'center',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  return (
    <>
      <Typography
        variant="h3"
        color="primary"
        style={{ fontStyle: 'normal', marginTop: 0 }}
        gutterBottom
      >
        MINHA CONTA
      </Typography>
      <Box className={classes.Fundo}>
        <Login />
      </Box>
    </>
  );
};

export default withNav(withAnimation(LoginPage));
