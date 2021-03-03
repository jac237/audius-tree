/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import VerifiedIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { USER_SEARCH } from '../graphql';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 1, 0, 1),
    width: 185,
    [theme.breakpoints.up('sm')]: {
      width: 250,
    },
  },
}));

const AudiusSearchBar = () => {
  const classes = useStyles();
  const resultLimit = 6;
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getQuery, { loading, error, data }] = useLazyQuery(USER_SEARCH);

  useEffect(() => {
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return;
    }

    getQuery({ variables: { query: inputValue } });
    if (loading) {
      setIsLoading(true);
    }
  }, [value, inputValue]);

  useEffect(() => {
    if (data?.getUsersBySearch) {
      const result = data.getUsersBySearch;
      console.log(result);
      let newOptions = [];
      const max = result.length < resultLimit ? result.length : resultLimit;
      newOptions = [...newOptions, ...result.slice(0, max)];
      setOptions(newOptions);
      setIsLoading(false);
    }
  }, [data]);

  return (
    <Paper className={classes.root}>
      <Autocomplete
        id="audius-search-bar"
        size="small"
        getOptionLabel={(option) => option.handle}
        filterOptions={(x) => x}
        autoComplete
        includeInputInList
        filterSelectedOptions
        noOptionsText="jstjr, rayburger, groupchat, ..."
        options={options}
        value={value}
        loading={isLoading}
        onChange={(_event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <InputBase
              {...params.inputProps}
              label="Search artists..."
              placeholder="Search artists..."
              variant="outlined"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              }
              endAdornment={
                <React.Fragment>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </React.Fragment>
              }
              fullWidth
            />
          </div>
        )}
        renderOption={(user) => {
          const photo = user.profile_picture
            ? user.profile_picture.x150
            : 'https://i.imgur.com/grJvvdx.png';

          return (
            <Link color="inherit" underline="none" href={`/${user.handle}`}>
              <Grid container spacing={2} direction="row" wrap="nowrap">
                <Grid item>
                  <Avatar alt={user.name} src={photo} />
                </Grid>
                <Grid item>
                  <Typography
                    style={{ fontWeight: 'bold' }}
                    variant="subtitle2"
                    noWrap
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    style={{ display: 'inline-flex' }}
                    variant="body2"
                    color="textSecondary"
                    noWrap
                  >
                    @{user.handle}
                    {user?.is_verified && (
                      <VerifiedIcon
                        style={{ color: '#01CECE', marginLeft: 2 }}
                        fontSize="small"
                      />
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Link>
          );
        }}
      />
    </Paper>
  );
};

export default AudiusSearchBar;
