import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
        },
        signoutSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
    },
});

export const {
    signInSuccess,
    updateSuccess,
    deleteUserSuccess,
    signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;