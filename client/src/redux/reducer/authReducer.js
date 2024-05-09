import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logined: false,
    user: null
}

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userExists: (state, action) => {
            state.logined = true;
            state.user = action.payload;
        },
        userNotExists: (state) => {
            state.user = null;
            state.logined = false;
        }
    }
})

export const { userExists, userNotExists } = authReducer.actions;

export default authReducer.reducer;