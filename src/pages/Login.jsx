import React from 'react';
import { Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Login from '../components/Login';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

const useStyles = makeStyles((theme) => ({
  Fundo: {
    backgroundColor: theme.palette.background.color,
    AlignItems: 'center',
    minHeight: 500,
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.Fundo}>
        <Login />
      </Box>
    </>
  );
};

export default withNav(withAnimation(LoginPage));
