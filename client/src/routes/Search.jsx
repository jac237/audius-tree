import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { USER_SEARCH, TRACK_SEARCH, PLAYLIST_SEARCH } from '../graphql';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import StarIcon from '@material-ui/icons/Star';
import genres from '../data/genres.json';
import UserTileCard from '../components/User/UserTileCard';
import { TrackRowCard } from '../components/Track';
import PlaylistRowCard from '../components/PlaylistRowCard';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
  },
  paper: {
    padding: '2px 4px',
    flexGrow: 1,
    borderRadius: theme.spacing(3),
  },
  gridContainer: {
    textDecoration: 'none',
    color: 'white',
  },
  genreContainer: {
    height: 80,
    borderRadius: 10,
    padding: 15,
    background: '#029494',
    backgroundImage: 'linear-gradient(120deg, #029494, #0F0F0F)',
    transition: 'tranform 4s ease-in-out',
    WebkitTransition: 'tranform 4s ease-in-out',
    '&:hover': {
      color: '#ffed00',
      transform: 'scale(1.1)',
    },
  },
}));

const Search = ({ match }) => {
  // console.log(match);
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [
    getUsersResults,
    { loading: usersLoading, error: usersError, data: usersResults },
  ] = useLazyQuery(USER_SEARCH);
  const [
    getTracksResults,
    { loading: tracksLoading, error: tracksError, data: tracksResults },
  ] = useLazyQuery(TRACK_SEARCH);
  const [
    getPlaylistsResults,
    {
      loading: playlistsLoading,
      error: playlistsError,
      data: playlistsResults,
    },
  ] = useLazyQuery(PLAYLIST_SEARCH);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputValue) return;

    console.log('Searching w/ query: ', inputValue);
    getUsersResults({ variables: { query: inputValue } });
    getTracksResults({ variables: { query: inputValue } });
    getPlaylistsResults({ variables: { query: inputValue } });
  };

  const handleQueryChange = (e) => {
    console.log('Query value:', e.target.value);
    setInputValue(e.target.value);
  };

  if (usersResults?.getUsersBySearch) {
    console.log('got users!');
    console.log(usersResults.getUsersBySearch);
  }

  if (playlistsResults?.searchPlaylists) {
    console.log('got playlists!');
    console.log(playlistsResults.searchPlaylists);
  }

  if (usersError) {
    console.log(usersError.message);
  }

  return (
    <Router>
      <Grid container className={classes.root} spacing={2}>
        <Grid item container justify="center">
          <Grid item xs={10}>
            <Paper
              component="form"
              onSubmit={handleSearch}
              className={classes.paper}
            >
              <Grid item container justify="space-between" alignItems="center">
                <Grid item>
                  <IconButton disabled aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Grid>

                <Grid item xs>
                  <InputBase
                    fullWidth
                    value={inputValue}
                    onChange={handleQueryChange}
                    placeholder="Artists, songs, or playlists"
                    inputProps={{ 'aria-label': 'search audius tree' }}
                  />
                </Grid>

                <Grid item>
                  <IconButton onClick={handleSearch} aria-label="search">
                    <SubdirectoryArrowLeftIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {(usersLoading || tracksLoading || playlistsLoading) && (
          <CircularProgress
            style={{ margin: 'auto', padding: 20, color: '#029494' }}
          />
        )}

        {/* {!usersResults?.getUsersBySearch && !tracksResults?.getTracksBySearch && (
          <Grid item container alignItems="center" justify="center" spacing={2}>
            <Grid item xs={10}>
              <Typography variant="inherit" component="h2">
                Genres
              </Typography>
            </Grid>

            <Grid item container xs={10} spacing={2}>
              {genres.map((item) => (
                <Grid
                  item
                  key={item.genre}
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  component="a"
                  className={classes.gridContainer}
                  href={`https://audius.co/trending?genre=${item.genre}`}
                >
                  <div className={classes.genreContainer}>
                    <Typography
                      variant="inherit"
                      component="h3"
                      justify="center"
                    >
                      {item.title}
                    </Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )} */}

        {(usersResults?.getUsersBySearch ||
          tracksResults?.getTracksBySearch) && (
          <Grid item container alignItems="center" justify="center" spacing={1}>
            <Grid item xs={10}>
              <Typography variant="inherit" component="h2">
                Results
              </Typography>
            </Grid>

            {usersResults?.getUsersBySearch && (
              <Grid item container xs={10} spacing={2}>
                {usersResults.getUsersBySearch.map((user) => (
                  <Grid item key={user.id} xs={6} sm={4} md={3} lg={2}>
                    <UserTileCard user={user}></UserTileCard>
                  </Grid>
                ))}
              </Grid>
            )}

            {tracksResults?.getTracksBySearch && (
              <Grid item container xs={10} spacing={1}>
                {tracksResults.getTracksBySearch.map((track, index) => (
                  <Grid item key={track.id} xs={12}>
                    <TrackRowCard
                      track={track}
                      index={index}
                      playlist={tracksResults.getTracksBySearch}
                    />
                  </Grid>
                ))}
              </Grid>
            )}

            {playlistsResults?.searchPlaylists && (
              <Grid item container xs={10} spacing={1}>
                {playlistsResults.searchPlaylists.map((playlist) => (
                  <Grid item key={playlist.id} xs={12}>
                    <PlaylistRowCard playlist={playlist}></PlaylistRowCard>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Router>
  );
};

/**
<Grid item>
</Grid>
*/
export default Search;
