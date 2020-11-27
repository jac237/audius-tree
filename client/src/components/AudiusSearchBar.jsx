/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
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

import { getUsersQuery } from '../api/audius.js';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 1, 0, 1),
    width: 185,
    [theme.breakpoints.up('sm')]: {
      width: 250,
    }
  },
}));

const AudiusSearchBar = () => {
  const classes = useStyles();
  const resultLimit = 6;
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [active, setActive] = useState(false);

  // Get Users by Query
  useEffect(() => {
    let active = true

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    setLoading(true);
    getUsersQuery(inputValue)
      .then((result) => {
        if (active) {
          let newOptions = [];

          if (value) {
            newOptions = [value];
          }

          const max = (result.users.length < resultLimit ? result.users.length : resultLimit);
          
          if (result) {
            newOptions = [...newOptions, ...result.users.slice(0, max)];
          }

          setOptions(newOptions);
          setLoading(false);
        }
      })
      .catch(() => {});
      
    return () => {
      active = false;
    }; 
  }, [value, inputValue]);

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
        noOptionsText="JSTJR, RayBurger, ..."
        options={options}
        value={value}
        loading={loading}
        onChange={(_, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <InputBase
              {...params.inputProps}
              label="Search Artists..."
              placeholder="Search Artists..."
              variant="outlined"
              startAdornment= {(
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              )}
              endAdornment= {(
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null }
                </React.Fragment>
              )}
              fullWidth
            />
          </div>
        )}
        renderOption={(option) => {
          const photo = (option.profile_picture ? option.profile_picture['150x150'] : '');

          return (
            <Grid container spacing={2} direction="row" wrap="nowrap">
              <Grid item>
                <Avatar alt={option.name} src={photo} />
              </Grid>
              <Link
                color="inherit"
                underline="none"
                href={`/${option.handle}`}>
                <Grid item>
                  <Typography style={{ fontWeight: 'bold'}} variant="subtitle2" noWrap>
                    {option.name}
                  </Typography>
                  <Typography style={{ display: 'inline-flex' }} variant="body2" color="textSecondary" noWrap>
                    @{option.handle}
                    {option?.is_verified && 
                      <VerifiedIcon style={{ color: '#01CECE' }} fontSize="small"/>
                    }
                  </Typography>
                </Grid>
              </Link>
            </Grid>
          )
        }}
      />
    </Paper>
  );
};

export default AudiusSearchBar;
