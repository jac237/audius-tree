import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MusicBar from '../components/MusicBar';
import UserStatsCard from '../components/User/UserStatsCard';
import UserTracksPaper from '../components/User/UserTracksPaper';
import { USER_BY_HANDLE, TRACK_SOURCE } from '../graphql';

const User = ({ match }) => {
  const handle = match.params.handle;
  const [user, setUser] = useState({});
  const [getUser, { loading, error, data }] = useLazyQuery(USER_BY_HANDLE);
  const [getTrackSource, { data: sourceTrack }] = useLazyQuery(TRACK_SOURCE);

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
    if (currentSong?.id) {
      console.log(currentSong);
      getTrackSource({ variables: { trackId: currentSong.id } });
    }
  }, [currentSong]);

  useEffect(() => {
    if (sourceTrack?.getTrackSource) {
      setTrackSource(sourceTrack.getTrackSource);
    }
  }, [sourceTrack]);

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
