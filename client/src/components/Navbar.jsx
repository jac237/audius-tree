/* eslint-disable react/prop-types */
import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import AudiusSearchBar from './AudiusSearchBar';
import logo from '../assets/AudiusTreeLogoWhite.png';
import logoSm from '../assets/audiusTreeLogoSmall.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: '#303030',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
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
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '40ch',
      '&:focus': {
        width: '41ch',
      },
    },
  },
  logo: {
    height: 35,
    marginRight: theme.spacing(1),
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.nav}>
        <Container>
          <Toolbar>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <a href="/">
                  <Hidden smDown>
                    <img src={logo} className={classes.logo} alt="Audius Tree Logo" />
                  </Hidden>
                  <Hidden mdUp>
                    <img src={logoSm} className={classes.logo} alt="Audius Tree Logo" />
                  </Hidden>
                </a>
              </Grid>
              <Grid item className="(Async) Search Artists on Audius">
                <AudiusSearchBar />
              </Grid>
              <Grid item className="GitHub Button">
                <Hidden only="xs">
                  <IconButton
                    href="https://github.com/jac237"
                    component="a" 
                    color="inherit" 
                    size="small"
                  >
                    <GitHubIcon fontSize="large"/>
                  </IconButton>
                </Hidden>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
