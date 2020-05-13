import React, {useEffect} from 'react';
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

export default function CustomizedSnackbars({openAlert,message,status, handleClose,vertical,horizontal}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  useEffect(()=>{
    setOpen(openAlert);
  }
    );
  /*const handleClose = (event, reason) => {
    console.log('CHEGUEI AQUI')
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false); 
  };*/
 
  const estados = {
    vertical:'top',
    horizontal:'center'
  }
  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical:vertical,horizontal:horizontal}}>
        <Alert  onClose={handleClose} severity={status} >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
