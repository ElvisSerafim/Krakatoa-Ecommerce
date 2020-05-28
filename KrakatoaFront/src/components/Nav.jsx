/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Typography, Box, Container } from '@material-ui/core/';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from 'material-ui-popup-state/HoverMenu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import { currentPage } from '../reducers/page';

const styles = {
  typography: {
    color: 'red',
    fontSize: '1.5em',
  },
  a: {
    textDecoration: 'none',
    color: 'white',
  },
};

const useStyles = makeStyles((theme) => ({
  navBar: {
    backgroundColor: theme.palette.background.color,
    width: '100%',
    margin: 0,
    padding: 0,
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.color,
    color: '#fff',
    borderStyle: 'none',
  },
  
}));

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#fff',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => (
  <div>
    <Tab disableRipple {...props} component="a" />
  </div>
));

const NavBar = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });
  const popupStateCangas = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  });
  const handleChange = (event, newValue) => {
    dispatch(currentPage(newValue));
  };

  const classes = useStyles();
  return (
    <>
      <Hidden smDown="true">
        <div className={classes.navBar}>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="nowrap"
            alignItems="center"
            marginTop="2%"
          >
            <Container
              maxWidth="lg"
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
              }}
            >
              <StyledTabs
                value={page}
                onChange={handleChange}
                aria-label="styled tabs example"
              >
                <StyledTab label="Inicio" href="/" />
                <StyledTab
                  label="Cangas"
                  href="/cangas"
                  {...bindHover(popupStateCangas)}
                />
                <StyledTab
                  label="Confecções"
                  href="/vestidos"
                  {...bindHover(popupState)}
                />
                <Menu
                  {...bindMenu(popupState)}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  classes={{
                    paper: classes.paper,
                  }}
                >
                  <a
                    href="/vestidos"
                    onClick={() => {
                      dispatch(currentPage(2));
                    }}
                    style={styles.a}
                  >
                    <MenuItem>Vestidos</MenuItem>
                  </a>
                  <a
                    href="/shorts"
                    onClick={() => {
                      dispatch(currentPage(2));
                    }}
                    style={styles.a}
                  >
                    <MenuItem>Shorts</MenuItem>
                  </a>
                  <a
                    href="/batas"
                    onClick={() => {
                      dispatch(currentPage(2));
                    }}
                    style={styles.a}
                  >
                    <MenuItem>Batas</MenuItem>
                  </a>
                </Menu>

                <Menu
                  {...bindMenu(popupStateCangas)}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  classes={{
                    paper: classes.paper,
                  }}
                >
                  <a
                    href="/vestidos"
                    onClick={() => {
                      dispatch(currentPage(1));
                    }}
                    style={styles.a}
                  >
                    <MenuItem>Mandalas</MenuItem>
                  </a>
                  <a
                    href="/shorts"
                    onClick={() => {
                      dispatch(currentPage(1));
                    }}
                    style={styles.a}
                  >
                    <MenuItem>Turística</MenuItem>
                  </a>
                  <a
                    href="/batas"
                    onClick={() => {
                      dispatch(currentPage(1));
                    }}
                    style={styles.a}
                  >
                    <MenuItem>Pompom</MenuItem>
                  </a>

                  <a
                    href="/batas"
                    onClick={() => {
                      dispatch(currentPage(1));
                    }}
                    style={styles.a}
                  >
                    <MenuItem>Estampada</MenuItem>
                  </a>
                </Menu>

                <StyledTab label="Sobre" href="/sobre" />
                <StyledTab label="Contato" href="/contato" />
              </StyledTabs>
            </Container>
          </Box>
        </div>
      </Hidden>
    </>
  );
};

export default NavBar;
