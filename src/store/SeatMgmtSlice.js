import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSeatState = createAsyncThunk('fetchSeatState', async () => {
    let sum = 0;
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/pagebookdate/rsvn/totalseat`
        );
        Object.values(res.data).forEach(x => { sum += x; });
        return (sum);
    } catch (err) {
        console.log('SeatMgmtSlice -> error : ', err);
    };
});//createAsyncThunk

export const fetchSeatStatusInfoByDateAndTime = createAsyncThunk('fetchSeatStatusInfoByDateAndTime',
    async ({ date, time }) => {
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API_URL}/pagebookdate/seatstate/date/${date}/time/${time}`
            );
            //console.log('date & time', date, ' : ', time, ' : ', res);
            return res;
        } catch (err) {
            console.log('SeatMgmtSlice -> error : ', err);
        };

    });

export const seatStateSlice = createSlice({
    name: 'seatstate', //slice or store name
    initialState: {
        totalseat: [],
        seatstatus: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSeatState.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchSeatState.fulfilled, (state, action) => {
            state.isLoading = false;
            state.totalseat = action.payload;
        })
        builder.addCase(fetchSeatState.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        /*------------------ seat status by date and time ------------*/
        builder.addCase(fetchSeatStatusInfoByDateAndTime.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchSeatStatusInfoByDateAndTime.fulfilled, (state, action) => {
            state.isLoading = false;
            state.seatstatus = action.payload;
        })
        builder.addCase(fetchSeatStatusInfoByDateAndTime.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});//seatStateSlice

export default seatStateSlice.reducer;
