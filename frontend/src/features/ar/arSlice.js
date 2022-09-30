import { createSlice } from '@reduxjs/toolkit';
import { fetchPlaceTravel } from '../ar/arActions';

const initialState = {
    placeTravelList: null
}
const arSlice = createSlice({
    name: 'ar',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPlaceTravel.fulfilled]: (state, { payload }) => {
            state.placeTravelList = payload.data
        }
    }
})

export default arSlice.reducer;
