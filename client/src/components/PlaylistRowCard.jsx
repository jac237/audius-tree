/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import VerifiedIcon from '@material-ui/icons/CheckCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import TimeFormat from 'hh-mm-ss';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCurrTrack, setCurrIndex } from '../../redux/player/playerSlice';
import { UserTags } from './User';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: 'auto',
    color: 'white',
    backgroundColor: '#333232',
    borderRadius: '4px',
    minWidth: 312,
    padding: theme.spacing(0.5),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0.5),
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  img: {
    padding: theme.spacing(1),
    width: 100,
    height: 100,
    borderRadius: theme.spacing(2),
    // '&:hover': {
    //   cursor: 'pointer',
    // },
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
    marginLeft: 2,
  },
  chip: {
    color: 'white',
    fontWeight: 'bold',
    background: '#970e0e',
    borderColor: '#970e0e',
    borderRadius: 5,
    margin: theme.spacing(0.5, 0, 0.8, 0),
  },
  button: {
    fontSize: 13,
    color: 'darkgray',
    borderColor: 'darkgray',
    '& .MuiIcon-root': {
      fontSize: 13,
      overflow: 'visible',
    },
  },
  menuButton: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const PlaylistRowCard = (props) => {
  const classes = useStyles();
  const { playlist } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  // const dispatch = useDispatch();
  const defaultCover = 'https://i.imgur.com/iajv7J1.png';

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root} elevation={1} square>
      <CardMedia
        className={classes.img}
        component="img"
        src={playlist?.artwork ? playlist.artwork.x150 : defaultCover}
        title={playlist?.playlist_name}
        onError={(event) => {
          console.log('image error:', event);
          event.onerror = null;
          event.target.src = defaultCover;
        }}
      />
      <CardContent classes={{ root: classes.content }}>
        <Grid item container justify="space-between" xs>
          <Grid item>
            <Chip
              className={classes.chip}
              variant="outlined"
              label="Playlist"
              size="small"
            />
          </Grid>

          <Grid item>
            <a
              aria-label="delete"
              onClick={handleMenuOpen}
              className={classes.menuButton}
            >
              <MoreHorizIcon style={{ color: 'gray' }} />
            </a>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem
                component="a"
                href={`https://audius.co/playlists/${playlist.id}`}
              >
                <Typography variant="body2" component="h4">
                  View playlist on Audius
                </Typography>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item zeroMinWidth>
            <Typography
              color="inherit"
              component="h4"
              variant="inherit"
              gutterBottom
            >
              {playlist?.playlist_name}
            </Typography>
            {playlist?.description?.trim() && (
              <UserTags string={playlist.description}></UserTags>
            )}
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item>
            <Typography variant="body2" style={{ color: 'gray' }}>
              <Icon className="fas fa-play" style={{ fontSize: 10 }} />{' '}
              {playlist.total_play_count.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PlaylistRowCard;
