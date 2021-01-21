import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    nickname: "",
};

const playerSlice = createSlice({
    name: 'player',
    initialState: INITIAL_STATE,
    reducers: {
        getNickname: (state, action) => ({
            ...state,
            nickname: action.payload
        })
    },
});

export const {
    getNickname,
} = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
