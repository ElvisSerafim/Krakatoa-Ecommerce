import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendSearch } from '../reducers/search';

const useStyles = makeStyles((theme) => ({
  search: {
    fontFamily: 'Poppins',
    position: 'relative',
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: theme.palette.background.color,
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: theme.palette.background.color,
  },
  inputRoot: {
    color: theme.palette.background.color,
    paddingLeft: `calc(1em + ${theme.spacing(6)}px)`,
  },
  inputInput: {
    fontFamily: 'Poppins',
    color: theme.palette.background.color,
    '@media (max-width:1024px)': {
      color: 'white',
    },
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    '&::placeholder': {
      fontFamily: 'Poppins',
      color: 'black',
    },

  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={classes.search}>
      <div
        className={classes.searchIcon}
        onClick={() => {
          if (search.length === 0) return 0;

          history.push('/pesquisa');
          dispatch(sendSearch(search));

          setSearch('');
        }}
      >
        <SearchIcon />
      </div>
      <InputBase
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            if (search.length === 0) return 0;

            history.push('/pesquisa');
            dispatch(sendSearch(search));

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
};
export default SearchBar;
