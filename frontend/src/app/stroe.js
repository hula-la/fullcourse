import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import tripReducer from '../features/trip/tripSlice';
import userReducer from '../features/user/userSlice';
import mainReducer from '../features/main/mainSlice';
import shareReducer from '../features/share/shareSlice';
import surveyReducer from '../features/survey/surveySlice';

const store = configureStore({
  reducer: {
    trip: tripReducer,
    user: userReducer,
    main: mainReducer,
    share: shareReducer,
    survey: surveyReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
