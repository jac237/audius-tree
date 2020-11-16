/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import VerifiedIcon from '@material-ui/icons/CheckCircle';

import { getUsersQuery } from '../api/audius';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      fontWeight: 'bold',
      color: '#01B4B4',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#01CECE',
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    [theme.breakpoints.up('sm')]: {
      width: 300,
    }
  },
  inputRoot: {
    margin: 0,
  },
}));

const AudiusSearchBar = () => {
  const classes = useStyles();
  const resultLimit = 5;
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  // const loaded = useRef(false);

  // Get Users by Query
  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

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
        options={options}
        value={value}
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <CssTextField
            {...params}
            className={classes.inputRoot}
            label="Search Artists..."
            variant="outlined"
            fullWidth
          />
        )}
        renderOption={(option) => {
          const photo = (option.profile_picture ? option.profile_picture['150x150'] : '');

          return (
            <Grid container spacing={2} direction="row">
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
