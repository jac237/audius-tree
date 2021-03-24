import React, { useEffect, useState, createContext } from 'react';

export const MusicContext = createContext();

export const MusicProvider = (props) => {
  const [currPlaylist, setCurrPlaylist] = useState(null);
  const [currTrack, setCurrTrack] = useState(null);

  return (
    <MusicContext.Provider
      value={[currPlaylist, setCurrPlaylist, currTrack, setCurrTrack]}
    >
      {props.children}
    </MusicContext.Provider>
  );
};
