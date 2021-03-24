import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER_BY_HANDLE } from '../graphql';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

import UserStatsCard from '../components/User/UserStatsCard';
import UserTracksPaper from '../components/User/UserTracksPaper';

/**
 * Banner
 * Avatar / Stats
 * Name
 * Handle
 * Description
 * Location
 */
const LoadingUserStats = () => {
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item container xs>
        <Skeleton variant="rect" width="100%" height={250} />
      </Grid>

      <Grid item container xs={8} spacing={4}>
        <Grid item>
          <Skeleton variant="circle" width={100} height={100} />
        </Grid>
        <Grid item xs>
          <Skeleton variant="rect" width="100%" height={100} />
        </Grid>
      </Grid>

      <Grid item container xs={8}>
        <Grid item xs>
          <Skeleton variant="rect" width="30%" height={50} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
      </Grid>
    </Grid>
  );
};

/**
 * Image / ( Mood, Title, Name, Stats )
 */
const LoadingUserTrack = () => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item container spacing={2} xs={8}>
        <Grid item>
          <Skeleton variant="rect" width={100} height={100} />
        </Grid>

        <Grid item xs>
          <Skeleton variant="rect" width="70%" height={25} />
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" height={50} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const User = ({ match }) => {
  const handle = match.params.handle;
  const { loading, error, data: userData } = useQuery(USER_BY_HANDLE, {
    variables: { handle },
  });

  if (error) console.log(error.message);

  return (
    <Router>
      <div>
        {error || loading || !userData?.getUserByHandle ? (
          <>
            <LoadingUserStats />
            <br />
            <LoadingUserTrack />
          </>
        ) : (
          <>
            <UserStatsCard user={userData.getUserByHandle} />
            <UserTracksPaper userId={userData.getUserByHandle.id} />
          </>
        )}
      </div>
    </Router>
  );
};

export default User;
