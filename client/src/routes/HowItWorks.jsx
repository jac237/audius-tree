import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MusicBar from '../components/MusicBar';
import UserStatsCard from '../components/User/UserStatsCard';
import UserTracksPaper from '../components/User/UserTracksPaper';
import { USER_BY_HANDLE, TRACK_SOURCE } from '../graphql';

const HowItWorks = ({ match }) => {
  console.log(match);

  return (
    <div className="content">
      <div className="content__body">
        <h3>FEEDBACK</h3>{' '}
      </div>
    </div>
  );
};

export default HowItWorks;
