/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarContentProps } from '@material-ui/core/SnackbarContent/SnackbarContent';

function Alert(props: AlertProps) {
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

export default function CustomizedSnackbars({
  openAlert,
  message,
  status,
  handleClose,
  vertical,
  horizontal,
}: {
  openAlert: boolean;
  message: SnackbarContentProps['message'];
  status?: Color;
  handleClose: any;
  vertical: SnackbarOrigin['vertical'];
  horizontal: SnackbarOrigin['horizontal'];
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(openAlert);
  });

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity={status}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
