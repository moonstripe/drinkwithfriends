import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import banner from '../images/banner.png';
import '../style/App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getNickname } from './PlayerReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const SignInButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 22,
    padding: '14px 26px',
    border: '3px solid',
    lineHeight: 1.5,
    backgroundColor: '#DA2900',
    borderColor: '#B19E07',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#502419',
      borderColor: '#A7940A',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#FF3C2F',
      borderColor: '#FF3C2F',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(152,156,40,.5)',
    },
  },
})(Button);
const SignUpButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 22,
    padding: '14px 26px',
    border: '3px solid',
    lineHeight: 1.5,
    backgroundColor: '#DA2900',
    borderColor: '#B19E07',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#A7940A',
      borderColor: '#502419',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#BBAA38',
      borderColor: '#BBAA38',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(187,170,56,.5)',
    },
  },
})(Button);



export default function ButtonAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    localStorage.removeItem('gender');
    history.push('/');
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">

        <Toolbar>
          <button onClick={() => dispatch(getNickname('moon'))}>set nickname to moon</button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
