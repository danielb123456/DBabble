import { createSlice } from '@reduxjs/toolkit';

// redux simplifies STATE MANAGEMENT
// slice = state + reducers (functions that change state) + ()
const loaderSlice = createSlice({
    name: 'loader',
    initialState: { loader: false },
    reducers: {
        showLoader: (state) => { state.loader = true; },
        hideLoader: (state) => { state.loader = false; }
    }
});

export const { showLoader, hideLoader } = loaderSlice.actions; // actions for each reducer
export default loaderSlice.reducer;