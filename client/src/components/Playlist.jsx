/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { GET_PLAYLIST, GET_PLAYLIST_TRACKS } from '../graphql';
import Carousel, { consts } from 'react-elastic-carousel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
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

const breakPoints = [
  { width: 1, itemsToShow: 2 },
  { width: 450, itemsToShow: 3 },
  { width: 850, itemsToShow: 4 },
  { width: 980, itemsToShow: 5 },
];

const myArrow = ({ type, onClick, isEdge }) => {
  const pointer =
    type === consts.PREV ? <ChevronLeftIcon /> : <ChevronRightIcon />;
  return (
    <IconButton
      style={{
        borderRadius: 5,
        height: '85%',
        margin: 'auto',
        width: '1.8rem',
        background: '#3c3c3c',
      }}
      size="small"
      onClick={onClick}
      disabled={isEdge}
    >
      {pointer}
    </IconButton>
  );
};

const Playlist = (props) => {
  const classes = useStyles();
  const { id } = props;
  const {
    loading: playlistLoading,
    error: playlistError,
    data: playlistData,
  } = useQuery(GET_PLAYLIST, {
    variables: { playlistId: id },
  });
  const {
    loading: tracksLoading,
    error: tracksError,
    data: tracksData,
  } = useQuery(GET_PLAYLIST_TRACKS, { variables: { playlistId: id } });

  useEffect(() => {
    if (playlistError) {
      console.error('Unable to fetch playlist: playlistError');
    } else if (tracksError) {
      console.error('Unable to fetch tracks: trackError');
    }
  }, [playlistError, tracksError]);

  useEffect(() => {
    if (playlistData?.getPlaylist) {
      const { id, playlist_name } = playlistData?.getPlaylist;
      console.log(id, playlist_name);
    }
  }, [playlistData]);

  return (
    <Grid container style={{ margin: '10px 0px' }}>
      <Grid item container spacing={2} alignItems="flex-start">
        <Grid item>
          {playlistLoading || !playlistData?.getPlaylist ? (
            <Skeleton variant="rect" width={60} height={60} />
          ) : (
            <img
              alt={playlistData.getPlaylist?.playlist_name}
              variant="square"
              src={playlistData.getPlaylist?.artwork.x150}
              width="80px"
              height="80px"
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
            <Skeleton variant="text" width={300} height={80} />
          ) : (
            <>
              <Typography className={classes.header} variant="inherit">
                {playlistData?.getPlaylist?.playlist_name}
              </Typography>
              <UserTags string={playlistData?.getPlaylist?.description} />
            </>
          )}
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs>
          {tracksLoading || !tracksData?.getPlaylistTracks ? (
            <>
              <Skeleton
                variant="rect"
                animation="wave"
                width="100%"
                height={200}
              />
              <Skeleton variant="text" />
              <Skeleton width="60%" />
            </>
          ) : (
            <Carousel
              showEmptySlots
              pagination={false}
              breakPoints={breakPoints}
              renderArrow={myArrow}
              easing="cubic-bezier(1,.15,.55,1.54)"
              tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
              transitionMs={700}
            >
              {tracksData.getPlaylistTracks.map((track) => (
                <TrackTileCard
                  key={track.id}
                  trackData={track}
                  // setCurrentSong={setCurrentSong}
                />
              ))}
            </Carousel>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Playlist;
