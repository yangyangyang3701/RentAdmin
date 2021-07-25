import { configureStore } from '@reduxjs/toolkit';

import globalReducer from './global';

export default configureStore({
  reducer: {
    global: globalReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});
