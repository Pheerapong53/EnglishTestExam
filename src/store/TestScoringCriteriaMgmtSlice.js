import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchScoringCriteria = createAsyncThunk('fetchScoringCriteria', async () => {
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/pagebookdate/queryscoringcriteria`
        );
        return (res.data);
    } catch (err) {
        console.log('TestScoringCriteriaMgmtSlice -> error : ', err);
    };
}
);//createAsyncThunk

export const scoringCriteriaSlice = createSlice({
    name: 'scoringcriteriastate', //slice or store name
    initialState: {
        scoringcriteria: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchScoringCriteria.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchScoringCriteria.fulfilled, (state, action) => {
            state.isLoading = false;
            state.scoringcriteria = action.payload;
        })
        builder.addCase(fetchScoringCriteria.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});//scoringCriteriaSlice

export default scoringCriteriaSlice.reducer;
