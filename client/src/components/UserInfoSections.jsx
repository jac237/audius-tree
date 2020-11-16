/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import UserStatsCard from './UserStatsCard';
import UserTracksPaper from './UserTracksPaper';

const UserInfoSections = ({ user, tracks }) => {
  return (
    <div className="body">
      {user && <UserStatsCard user={user} />}
      {tracks && <UserTracksPaper tracks={tracks} />}
    </div>
  );
};

export default UserInfoSections;
