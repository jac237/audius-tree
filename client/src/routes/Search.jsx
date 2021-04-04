import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { USER_SEARCH, TRACK_SEARCH, PLAYLIST_SEARCH } from '../graphql';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = ({ match }) => {
  let query = useQuery();
  const classes = useStyles();
  const history = useHistory();
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

  useEffect(() => {
    const urlQuery = query.get('query');
    console.log('useEffect ran', urlQuery);
    if (urlQuery) {
      setInputValue(urlQuery);
      handleSearch(null, urlQuery);
    }
  }, []);

  const handleSearch = (e = null, value = null) => {
    if (e) e.preventDefault();
    if (!value && !inputValue) return;

    const queryValue = inputValue ? inputValue : value;
    const params = new URLSearchParams();

    params.append('query', queryValue);
    history.push({ search: params.toString() });

    console.log('Searching w/ query: ', queryValue);
    getUsersResults({ variables: { query: queryValue } });
    getTracksResults({ variables: { query: queryValue } });
    getPlaylistsResults({
      variables: { query: queryValue },
    });
  };

  const handleQueryChange = (e) => {
    console.log('Query value:', e.target.value);
    setInputValue(e.target.value);
  };

  // if (usersResults?.getUsersBySearch) {
  //   console.log('got users!');
  //   console.log(usersResults.getUsersBySearch);
  // }

  // if (playlistsResults?.searchPlaylists) {
  //   console.log('got playlists!');
  //   console.log(playlistsResults.searchPlaylists);
  // }

  if (usersError) {
    console.log(usersError.message);
  } else if (tracksError) {
    console.log(usersError.message);
  } else if (playlistsError) {
    console.log(usersError.message);
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
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

        <Grid item container xs={12} justify="center">
          {(usersLoading || tracksLoading || playlistsLoading) && (
            <CircularProgress
              style={{ margin: 'auto', padding: 20, color: '#029494' }}
            />
          )}
        </Grid>
      </Grid>

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

      {(usersResults?.getUsersBySearch || tracksResults?.getTracksBySearch) && (
        <Grid
          container
          style={{ marginTop: 20 }}
          direction="column"
          spacing={1}
        >
          <Grid item>
            <Typography variant="inherit" component="h2">
              Results
            </Typography>
          </Grid>

          {usersResults?.getUsersBySearch && (
            <Grid item container>
              {usersResults.getUsersBySearch.map((user) => (
                <Grid item key={user.id} xs={6} sm={4} md={3} lg={2}>
                  <UserTileCard user={user}></UserTileCard>
                </Grid>
              ))}
            </Grid>
          )}

          {tracksResults?.getTracksBySearch && (
            <Grid item container spacing={1}>
              {tracksResults.getTracksBySearch.map((track, index) => (
                <Grid item container key={track.id}>
                  <Grid item xs>
                    <TrackRowCard
                      track={track}
                      index={index}
                      playlist={tracksResults.getTracksBySearch}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}

          {playlistsResults?.searchPlaylists && (
            <Grid item container spacing={1}>
              {playlistsResults.searchPlaylists.map((playlist) => (
                <Grid item container key={playlist.id}>
                  <Grid item xs>
                    <PlaylistRowCard playlist={playlist}></PlaylistRowCard>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

/**
<Grid item>
</Grid>
*/
export default Search;
