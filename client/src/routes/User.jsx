import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MusicBar from '../components/MusicBar';
import UserStatsCard from '../components/User/UserStatsCard';
import UserTracksPaper from '../components/User/UserTracksPaper';
// Audius API
import { USER_BY_HANDLE } from '../graphql';
import { getUserInfo, getTrackSource } from '../api/audius';

const User = ({ match }) => {
  const handle = match.params.handle;
  const [user, setUser] = useState({});
  const [getUser, { loading, error, data }] = useLazyQuery(USER_BY_HANDLE);

  const [currentSong, setCurrentSong] = useState(null);
  const [trackSource, setTrackSource] = useState(null);

  useEffect(() => {
    getUser({ variables: { handle } });
  }, []);

  useEffect(() => {
    if (data?.getUserByHandle) {
      console.log(data.getUserByHandle);
      setUser(data.getUserByHandle);
    }
  }, [data]);

  useEffect(() => {
    if (currentSong) {
      getTrackSource(currentSong.id).then((result) => {
        setTrackSource(result.source);
      });
    }
  }, [currentSong]);

  if (loading || !user) return 'Loading...';
  if (error) return `${error}`;

  return (
    <Router>
      <div className="content">
        <div className="content__body">
          {user.id && (
            <>
              <UserStatsCard user={user} />
              <UserTracksPaper
                userId={user.id}
                setCurrentSong={setCurrentSong}
              />
            </>
          )}
          <MusicBar currentSong={currentSong} trackSource={trackSource} />
        </div>
      </div>
    </Router>
  );
};

export default User;
