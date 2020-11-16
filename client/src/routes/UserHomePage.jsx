import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UserInfoSections from '../components/UserInfoSections';
import ErrorImageCard from '../components/ErrorImageCard';
// Audius API
import { getUserInfo } from '../api/audius';

const UserPage = ({ match }) => {
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    getUserInfo(match.params.handle)
      .then((result) => {
        setUser(result.user);
        setTracks(result.tracks);
        setError(result.error);
      })
      .catch(() => {});
  }, [match]);

  return (
    <Router>
      <div className="content">
        <div className="content__body">
          <Navbar />
          {!error
            ? <UserInfoSections user={user} tracks={tracks} />
            : <ErrorImageCard />
          }
        </div>
        {/* Music Player (TBD) */}
      </div>
    </Router>
  );
};

export default UserPage;
