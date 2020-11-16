import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Modal from '@material-ui/core/Modal';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import VerifiedIcon from '@material-ui/icons/CheckCircle';
// Audius API
import { getTrack } from '../api/audius.js';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    // background: '#121212',
    backgroundColor: 'transparent',
    color: 'white',
    borderRadius: '8px',
    width: 125 + theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      width: 175 + theme.spacing(3)
    },
    '&:hover': {
      background: '#393939',
    },
  },
  media: {
    borderRadius: '10%',
    padding: theme.spacing(1),
    height: 125,
    width: 125,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1.5),
      height: 175,
      width: 175
    },
    '&:hover': {
      opacity: '0.8'
    }
  },
  content: {
    padding: theme.spacing(0, 1, 0, 1),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 2, 0, 2)
    },
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  handle: {
    display: 'inline-flex',
    color: 'gray',
    '&:hover': {
      color: 'white',
    }
  },
  verified: {
    color: '#01CECE',
  },
  paper: {
    position: 'absolute',
    width: 300,
    height: 300,
  },
}));

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const emptyTrack = {
  title: '',
  user: {
    handle: '',
  },
};

const SongTileCard = ({ trackData, id }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [name, setName] = useState('');
  const [track, setTrack] = useState(emptyTrack);
  const [cover, setCover] = useState(
    "https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg"
  );
  const [modalImg, setModalImg] = useState(cover);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      getTrack(id)
        .then((result) => {
          setName(result.track.user.name)
          setTrack(result.track);
          setCover(result.track.artwork['150x150']);
          setModalImg(result.track.artwork['480x480']);
        })
        .catch(() => {});
    }
  }, [id]);

  useEffect(() => {
    if (trackData) {
      setName(trackData.user.name)
      setTrack(trackData);
      setCover(trackData.artwork['150x150']);
      setModalImg(trackData.artwork['480x480']);
    }
  }, [trackData]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root} elevation={0}>
        <CardMedia
          className={classes.media}
          component="img"
          src={cover}
          title={track?.title}
          onClick={handleOpen}
        />
        <Modal
          disableEnforceFocus
          disableAutoFocus
          open={open}
          onClose={handleClose}
          aria-labelledby="Song Artwork"
          aria-describedby="Song Artwork Modal"
        >
          <Paper style={modalStyle} className={classes.paper}>
            <img src={modalImg} alt="Song Artwork" height="100%"/>
          </Paper>
        </Modal>
        <CardContent className={classes.content}>
          <Typography
            className={classes.title}
            variant="inherit"
            component="p"
            noWrap
            gutterBottom
          >
            {track?.title}
          </Typography>
          <Typography
            className={classes.handle}
            variant="body2"
            noWrap
          >
            <Link
              href={`/${track?.user?.handle}`}
              color="inherit"
            >
              {name}
            </Link>
            {track?.user?.is_verified && 
              <VerifiedIcon className={classes.verified} fontSize="small"/>
            }
          </Typography>
        </CardContent>
    </Card>
  );
};

export default SongTileCard;
