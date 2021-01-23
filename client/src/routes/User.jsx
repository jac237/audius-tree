import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserInfoSections } from '../components/User';
import ErrorImageCard from '../components/ErrorImageCard';
import MusicBar from '../components/MusicBar';
// Audius API
import { getUserInfo, getTrackSource } from '../api/audius';

const UserPage = ({ match }) => {
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState(null);

  const [currentSong, setCurrentSong] = useState(null);
  const [trackSource, setTrackSource] = useState(null);

  useEffect(() => {
    getUserInfo(match.params.handle)
      .then((result) => {
        setUser(result.user);
        setTracks(result.tracks);
        setError(result.error);
      })
      .catch(() => {});
  }, [match]);

  useEffect(() => {
    if (currentSong) {  
      getTrackSource(currentSong.id)
        .then((result) => {
          setTrackSource(result.source);
        });
    }
  }, [currentSong]);

  return (
    <Router>
      <div className="content">
        <div className="content__body">
          {!error
            ? <UserInfoSections user={user} tracks={tracks} setCurrentSong={setCurrentSong} />
            : <ErrorImageCard />
          }
          <MusicBar
            currentSong={currentSong}
            trackSource={trackSource}
          />
        </div>
      </div>
    </Router>
  );
};

export default UserPage;
