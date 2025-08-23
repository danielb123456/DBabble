import loaderReducer from './loaderSlice';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './usersSlice';

// Redux store to manager all slices
const store = configureStore({
    reducer: { loaderReducer, userReducer }
});

export default store;