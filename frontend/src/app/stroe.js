import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import tripReducer from '../features/trip/tripSlice';
import userReducer from '../features/user/userSlice';
import mainReducer from '../features/main/mainSlice';
import shareReducer from '../features/share/shareSlice';
import surveyReducer from '../features/survey/surveySlice';
import arReducer from '../features/ar/arSlice'

const store = configureStore({
  reducer: {
    trip: tripReducer,
    user: userReducer,
    main: mainReducer,
    share: shareReducer,
    survey: surveyReducer,
    ar: arReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
