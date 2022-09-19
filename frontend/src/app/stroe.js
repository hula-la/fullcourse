import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import tripReducer from '../features/trip/tripSlice';
import userReducer from '../features/user/userSlice';
import mainReducer from '../features/main/mainSlice';
import shareReducer from '../features/share/shareSlice';

const store = configureStore({
  reducer: {
    trip: tripReducer,
    user: userReducer,
    main: mainReducer,
    share: shareReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
