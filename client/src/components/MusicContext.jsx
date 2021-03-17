import React, { useEffect, useState, createContext } from 'react';

export const MusicContext = createContext();

export const MusicProvider = (props) => {
  const [currPlaylist, setCurrPlaylist] = useState(null);
  const [currTrack, setCurrTrack] = useState(null);

  useEffect(() => {
    console.log('got a new track!', currTrack);
  }, [currTrack]);

  useEffect(() => {
    console.log('got a new playlist!', currPlaylist);
  }, [currPlaylist]);

  return (
    <MusicContext.Provider
      value={[currPlaylist, setCurrPlaylist, currTrack, setCurrTrack]}
    >
      {props.children}
    </MusicContext.Provider>
  );
};
