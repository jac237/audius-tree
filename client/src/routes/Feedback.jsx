import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MusicBar from '../components/MusicBar';
import UserStatsCard from '../components/User/UserStatsCard';
import UserTracksPaper from '../components/User/UserTracksPaper';
import { USER_BY_HANDLE, TRACK_SOURCE } from '../graphql';

const Feedback = ({ match }) => {
  console.log(match);

  return (
    <Router>
      <div className="content">
        <div className="content__body">
          <h3>FEEDBACK</h3>
        </div>
      </div>
    </Router>
  );
};

export default Feedback;
