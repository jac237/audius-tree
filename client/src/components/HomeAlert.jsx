/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(2, 0, 2, 0),
  },
  icon: {
    verticalAlign: 'middle',
    fontSize: 15,
  }
}));

const HomeAlert = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert icon={false} severity="info">
        <Typography align="center" variant="subtitle2">
          Made with <FavoriteIcon color="secondary" className={classes.icon} /> using
          the <Link href="https://audiusproject.github.io/api-docs/">Audius API</Link>.
          Follow me on <Link href="https://audius.co/jessie">Audius</Link> for more favorites!
          Note: Currently in production.
        </Typography>
      </Alert>
    </div>
  );
};

export default HomeAlert;
