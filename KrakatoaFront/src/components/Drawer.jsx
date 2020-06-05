import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    /* marginRight: theme.spacing(2), */
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#44323D',
  },
  svg: {
    color: 'white',
  },
  rootLanducci: {
    backgroundColor : '#44323D',
    color:'white',
    boxShadow: 'none',
    boxLines:'none',
    borderStyle:'none'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const toggleDrawer = (event) => {
    if (event.type === 'keydown') {
      return;
    }
    setOpen(true);
  };
  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        onKeyDown={(e) => toggleDrawer(e)}
        edge="start"
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon className={classes.svg} />
            ) : (
              <ChevronRightIcon className={classes.svg} />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            'Inicio',
            'Conta',
            'Carrinho',
            'Sobre',
            'Contato',
          ].map((text) => (
            <a
              href={`/${text}`}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            </a>
          ))}
          <ExpansionPanel classes={{
              root: classes.rootLanducci
            }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}>
              <Typography>Cangas</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <a href='/Mandalas' style={{ textDecoration: 'none', color: 'white' }}>
              <Typography style={{paddingBottom:10}}>
              Mandalas
              </Typography>
              </a>
              <a href='/Turisticas' style={{ textDecoration: 'none', color: 'white' }}>
              <Typography style={{paddingBottom:10}}>
              Turística
              </Typography>
              </a>
              <a href='/Pompom' style={{ textDecoration: 'none', color: 'white' }}>
              <Typography style={{paddingBottom:10}}>
                Pompom
              </Typography>
              </a>
              <a href='/Estampada' style={{ textDecoration: 'none', color: 'white' }}>
              <Typography style={{paddingBottom:10}}>
                Estampada
              </Typography>  
              </a>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel classes={{
              root: classes.rootLanducci
            }}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}>
              <Typography>Confecções</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
              <a href='/Vestidos' style={{ textDecoration: 'none', color: 'white' }}>
              <Typography style={{paddingBottom:10}}>
              Vetidos
              </Typography>
              </a>
              <a href='/Shorts' style={{ textDecoration: 'none', color: 'white' }}>
              <Typography style={{paddingBottom:10}}>
                Shorts
              </Typography>
              </a>
              <a href='/Batas' style={{ textDecoration: 'none', color: 'white' }}>
              <Typography style={{paddingBottom:10}}>
                Batas
              </Typography>  
              </a>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </List>
      </Drawer>
    </div>
  );
}
