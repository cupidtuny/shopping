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
            const newDataArray = [...state.dessertList, action.payload];
            return {
                ...state,
                dessertList: newDataArray
            };
        },
        dessertUpdate: (state, action) => {
            console.log(action.payload);
            const indexToUpdate = state.dessertList.findIndex(item => item._id === action.payload._id);
            // If the item is found
            if (indexToUpdate !== -1) {
              // Create a new array by spreading the existing data
              const newDataArray = [...state.dessertList];
              // Update the item at the found index with the new data
              newDataArray[indexToUpdate] = { ...newDataArray[indexToUpdate], ...action.payload };
              // Return a new state object with the updated array
              return {
                ...state,
                dessertList: newDataArray
              };
            }
        }
    }
})

export const { getList, dessertDelete, dessertAdd, dessertUpdate } = dessertReducer.actions;

export default dessertReducer.reducer;