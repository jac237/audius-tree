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
    background: 'black',
    borderRadius: 5,
    padding: 20,
    margin: theme.spacing(2, 0, 2, 0),
  },
  icon: {
    verticalAlign: 'middle',
    fontSize: 15,
  },
  link: {
    color: 'white',
    fontWeight: 'bold',
  },
}));

const HomeAlert = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography align="center" variant="subtitle1">
        Made with <FavoriteIcon color="secondary" className={classes.icon} />{' '}
        using the{' '}
        <Link
          href="https://audiusproject.github.io/api-docs/"
          className={classes.link}
        >
          Audius API
        </Link>
        . Follow me on{' '}
        <Link href="https://audius.co/jessie" className={classes.link}>
          Audius
        </Link>
        {'! '}
        <em>
          <u>Currently in production.</u>
        </em>
      </Typography>
    </div>
  );
};

export default HomeAlert;
