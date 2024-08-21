import {configureStore} from '@reduxjs/toolkit';
import userSlice from './user';
import entrySlice from './entries';

export default configureStore({
  reducer: {
    user: userSlice,
    entries: entrySlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
