import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './player/playerSlice';

export default configureStore({
  reducer: {
    player: playerReducer,
  },
});
