/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import VerifiedIcon from '@material-ui/icons/CheckCircle';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { ReactComponent as AudiusIcon } from '../../assets/audiusWhite.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    marginBottom: 10,
  },
  media: {
    height: 250,
  },
  content: {
    color: 'white',
    backgroundColor: '#121212',
    padding: theme.spacing(1),
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  grid: {
    paddingTop: 10,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  },
  button: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  buttonRoot: {
    color: 'white',
    backgroundColor: '#CC0000',
    '&:hover': {
      backgroundColor: '#CC0000',
    },
  },
  handle: {
    display: 'inline-flex',
    color: '#CBCBCB',
  },
  label: {
    fontSize: 13,
    color: '#CBCBCB',
  },
  verified: {
    color: '#01CECE',
  },
  location: {
    color: '#CBCBCB',
  },
  fontIcon: {
    fontSize: 15,
    overflow: 'visible',
  },
}));

const UserStatsCard = ({ user }) => {
  const classes = useStyles();

  const defaultCover = 'https://i.imgur.com/H4neT3q.png';
  const defaultProfile = 'https://i.imgur.com/grJvvdx.png';

  return (
    <Card className={classes.root} square elevation={0}>
      <CardMedia
        className={classes.media}
        component="img"
        src={user?.cover_photo ? user.cover_photo.x2000 : defaultCover}
        title={`${user.name} cover photo`}
      />
      <CardContent classes={{ root: classes.content }}>
        <Container maxWidth="md" className={classes.grid}>
          <Grid
            item
            container
            direction="row"
            spacing={2}
            justify="space-between"
            style={{ marginBottom: 5 }}
          >
            <Grid item xs={4} sm={5}>
              <Avatar
                className={classes.avatar}
                src={
                  user?.profile_picture
                    ? user.profile_picture.x150
                    : defaultProfile
                }
                aria-label="user profile photo"
              />
            </Grid>
            <Grid item xs={8} sm={7} container direction="column">
              <Grid item container spacing={2} direction="row">
                <Grid item xs={4}>
                  <Typography variant="inherit" component="h2" align="center">
                    {user.track_count}
                  </Typography>
                  <Typography
                    variant="inherit"
                    component="p"
                    align="center"
                    className={classes.label}
                  >
                    tracks
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="inherit" component="h2" align="center">
                    {user.follower_count}
                  </Typography>
                  <Typography
                    variant="inherit"
                    component="p"
                    align="center"
                    className={classes.label}
                  >
                    followers
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="inherit" component="h2" align="center">
                    {user.followee_count}
                  </Typography>
                  <Typography
                    variant="inherit"
                    component="p"
                    align="center"
                    className={classes.label}
                  >
                    following
                  </Typography>
                </Grid>
              </Grid>
              <Grid item className={classes.button}>
                <Button
                  classes={{ root: classes.buttonRoot }}
                  variant="contained"
                  endIcon={
                    <SvgIcon component={AudiusIcon} viewBox="0 0 200 200" />
                  }
                  href={`https://audius.co/${user.handle}`}
                  fullWidth
                >
                  Follow on
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container direction="column">
            <Grid item>
              <Typography variant="inherit" component="h1">
                {user.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="inherit"
                className={classes.handle}
                gutterBottom
              >
                @{user.handle}
                {user.is_verified && (
                  <VerifiedIcon className={classes.verified} fontSize="small" />
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="inherit" component="p" gutterBottom>
                {user.bio}
              </Typography>
            </Grid>
            {user.location && (
              <Grid
                item
                container
                className={classes.location}
                direction="row"
                alignItems="baseline"
              >
                <Grid item>
                  <Icon
                    className="fas fa-map-marker-alt"
                    classes={{ root: classes.fontIcon }}
                  />
                </Grid>
                <Grid item>
                  <Typography color="inherit" variant="subtitle2" component="p">
                    {user.location}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Container>
      </CardContent>
    </Card>
  );
};

export default UserStatsCard;
