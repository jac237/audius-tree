/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { GET_PLAYLIST, GET_PLAYLIST_TRACKS } from '../graphql';
import Carousel, { consts } from 'react-elastic-carousel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Skeleton from '@material-ui/lab/Skeleton';
import TrackTileCard from './Track/TrackTileCard';
import { UserTags } from './User';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    fontSize: '150%',
    fontWeight: 'bold',
  },
  caption: {
    color: 'darkgray',
    fontSize: 15,
    margin: theme.spacing(0, 0, 1, 0),
  },
  infoLink: {
    color: 'darkgray',
    padding: theme.spacing(0, 2, 0, 2),
    margin: theme.spacing(2, 0, 0, 0),
    '&:hover': {
      color: 'white',
    },
  },
  chip: {
    borderRadius: 5,
  },
}));

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const breakPoints = [
  { width: 1, itemsToShow: 2 },
  { width: 450, itemsToShow: 3 },
  { width: 850, itemsToShow: 4 },
  { width: 980, itemsToShow: 5 },
  { width: 1100, itemsToShow: 6 },
];

const myArrow = ({ type, onClick, isEdge }) => {
  const classes = {
    arrowIcon: {
      color: isEdge ? '#121212' : '#777777',
      justifyContent: 'center',
    },
    iconButton: {
      background: isEdge ? '#121212' : '#151515',
      borderRadius: 5,
      display: 'flex',
      width: '1.8rem',
      height: '95%',
      margin: 'auto',
    },
  };
  const pointer =
    type === consts.PREV ? (
      <ArrowBackIosIcon style={{ ...classes.arrowIcon, paddingLeft: 10 }} />
    ) : (
      <ArrowForwardIosIcon style={classes.arrowIcon} />
    );

  return (
    <IconButton
      size="small"
      disabled={isEdge}
      onClick={onClick}
      style={classes.iconButton}
    >
      {pointer}
    </IconButton>
  );
};

const Playlist = (props) => {
  const classes = useStyles();
  const { playlistId } = props;
  const {
    loading: playlistLoading,
    error: playlistError,
    data: playlistData, // : { getPlaylist }
  } = useQuery(GET_PLAYLIST, {
    variables: { playlistId },
  });

  const {
    loading: tracksLoading,
    error: tracksError,
    data: tracksData, // : { getPlaylistTracks }
  } = useQuery(GET_PLAYLIST_TRACKS, { variables: { playlistId } });

  if (playlistError) {
    console.error('Unable to fetch playlist: playlistError');
  } else if (tracksError) {
    console.error('Unable to fetch tracks: trackError');
  } else if (playlistData?.getPlaylist) {
    const { id, playlist_name } = playlistData.getPlaylist;
    // console.log(id, playlist_name);
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container style={{ margin: '10px 0px' }}>
        <Grid item container spacing={2} alignItems="flex-start">
          <Grid item>
            {playlistLoading || !playlistData?.getPlaylist ? (
              <Skeleton
                animation="wave"
                variant="rect"
                width={60}
                height={60}
              />
            ) : (
              <img
                alt={playlistData?.getPlaylist.playlist_name}
                variant="square"
                src={playlistData?.getPlaylist.artwork.x150}
                width="70px"
                height="70px"
                style={{ borderRadius: 5 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://i.imgur.com/iajv7J1.png';
                }}
              />
            )}
          </Grid>
          <Grid item xs>
            {playlistLoading || !playlistData?.getPlaylist ? (
              <Skeleton
                animation="wave"
                variant="text"
                width={300}
                height={80}
              />
            ) : (
              <>
                <Typography className={classes.header} variant="inherit">
                  {playlistData?.getPlaylist.playlist_name}
                </Typography>
                <UserTags string={playlistData?.getPlaylist.description} />
              </>
            )}
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs>
            {tracksLoading || !tracksData?.getPlaylistTracks ? (
              <>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width="100%"
                  height={200}
                />
                <Skeleton animation="wave" variant="text" />
                <Skeleton animation="wave" width="60%" />
              </>
            ) : (
              <Carousel
                showEmptySlots
                pagination={false}
                breakPoints={breakPoints}
                renderArrow={myArrow}
                easing="cubic-bezier(1,.15,.52,1.2)"
                tiltEasing="cubic-bezier(0.110, 0.2, 9.000, 0.210)"
                transitionMs={450}
              >
                {tracksData?.getPlaylistTracks.map((track, index) => (
                  <TrackTileCard
                    key={track.id}
                    track={track}
                    index={index}
                    playlist={tracksData.getPlaylistTracks}
                  />
                ))}
              </Carousel>
            )}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Playlist;
