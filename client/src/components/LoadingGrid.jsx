import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LinearProgress from '@material-ui/core/LinearProgress';

import logo from '../assets/audiusTreeLogo.png';

const AudiusLinearProgress = withStyles((theme) => ({
  root: {
  },
  colorPrimary: {
    backgroundColor: 'lightgray',
  },
  bar: {
    backgroundColor: '#01CECE',
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    height: '100vh',
  },
  media: {
    height: 100,
  },
}));

const LoadingGrid = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      alignItems="center"
      justify="center"
    >
        <Grid item>
          <img
            className={classes.media}
            alt="AudiusTree"
            src={logo}
          />
          <br />
          <AudiusLinearProgress />
        </Grid>
    </Grid>
  );
};

export default LoadingGrid;
