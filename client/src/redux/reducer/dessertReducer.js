import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dessertList: [],
}

export const dessertReducer = createSlice({
    name: 'dessert',
    initialState,
    reducers: {
        getList: (state, action) => {
            state.dessertList = action.payload;
            return;
        },
        dessertDelete: (state, action) => {
            state.dessertList = state.dessertList.filter(item => item._id !== action.payload);
            return;
        },
        dessertAdd: (state, action) => {
            state.dessertList = [
                ...state.dessertList,
                ...action.payload
            ];
            return;
        },
        dessertUpdate: (state, action) => {
            state.dessertList[action.payload.index] = {
                ...action.payload
            };
            return;
        }
    }
})

export const { getList, dessertDelete, dessertAdd, dessertUpdate } = dessertReducer.actions;

export default dessertReducer.reducer;