import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import foto from '../img/teste.jpeg';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    fontFamily: 'Poppins',
    color: 'white',
    backgroundColor: theme.palette.background.color,
    borderRadius: 4,
  },
  button: {
    color: 'white',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    backgroundColor: theme.palette.background.color,
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
  },
  informacoes: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  img: {
    height: 350,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
    objectFit: 'cover',
  },
}));

const ProdutoMobile = ({ imagens, produto }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = imagens.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <div className={classes.informacoes}>
          <Typography style={{ fontSize: 22 }}>{produto.nome}</Typography>
          <Typography>R$ {produto.preco}</Typography>
        </div>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {imagens.map((item, index) => (
          <div>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.img}
                src={`http://64.227.106.165/api/static/imgs/${item}.jpeg`}
                alt={`${produto.nome}`}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        classes={{
          root: classes.root,
        }}
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            classes={{
              root: classes.button,
            }}
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            classes={{
              root: classes.button,
            }}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
};

export default ProdutoMobile;