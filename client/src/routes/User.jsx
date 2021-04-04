import React from 'react';
import { useQuery } from '@apollo/client';
import { USER_BY_HANDLE } from '../graphql';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import UserStatsCard from '../components/User/UserStatsCard';
import UserTracksPaper from '../components/User/UserTracksPaper';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

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
      <Grid item container>
        <Grid item xs>
          <Skeleton animation="wave" variant="rect" width="100%" height={250} />
        </Grid>
      </Grid>

      <Grid item container xs={11} spacing={4}>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="circle"
            width={100}
            height={100}
          />
        </Grid>
        <Grid item xs>
          <Skeleton animation="wave" variant="rect" width="100%" height={100} />
        </Grid>
      </Grid>

      <Grid item container xs={11}>
        <Grid item xs>
          <Skeleton animation="wave" variant="rect" width="30%" height={50} />
          <Skeleton animation="wave" variant="text" />
          <Skeleton animation="wave" variant="text" />
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
      <Grid item container spacing={2} xs={11}>
        <Grid item>
          <Skeleton animation="wave" variant="rect" width={100} height={100} />
        </Grid>

        <Grid item xs>
          <Skeleton animation="wave" variant="rect" width="70%" height={25} />
          <Skeleton animation="wave" variant="text" width="30%" />
          <Skeleton animation="wave" variant="text" height={50} />
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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default User;
