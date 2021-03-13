import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import VerifiedIcon from '@material-ui/icons/CheckCircle';
import Skeleton from '@material-ui/lab/Skeleton';
import { TRACK_BY_ID } from '../../graphql';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    // background: '#121212',
    backgroundColor: 'transparent',
    color: 'white',
    borderRadius: '8px',
    width: 135 + theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 175 + theme.spacing(3),
    },
    '&:hover': {
      background: '#393939',
    },
  },
  skeleton: {
    margin: 15,
    width: 135,
    [theme.breakpoints.up('md')]: {
      width: 175,
    },
  },
  media: {
    borderRadius: '10%',
    padding: theme.spacing(1),
    height: 135,
    width: 135,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1.5),
      height: 175,
      width: 175,
    },
    '&:hover': {
      opacity: '0.8',
      cursor: 'pointer',
    },
  },
  content: {
    padding: theme.spacing(0, 1, 0, 1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 2, 0, 2),
    },
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  handle: {
    display: 'inline-flex',
    color: 'gray',
    '&:hover': {
      color: 'white',
    },
  },
  verified: {
    marginLeft: 2,
    color: '#01CECE',
  },
}));

const emptyTrack = {
  title: '',
  user: {
    handle: '',
  },
};

const TrackTileCard = (props) => {
  const classes = useStyles();
  const { trackData, trackId, setCurrentSong } = props;
  const [getTrack, { loading, error, data }] = useLazyQuery(TRACK_BY_ID);

  const [name, setName] = useState('');
  const [track, setTrack] = useState(emptyTrack);
  const [cover, setCover] = useState(
    'https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg'
  );

  useEffect(() => {
    if (trackId) {
      getTrack({ variables: { trackId } });
    }
  }, []);

  useEffect(() => {
    if (data?.getTrackById) {
      setName(data.getTrackById.user.name);
      setTrack(data.getTrackById);
      setCover(data.getTrackById.artwork.x150);
    }
  }, [data]);

  useEffect(() => {
    if (trackData) {
      setName(trackData.user.name);
      setTrack(trackData);
      setCover(trackData.artwork.x150);
    }
  }, [trackData]);

  if (error) return console.log(error);

  return (
    <Card className={classes.root} elevation={0}>
      {!data && !trackData ? (
        <Skeleton
          variant="rect"
          width={150}
          height={150}
          className={classes.skeleton}
        />
      ) : (
        <>
          <CardMedia
            className={classes.media}
            component="img"
            src={cover}
            title={track?.title}
            onClick={() => {
              if (track) {
                setCurrentSong(track);
              }
            }}
          />
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
            <Typography className={classes.handle} variant="body2" noWrap>
              <Link href={`/user/${track?.user?.handle}`} color="inherit">
                {name}
              </Link>
              {track?.user?.is_verified && (
                <VerifiedIcon className={classes.verified} fontSize="small" />
              )}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default TrackTileCard;
