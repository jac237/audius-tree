import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import VerifiedIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import { USER_BY_ID } from '../../graphql';

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
      width: 150,
    },
    '&:hover': {
      opacity: '0.8',
    },
  },
  handle: {
    display: 'inline-flex',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    alignItems: 'center',
  },
  verified: {
    marginLeft: 2,
    color: '#01CECE',
  },
}));

const UserTileCard = ({ userId }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [user, setUser] = useState({});
  const [cover, setCover] = useState(
    'https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg'
  );
  const { loading, error, data } = useQuery(USER_BY_ID, {
    variables: { userId },
  });

  useEffect(() => {
    if (data?.getUserById) {
      // console.log('UserTileCard', data.getUserById);
      setUser(data.getUserById);
      setName(data.getUserById.name);
      setCover(data.getUserById.profile_picture.x150);
    }
  }, [data]);

  if (error) return console.log(error);

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <Link href={`/${user.handle}`}>
          <Avatar
            className={classes.media}
            src={cover}
            title={name}
            aria-label="user profile photo"
            href={`/${user.handle}`}
          />
        </Link>
      </Grid>
      <Grid item>
        <Typography className={classes.handle} variant="inherit" noWrap>
          {name}
          {user?.is_verified && (
            <VerifiedIcon className={classes.verified} fontSize="small" />
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserTileCard;
