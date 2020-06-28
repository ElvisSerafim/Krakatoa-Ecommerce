/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Box, Container } from '@material-ui/core/';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from 'material-ui-popup-state/HoverMenu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import { currentPage } from '../reducers/page';

const styles = {
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
  const popupStateConfec = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  });
  const popupStateAcess = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  });
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
      <Hidden smDown>
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
                <StyledTab
                  style={{ fontSize: '1.25em' }}
                  label="Cangas"
                  href="/cangas"
                  {...bindHover(popupStateCangas)}
                />
                <StyledTab
                  style={{ fontSize: '1.25em' }}
                  label="Confecções"
                  href="/confeccoes"
                  {...bindHover(popupStateConfec)}
                />
                <StyledTab
                  style={{ fontSize: '1.25em' }}
                  label="Acessórios"
                  href="/acessorios"
                  {...bindHover(popupStateAcess)}
                />
                <StyledTab
                  style={{ fontSize: '1.25em' }}
                  label="Sobre"
                  href="/sobre"
                />
                <StyledTab
                  style={{ fontSize: '1.25em' }}
                  label="Contato"
                  href="/contato"
                />
                <Menu
                  {...bindMenu(popupStateConfec)}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  classes={{
                    paper: classes.paper,
                  }}
                >
                  {['Vestidos', 'Batas', 'Shorts', 'Macaquinhos'].map(
                    (text) => (
                      <a
                        href={`/${text}`}
                        onClick={() => {
                          dispatch(currentPage(1));
                        }}
                        style={styles.a}
                      >
                        <MenuItem style={{ fontSize: '1.25em' }}>
                          {`${text}`}
                        </MenuItem>
                      </a>
                    ),
                  )}
                </Menu>
                <Menu
                  {...bindMenu(popupStateAcess)}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  classes={{
                    paper: classes.paper,
                  }}
                >
                  {['Bolsas', 'Chapeus'].map((text) => (
                    <a
                      href={`/${text}`}
                      onClick={() => {
                        dispatch(currentPage(2));
                      }}
                      style={styles.a}
                    >
                      <MenuItem style={{ fontSize: '1.25em' }}>
                        {`${text}`}
                      </MenuItem>
                    </a>
                  ))}
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
                  {['Mandalas', 'Turisticas', 'Pompom', 'Estampada'].map(
                    (text) => (
                      <a
                        href={`/cangas/${text}`}
                        onClick={() => {
                          dispatch(currentPage(0));
                        }}
                        style={styles.a}
                      >
                        <MenuItem style={{ fontSize: '1.25em' }}>
                          {`${text}`}
                        </MenuItem>
                      </a>
                    ),
                  )}
                </Menu>
              </StyledTabs>
            </Container>
          </Box>
        </div>
      </Hidden>
    </>
  );
};

export default NavBar;
