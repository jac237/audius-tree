import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import VerifiedIcon from '@material-ui/icons/CheckCircle';
import Skeleton from '@material-ui/lab/Skeleton';
import { MusicContext } from '../MusicContext';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrTrack,
  setCurrIndex,
  setCurrPlaylist,
} from '../../redux/player/playerSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    // background: '#121212',
    backgroundColor: 'transparent',
    color: 'white',
    borderRadius: '8px',
    width: 135 + theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 175 + theme.spacing(3),
    },
    '&:hover': {
      background: '#393939',
    },
  },
  skeleton: {
    margin: 15,
    width: 135,
    [theme.breakpoints.up('md')]: {
      width: 175,
    },
  },
  media: {
    borderRadius: '10%',
    padding: theme.spacing(1),
    height: 135,
    width: 135,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1.5),
      height: 175,
      width: 175,
    },
    '&:hover': {
      opacity: '0.8',
      cursor: 'pointer',
    },
  },
  content: {
    padding: theme.spacing(0, 1, 0, 1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 2, 0, 2),
    },
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  handle: {
    display: 'inline-flex',
    color: 'gray',
    '&:hover': {
      color: 'white',
    },
  },
  verified: {
    marginLeft: 2,
    color: '#01CECE',
  },
  routerLink: {
    textDecoration: 'none',
    color: 'gray',
    '&:hover': {
      textDecoration: 'underline',
      color: 'white',
    },
  },
}));

const TrackTileCard = (props) => {
  const classes = useStyles();
  const defaultCover = 'https://i.imgur.com/iajv7J1.png';
  const { track, index, playlist } = props;
  const dispatch = useDispatch();
  // const currTrack = useSelector((state) => state.player.currTrack);
  // const currIndex = useSelector((state) => state.player.currIndex);

  return (
    <Card className={classes.root} elevation={0}>
      {!track ? (
        <Skeleton
          variant="rect"
          width={150}
          height={150}
          className={classes.skeleton}
        />
      ) : (
        <>
          <CardMedia
            className={classes.media}
            component="img"
            src={track.artwork ? track.artwork.x150 : defaultCover}
            title={track?.title}
            onClick={() => {
              if (track) {
                console.log('setting new track!', track);
                dispatch(setCurrTrack(track));
                dispatch(setCurrIndex(index));
                dispatch(setCurrPlaylist(playlist));
              }
            }}
          />
          <CardContent className={classes.content}>
            <Typography
              className={classes.title}
              variant="inherit"
              component="p"
              noWrap
              gutterBottom
            >
              {track?.title}
            </Typography>
            <Typography className={classes.handle} variant="body2" noWrap>
              <Link
                to={`/user/${track?.user?.handle}`}
                className={classes.routerLink}
              >
                {track?.user?.name}
              </Link>
              {track?.user?.is_verified && (
                <VerifiedIcon className={classes.verified} fontSize="small" />
              )}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default TrackTileCard;
