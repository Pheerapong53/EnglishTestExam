import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    testresvcode: [],
}

export const TestInfoSlice = createSlice({
    name: 'TestInfoStore',
    initialState,
    reducers: {
        start : (state, action) => {
            state.testresvcode = action.payload;
        },
        finish : (state) => {
            state.testresvcode = [];
        },
    }
})

export const { start, finish } = TestInfoSlice.actions;
export default TestInfoSlice.reducer;