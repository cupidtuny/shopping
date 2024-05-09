import authReducer from './reducer/authReducer';
import { configureStore } from '@reduxjs/toolkit';
import dessertReducer from './reducer/dessertReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dessert: dessertReducer,
    },
})

