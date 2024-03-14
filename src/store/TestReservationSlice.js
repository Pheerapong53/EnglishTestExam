import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/*-------------------------- createAsyncThunk --------------------------*/
export const fetchAllTestResvInfo = createAsyncThunk('fetchAllTestResvInfo', async () => {
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/pagebookdate/alltestresult`
        );
        //console.log('fetchAllTestResvInfo --> ', res);
        return res;
    } catch (err) {
        console.log('testResvInfoStateSlice : fetchAllTestResvInfo -> error : ', err);
    };
});

export const fetchAllTestResvInfoInOnePeriod = createAsyncThunk('fetchAllTestResvInfoInOnePeriod', async (period) => {
    const encodedData = encodeURIComponent(JSON.stringify(period));
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/pagebookdate/allreservbyoneperiod/${encodedData}`
        );
        //console.log('fetchAllTestResvInfoInOnePeriod --> ', res);
        return res;
    } catch (err) {
        console.log('testResvInfoStateSlice : fetchAllTestResvInfoInOnePeriod -> error : ', err);
    };
});

export const fetchTestResvInfobyResvCode = createAsyncThunk('fetchTestResvInfobyResvCode', async (resvcode) => {
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/pagebookdate/testresvbyresvcode/${resvcode}`
        );

        //console.log('fetchTestResvInfobyResvCode ---> ', res)
        return res;
    } catch (err) {
        console.log('testResvInfoStateSlice : fetchTestResvInfobyResvCode -> error : ', err);
    };
});

export const fetchTestResvInfobyUnitCode = createAsyncThunk('fetchTestResvInfobyUnitCode', async (resvcode) => {
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/pagebookdate/testresvbyunitcode/${resvcode}`
        );

        //console.log('fetchTestResvInfobyUnitCode ---> ', res)
        return res;
    } catch (err) {
        console.log('testResvInfoStateSlice : fetchTestResvInfobyUnitCode -> error : ', err);
    };
});

export const fetchTestResvInfobyResvDate = createAsyncThunk('fetchTestResvInfobyResvDate', async (resvdate) => {
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/pagebookdate/testresvbydate/${resvdate}`
        );
        return res;
    } catch (err) {
        console.log('testResvInfoStateSlice : fetchTestResvInfobyResvDate -> error : ', err);
    };
});

export const addOrUpdateTestResvInfo = createAsyncThunk('addOrUpdateTestResvInfo', async (testresvlist) => {
    try {
        let res = await axios.put(
            `${process.env.REACT_APP_API_URL}/pagebookdate/add_update_testresv`,
            testresvlist
        );
        return res;
    } catch (err) {
        console.log('testResvInfoStateSlice : addAndUpdateTestResvInfo -> error : ', err);
        return err;
    }
});

/*-------------------------- createSlice --------------------------*/
export const testResvInfoStateSlice = createSlice({
    name: 'testresvinfostate', //slice or store name
    initialState: {
        candAtDueDateArr: [], //candidate at a due date
        testresvarr: [], //only resvcode
        testresvbydatearr: [], //candidate sorted by resvcode
        testresvbyperiod: [], //test reservation info by one period
        alltestresvarr: [], //all test reservation
        prevresvinfoaprvstate: [], //keep prev. approval reservation info
        isLoading: false,
        error: null,
    },
    reducers: {
        addCandAtDueDate: (state, action) => {
            return { ...state, candAtDueDateArr: action.payload };
        },
        delCandAtDueDate: (state, action) => {
            return { ...state, candAtDueDateArr: action.payload };
        },
        keepResvInfoState: (state, action) => {
            return { ...state, prevresvinfoaprvstate: action.payload };
        }
    },
    extraReducers: (builder) => {
        /*-------------------- All Test Reservation  ---------------*/
        builder.addCase(fetchAllTestResvInfo.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchAllTestResvInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.alltestresvarr = action.payload;
        })
        builder.addCase(fetchAllTestResvInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*-------------------- By Reservation Code ---------------*/
        builder.addCase(fetchAllTestResvInfoInOnePeriod.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchAllTestResvInfoInOnePeriod.fulfilled, (state, action) => {
            state.isLoading = false;
            state.testresvbyperiod = action.payload;
        })
        builder.addCase(fetchAllTestResvInfoInOnePeriod.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*-------------------- By Unit Code ----------------------*/
        builder.addCase(fetchTestResvInfobyUnitCode.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTestResvInfobyUnitCode.fulfilled, (state, action) => {
            state.isLoading = false;
            state.testresvarr = action.payload;
        })
        builder.addCase(fetchTestResvInfobyUnitCode.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*-------------------- By Reservation Date ----------------------*/
        builder.addCase(fetchTestResvInfobyResvDate.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTestResvInfobyResvDate.fulfilled, (state, action) => {
            state.isLoading = false;
            state.testresvbydatearr = action.payload;
        })
        builder.addCase(fetchTestResvInfobyResvDate.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*------------------- add or update test reservation info ---------*/
        builder.addCase(addOrUpdateTestResvInfo.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(addOrUpdateTestResvInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            //state.
        })
        builder.addCase(addOrUpdateTestResvInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});//testReservationStateSlice

export const {
    addCandAtDueDate,
    delCandAtDueDate,
    keepResvInfoState
} = testResvInfoStateSlice.actions;
export default testResvInfoStateSlice.reducer;
