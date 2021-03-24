import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    isPlaying: true,
    currTrack: null,
    currPlaylist: null,
    currIndex: 0,
  },
  reducers: {
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrTrack: (state, action) => {
      // console.log('playerSlice: setting new current track:', action);
      state.currTrack = action.payload;
    },
    setCurrIndex: (state, action) => {
      // console.log('playerSlice: setting new current index:', action);
      state.currIndex = action.payload;
    },
    setCurrPlaylist: (state, action) => {
      // console.log('playerSlice: setting new current playlist:', action);
      state.currPlaylist = action.payload;
    },
    playNextSong: (state, action) => {
      // console.log('attempting to play Next Song:', action);
      const { index, playlist } = action.payload;
      // console.log('index, playlist', index, playlist);

      let newIndex;
      newIndex = index + 1;

      if (newIndex >= playlist.length) {
        newIndex = 0;
      }

      state.currIndex = newIndex;
      state.currTrack = playlist[newIndex];
      state.currPlaylist = playlist;
    },
    playPrevSong: (state, action) => {
      // console.log('attempting to play Prev Song:', action);
      const { index, playlist } = action.payload;

      let newIndex;
      newIndex = index - 1;

      if (newIndex < 0) {
        newIndex = playlist.length - 1;
      }

      state.currIndex = newIndex;
      state.currTrack = playlist[newIndex];
      state.currPlaylist = playlist;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsPlaying,
  setCurrTrack,
  setCurrIndex,
  setCurrPlaylist,
  playNextSong,
  playPrevSong,
} = playerSlice.actions;

export default playerSlice.reducer;
