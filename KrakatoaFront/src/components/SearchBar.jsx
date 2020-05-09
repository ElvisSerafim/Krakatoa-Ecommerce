import React, { useState, Component } from 'react';
import { fade, makeStyles } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import {sendSearch} from '../reducers/search.js'
import InputBase from '@material-ui/core/InputBase';
import { useDispatch} from 'react-redux';
const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const SearchBar=({redrec}) =>  {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch()
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase onKeyPress={(event)=>{
        if(event.key=='Enter'){
          if(search.length==0)return 0;
          else {
            dispatch(sendSearch(search))
          }
          setSearch('');
        }
      }}
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        placeholder="Pesquisar…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
    }
    export default SearchBar;
    
