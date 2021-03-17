/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import VerifiedIcon from '@material-ui/icons/CheckCircle';
import { MusicContext } from '../MusicContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: 'auto',
    color: 'white',
    backgroundColor: '#333232',
    borderRadius: '8px',
    maxWidth: 900,
    minWidth: 312,
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(0.5),
  },
  content: {
    flex: 1,
    padding: theme.spacing(0.5),
    '&:last-child': {
      paddingBottom: theme.spacing(1),
    },
  },
  img: {
    padding: theme.spacing(1),
    width: 105,
    height: 105,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  handle: {
    display: 'inline-flex',
    color: 'darkgray',
  },
  time: {
    color: 'darkgray',
  },
  verified: {
    color: '#01CECE',
    marginLeft: 2,
  },
  chip: {
    color: '#01CECE',
    borderColor: '#01CECE',
    borderRadius: 5,
    margin: theme.spacing(0.5, 0, 0.8, 0),
  },
  button: {
    fontSize: 13,
    color: 'darkgray',
    borderColor: 'darkgray',
    '& .MuiIcon-root': {
      fontSize: 13,
      overflow: 'visible',
    },
  },
}));

const TrackRowCard = (props) => {
  const classes = useStyles();
  const { track } = props;
  const [currPlaylist, setCurrPlaylist, currTrack, setCurrTrack] = useContext(
    MusicContext
  );
  const [time, setTime] = useState('');

  useEffect(() => {
    // Source: https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
    // Output: "1:01" or "4:03:59" or "123:03:59"
    const timeDisplay = (duration) => {
      // Hours, minutes and seconds
      const hrs = ~~(duration / 3600);
      const mins = ~~((duration % 3600) / 60);
      const secs = ~~duration % 60;
      let ret = '';
      if (hrs > 0) {
        ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
      }

      ret += '' + mins + ':' + (secs < 10 ? '0' : '');
      ret += '' + secs;
      return ret;
    };
    setTime(timeDisplay(track.duration));
  }, [track]);

  return (
    <Card className={classes.root} elevation={1} square>
      <CardMedia
        className={classes.img}
        component="img"
        src={
          track.artwork ? track.artwork.x150 : 'https://i.imgur.com/iajv7J1.png'
        }
        title="Song Artwork"
        onClick={() => {
          if (track) {
            setCurrTrack(track);
          }
        }}
      />
      <CardContent classes={{ root: classes.content }}>
        <Grid container direction="column">
          <Grid item container direction="row" justify="space-between">
            <Grid item>
              {track.mood && (
                <Chip
                  className={classes.chip}
                  variant="outlined"
                  label={track.mood}
                  size="small"
                />
              )}
            </Grid>
            <Grid item>
              <Typography
                className={classes.time}
                variant="caption"
                color="inherit"
                align="right"
              >
                {time}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography color="inherit" component="h4" variant="inherit">
              {track.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.handle}
              variant="body2"
              noWrap
              gutterBottom
            >
              <Link
                href={`https://audius.co/${track.user.handle}`}
                color="inherit"
              >
                {track.user.name}
              </Link>
              {track.user.is_verified && (
                <VerifiedIcon className={classes.verified} fontSize="small" />
              )}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container direction="row" alignItems="center">
          <Grid item>
            <Button
              className={classes.button}
              startIcon={<Icon className="fas fa-play" fontSize="small" />}
              href={`https://audius.co/tracks/${track.id}`}
            >
              {track.favorite_count}
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              startIcon={<Icon className="fas fa-heart" fontSize="small" />}
              href={`https://audius.co/tracks/${track.id}`}
            >
              {track.play_count}
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              startIcon={<Icon className="fas fa-retweet" fontSize="small" />}
              href={`https://audius.co/tracks/${track.id}`}
            >
              {track.repost_count}
            </Button>
          </Grid>

          <Grid item>
            <Button
              className={classes.button}
              href={`https://audius.co/tracks/${track.id}`}
            >
              <Icon className="fas fa-share" fontSize="small" />
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TrackRowCard;
