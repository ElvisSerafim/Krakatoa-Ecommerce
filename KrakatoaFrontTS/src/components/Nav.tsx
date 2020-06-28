/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Box, Container } from '@material-ui/core/';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import {Link} from 'react-router-dom'
import Tab, { TabProps } from '@material-ui/core/Tab';
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

/* type PropsTabs = {
  onChange(event: React.ChangeEvent, value: number):any;
  value:number;
  event:React.ChangeEvent;
} */

const useStyles = makeStyles((theme) => ({
  navBar: {
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    margin: 0,
    padding: 0,
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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

interface TabProp extends TabProps {
  href: string
};

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.body2.fontWeight,
    fontSize: theme.typography.body2.fontSize,
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props:TabProp) => (
  <a href={props.href}>
    <Tab disableRipple {...props}/>
  </a>
));

const NavBar = () => {
  const dispatch = useDispatch();
  const page = useSelector((state: any) => state.page);
  const popupStateConfec = usePopupState({
    variant: 'popover',
    popupId: 'Confec',
  });
  const popupStateAcess = usePopupState({
    variant: 'popover',
    popupId: 'Acess',
  });
  const popupStateCangas = usePopupState({
    variant: 'popover',
    popupId: 'Cangas',
  });
  const handleChange = (event: React.ChangeEvent, newValue: number) => {
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
              <StyledTabs aria-label="Navbar">
              <Tab component={Link} to="/teste"></Tab>
                <StyledTab
                  label="Cangas"
                  href="/cangas"
                  {...bindHover(popupStateCangas)}
                />
                <StyledTab
                  label="Confecções"
                  href="/confeccoes"
                  {...bindHover(popupStateConfec)}
                />
                <StyledTab
                  label="Acessórios"
                  href="/acessorios"
                  {...bindHover(popupStateAcess)}
                />
                <StyledTab label="Sobre" href="/sobre" />
                <StyledTab label="Contato" href="/contato" />
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
                    )
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
                    )
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
