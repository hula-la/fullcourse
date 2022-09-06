import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "../features/trip/tripSlice";
import userReducer from "../features/user/userSlice";
import mainReducer from "../features/main/mainSlice";

const store = configureStore({
  reducer: {
    trip: tripReducer,
    user: userReducer,
    main: mainReducer,
  },
});

export default store;
