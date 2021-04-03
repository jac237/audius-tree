/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { TrackTileCard } from '../Track';
import { TRACK_BY_ID } from '../../graphql';

const TrackRepost = (props) => {
  const { id, index, playlist } = props;
  const { loading, error, data: trackData } = useQuery(TRACK_BY_ID, {
    variables: { trackId: id },
  });
  //{ getUserTracks: tracks }
  if (error) {
    console.log(error.message);
  }

  if (loading || !trackData) return null;

  return (
    <TrackTileCard
      track={trackData.getTrackById}
      index={index}
      playlist={playlist}
    />
  );
};

export default TrackRepost;
