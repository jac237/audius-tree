/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  logo: {
    height: 30,
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
