import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import VerifiedIcon from '@material-ui/icons/CheckCircle';
import Grid from "@material-ui/core/Grid";
// Audius API
import { getUserInfo } from '../../api/audius';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    backgroundColor: 'transparent',
    color: 'white',
    borderRadius: '8px',
    padding: theme.spacing(1, 0, 1, 0),
    width: 125 + theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      width: 150 + theme.spacing(2),
    },
    '&:hover': {
      background: '#393939',
    },
  },
  media: {
    height: 125,
    width: 125,
    [theme.breakpoints.up('sm')]: {
      height: 150,
      width: 150
    },
    '&:hover': {
      opacity: '0.8'
    }
  },
  handle: {
    display: 'inline-flex',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  verified: {
    color: '#01CECE',
  },
}));

const UserTileCard = ({ handle }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [cover, setCover] = useState(
    "https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg"
  );

  useEffect(() => {
    if (handle) {
      getUserInfo(handle)
        .then((result) => {
          setUser(result.user)
          setName(result.user.name);
          setCover(result.user.profile_picture['150x150']);
        })
        .catch(() => {});
    }
  }, [handle]);

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      alignItems="center"
      spacing={1}
    >
        <Grid item>
          <Link href={`/${handle}`}>
            <Avatar
              className={classes.media}
              src={cover}
              title={name}
              aria-label="user profile photo"
              href={`/${handle}`}
            />
          </Link>
        </Grid>
        <Grid item>
          <Typography
            className={classes.handle}
            variant="inherit"
            noWrap
          >
            {name}
            {user?.is_verified && 
              <VerifiedIcon className={classes.verified} fontSize="small"/>
            }
          </Typography>
        </Grid>
    </Grid>
  );
};

export default UserTileCard;
