/* eslint-disable react/prop-types */
import { useLazyQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel, { consts } from 'react-elastic-carousel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Skeleton from '@material-ui/lab/Skeleton';
import { GET_PLAYLIST, GET_PLAYLIST_TRACKS } from '../graphql';
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
  { width: 550, itemsToShow: 3 },
  { width: 768, itemsToShow: 4 },
  { width: 1100, itemsToShow: 5 },
];

const myArrow = ({ type, onClick, isEdge }) => {
  const styles = {
    borderRadius: 5,
    height: 50,
    background: 'rgba(255,255,255,0.5)',
  };
  const pointer =
    type === consts.PREV ? (
      <ChevronLeftIcon style={styles} />
    ) : (
      <ChevronRightIcon style={styles} />
    );
  return (
    <IconButton
      style={{ margin: 'auto', width: 25 }}
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
  const { id, setCurrentSong } = props;
  const [
    getPlaylist,
    { loading: playlistLoading, error: playlistError, data: playlistData },
  ] = useLazyQuery(GET_PLAYLIST);
  const [
    getTracks,
    { loading: tracksLoading, error: tracksError, data: tracksData },
  ] = useLazyQuery(GET_PLAYLIST_TRACKS);

  useEffect(() => {
    // console.log('FeaturedTracks', props);
    getPlaylist({ variables: { playlistId: id } });
    getTracks({ variables: { playlistId: id } });
  }, []);

  useEffect(() => {
    if (playlistData?.getPlaylist) {
      console.log(playlistData);
    }
  }, [playlistData]);

  return (
    <Grid container style={{ marginBottom: 10 }}>
      <Grid
        item
        container
        spacing={2}
        alignItems="flex-start"
        style={{ paddingLeft: '2.5rem' }}
      >
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
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
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
                  setCurrentSong={setCurrentSong}
                />
              ))}
            </Carousel>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
// <div style={{ width: '100%' }}>
//   {playlistLoading || !playlistData ? (
//     <div>
//       <Skeleton variant="rect" width={40} height={40} />
//       <Skeleton variant="text" />
//     </div>
//   ) : (
//     <div>
// <Avatar
//   alt="Remy Sharp"
//   src={playlistData.getPlaylist.artwork.x150}
//   onError={(e) => {
//     e.target.onerror = null;
//     e.target.src = 'https://i.imgur.com/iajv7J1.png';
//   }}
//   style={{ display: 'inline-block' }}
// />
// <Typography className={classes.header} variant="inherit">
//   {playlistData.getPlaylist.playlist_name}
// </Typography>
//     </div>
//   )}
// {tracksLoading || !tracksData ? (
//   <CircularProgress />
// ) : (
//   <div style={{ width: '100%' }}>
//     <Carousel breakPoints={breakPoints} pagination={false} showEmptySlots>
//       {tracksData.getPlaylistTracks.map((track) => (
//         <TrackTileCard
//           key={track.id}
//           trackData={track}
//           setCurrentSong={setCurrentSong}
//         />
//       ))}
//     </Carousel>
//   </div>
// )}
// </div>

export default Playlist;
