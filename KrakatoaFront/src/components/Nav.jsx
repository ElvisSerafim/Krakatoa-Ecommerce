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

const useStyles = makeStyles((theme) => ({
  a: {
    textDecoration: 'none',
    color: theme.palette.common.white,
  },
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
    color: 'red',
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
      backgroundColor: 'red',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: theme.palette.common.white,
    fontWeight: theme.typography.body1.fontWeight,
    fontSize: theme.typography.body2.fontSize,
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 0.5,
    },
  },
}))((props) => (
  <Tab disableRipple {...props} component="a" />
));

const NavBar = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const popupStateConfec = usePopupState({
    variant: 'popover',
    popupId: 'teste',
  });
  const popupStateAcess = usePopupState({
    variant: 'popover',
    popupId: 'test2',
  });
  const popupStateCangas = usePopupState({
    variant: 'popover',
    popupId: 'test3',
  });

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
                aria-label="NavBar"
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
                        }}
                        className={classes.a}

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
                      
                      className={classes.a}

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
                        }}

                        className={classes.a}
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

export default React.memo(NavBar);
