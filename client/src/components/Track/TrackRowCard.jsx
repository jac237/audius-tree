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
import TimeFormat from 'hh-mm-ss';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrTrack,
  setCurrIndex,
  setCurrPlaylist,
} from '../../redux/player/playerSlice';

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
    '&:hover': {
      cursor: 'pointer',
    },
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
    color: '#01CECE',
    borderColor: '#01CECE',
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

const TrackRowCard = (props) => {
  const classes = useStyles();
  const { track, index, playlist } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
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
        src={track?.artwork ? track.artwork.x150 : defaultCover}
        title={track.title}
        onClick={() => {
          if (track) {
            console.log('setting new track!');
            dispatch(setCurrTrack(track));
            dispatch(setCurrIndex(index));
            dispatch(setCurrPlaylist(playlist));
          }
        }}
      />
      <CardContent classes={{ root: classes.content }}>
        <Grid item container direction="column">
          <Grid item container justify="space-between" xs>
            <Grid item>
              {track.mood && (
                <Chip
                  className={classes.chip}
                  variant="outlined"
                  label={track.mood}
                  size="small"
                />
              )}
            </Grid>

            <Grid item>
              <Typography
                className={classes.time}
                variant="caption"
                color="inherit"
                align="right"
              >
                {TimeFormat.fromS(track.duration)}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container wrap="nowrap">
            <Grid item zeroMinWidth>
              <Typography
                color="inherit"
                component="h4"
                variant="inherit"
                gutterBottom
              >
                {track.title}
              </Typography>
              <Typography
                className={classes.handle}
                variant="body2"
                noWrap
                gutterBottom
              >
                <Link href={`/user/${track.user.handle}`} color="inherit">
                  {track.user.name}
                </Link>
                {track.user.is_verified && (
                  <VerifiedIcon className={classes.verified} fontSize="small" />
                )}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container justify="space-between">
            <Grid item>
              <Typography variant="body2" style={{ color: 'gray' }}>
                <Icon className="fas fa-play" style={{ fontSize: 10 }} />{' '}
                {track.play_count.toLocaleString()}
              </Typography>
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
                  href={`https://audius.co/${track?.user?.handle}`}
                >
                  <Typography variant="body2" component="h4">
                    View artist on Audius
                  </Typography>
                </MenuItem>
                <MenuItem
                  component="a"
                  href={`https://audius.co/tracks/${track.id}`}
                >
                  <Typography variant="body2" component="h4">
                    View track on Audius
                  </Typography>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TrackRowCard;
