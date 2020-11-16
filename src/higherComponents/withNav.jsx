import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core/';

const useStyles = makeStyles(() => ({
  container: {
    '@media (min-width: 960px)': {
      minHeight: 700,
      alignItems: 'center',
    },
    minHeight: 500,
    alignContent: 'center',
    display: 'flex',
  },
}));
const withNav = (Component) => {
  const WithNav = (props) => {
    const classes = useStyles();
    return (
      <>
        <Container maxWidth="lg" className={classes.container}>
          <Component {...props} />
        </Container>
      </>
    );
  };
  return WithNav;
};

export default withNav;
