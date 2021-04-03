import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import VerifiedIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import { USER_BY_ID } from '../../graphql';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    backgroundColor: 'transparent',
    color: 'white',
    borderRadius: '8px',
    padding: theme.spacing(1, 0, 1, 0),
    width: 125 + theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      width: 150 + theme.spacing(2),
    },
    '&:hover': {
      background: '#393939',
    },
  },
  media: {
    height: 125,
    width: 125,
    [theme.breakpoints.up('sm')]: {
      height: 150,
      width: 150,
    },
    '&:hover': {
      opacity: '0.8',
    },
  },
  handle: {
    display: 'inline-flex',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    alignItems: 'center',
  },
  verified: {
    marginLeft: 2,
    color: '#01CECE',
  },
  routerLink: {
    textDecoration: 'none',
    color: 'white',
  },
}));

const UserTileCard = ({ user }) => {
  const classes = useStyles();
  const defaultCover = 'https://i.imgur.com/iajv7J1.png';

  return (
    <Grid
      className={classes.root}
      container
      spacing={1}
      direction="column"
      alignItems="center"
      wrap="nowrap"
    >
      <Grid item>
        <Link to={`/user/${user.handle}`} className={classes.routerLink}>
          <Avatar
            className={classes.media}
            src={
              user.profile_picture ? user.profile_picture.x150 : defaultCover
            }
            title={user.name}
            aria-label="user profile photo"
          />
        </Link>
      </Grid>
      <Grid item zeroMinWidth>
        <Typography className={classes.handle} variant="inherit" noWrap>
          {user.name}
          {user?.is_verified && (
            <VerifiedIcon className={classes.verified} fontSize="small" />
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserTileCard;
