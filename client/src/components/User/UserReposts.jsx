/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { TrackRepost } from '../Track';
import { GET_USER_REPOSTS } from '../../graphql';

const UserReposts = () => {
  const userId = 'DBkVA';
  const { loading, error, data: tracksData } = useQuery(GET_USER_REPOSTS, {
    variables: { userId },
  });
  // { getUserTracks: tracks }
  if (error) {
    console.log(error.message);
  }

  return (
    <>
      {!loading && (
        <Typography
          style={{ fontWeight: 'bold', fontSize: '150%', paddingLeft: 10 }}
          variant="inherit"
          gutterBottom
        >
          Recent Reposts on Audius
        </Typography>
      )}
      <Grid item container>
        {tracksData?.getUserReposts &&
          tracksData.getUserReposts.map((item, index) => {
            return item.item_type === 'track' ? (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                key={`${index} ${item.timestamp}`}
              >
                <TrackRepost id={item.item.id} index={index} playlist={null} />
              </Grid>
            ) : null;
          })}
      </Grid>
    </>
  );
};

export default UserReposts;
