import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({openAlert,message,status}) {
  const classes = useStyles();


  /*const handleClick = () => {
    setOpen(true);
  };*/

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    openAlert = false; 
  };
  return (
    <div className={classes.root}>
        <Alert onClose={handleClose} severity={status}>
          {message}
        </Alert>
    </div>
  );
}
