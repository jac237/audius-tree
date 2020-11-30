/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import VerifiedIcon from '@material-ui/icons/CheckCircle';

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
    width: 90,
    height: 90,
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
  },
  chip: {
    color: '#01CECE',
    borderColor: '#01CECE',
    margin: theme.spacing(0.5, 0, 0.5, 0),
  },
  link: {
    fontSize: 13,
    color: 'darkgray',
    '& .fa-retweet': {
      fontSize: 15,
    },
    '&:hover .fa-play': {
      color: 'lightgray',
    },
    '&:hover .fa-retweet': {
      color: '#01CECE',
    },
    '&:hover .fa-heart': {
      color: '#BC271A',
    },
    '&:hover .fa-share': {
      color: 'lightgray',
    },
  },
  fontIcon: {
    width: '1.5em',
    overflow: 'visible',
  },
}));

const SongRowCard = (props) => {
  const classes = useStyles();
  const { track, setCurrentSong } = props;
  const [time, setTime] = useState('');
  
  useEffect(() => {
    // Source: https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
    // Output: "1:01" or "4:03:59" or "123:03:59"
    const timeDisplay = (duration) => {
      // Hours, minutes and seconds
      const hrs = ~~(duration / 3600);
      const mins = ~~((duration % 3600) / 60);
      const secs = ~~duration % 60;
      let ret = "";
      if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }
  
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    }
    setTime(timeDisplay(track.duration));
  }, [track]);

  return (
    <Card className={classes.root} elevation={1} square>
      <CardMedia
        className={classes.img}
        component="img"
        src={track.artwork['150x150']}
        title="Song Artwork"
        onClick={() => {
          if (track) {
            setCurrentSong(track);
          }
        }}
      />
      <CardContent classes={{ root: classes.content }}>
        <Grid container direction="column">
          <Grid item container direction="row" justify="space-between">
            <Grid item>
              {track?.mood &&
                <Chip
                  classes={{ root: classes.chip }}
                  variant="outlined"
                  label={track.mood}
                  size="small"
                />
              }
            </Grid>
            <Grid item>
              <Typography className={classes.time} variant="caption" color="inherit" align="right">
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
                href={`https://audius.co/${track?.user?.handle}`}
                color="inherit"
              >
                {track?.user?.name}
              </Link>
              {track?.user?.is_verified && 
                <VerifiedIcon className={classes.verified} fontSize="small"/>
              }
            </Typography>
          </Grid>
        </Grid>
        <Grid item container direction="row" justify="space-between" alignItems="flex-end">
          <Grid item>
            <Link
              classes={{ root: classes.link }}
              href={`https://audius.co/tracks/${track?.id}`}
              aria-label="number of plays"
            >
              <Icon className="fas fa-play" classes={{ root: classes.fontIcon }} fontSize="inherit" />
            </Link>
            <Typography variant="caption" style={{ color: 'darkgray' }} >
              {track.play_count}
            </Typography>
          </Grid>
          <Grid item>
            <Link
              classes={{ root: classes.link }}
              aria-label="number of reposts"
              href={`https://audius.co/tracks/${track?.id}`}
            >
              <Icon className="fas fa-retweet" classes={{ root: classes.fontIcon }} fontSize="inherit" />
            </Link>
            <Typography variant="caption" style={{ color: 'darkgray' }}>
              {track.repost_count}
            </Typography>
          </Grid>
          <Grid item>
            <Link
              classes={{ root: classes.link }}
              aria-label="number of favorites"
              href={`https://audius.co/tracks/${track?.id}`}
            >
              <Icon className="far fa-heart" classes={{ root: classes.fontIcon }} fontSize="inherit" />
            </Link>
            <Typography variant="caption" style={{ color: 'darkgray' }}>
              {track.favorite_count}
            </Typography>
          </Grid>
          <Grid item>
            <Link
              classes={{ root: classes.link }}
              aria-label="share"
              href={`https://audius.co/tracks/${track?.id}`}
            >
              <Icon className="fas fa-share" classes={{ root: classes.fontIcon }} fontSize="inherit" />
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SongRowCard;
