import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: [],
    userRole:[],
}

export const userSlice = createSlice({
    name: 'userStore',
    initialState,
    reducers: {
        login : (state, action) => {
            state.user = action.payload;
            // state.userRole = action.payload.userRole;
        },
        logout : (state) => {
            state.user = initialState.user;
            localStorage.clear('token');
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;