import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/*-------------------------- createAsyncThunk --------------------------*/
export const fetchTestResultByResvCode = createAsyncThunk('fetchTestResultByResvCode', async (resvcode) => {
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/pagebookdate/testresultbyresvcode/${resvcode}`
        );
        return res;
    } catch (err) {
        console.log('TestResultSlice : fetchTestResultByResvCode -> error : ', err);
    };
});

export const fetchLastestIndvTestResult = createAsyncThunk('fetchLastestIndvTestResult', async (persid) => {
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/pagebookdate/lastestindvtestresult/${persid}`
        );
        return res;
    } catch (err) {
        console.log('TestResultSlice : fetchLastestIndvTestResult -> error : ', err);
    };
});

/*-----------------------------------------------------------------------------*/

export const addOrUpdateIndvTestResAppv = createAsyncThunk(
    'addOrUpdateIndvTestResAppv', async (testresultlist) => {
        try {
            let res = await axios.put(
                `${process.env.REACT_APP_API_URL}/pagebookdate/addupdatetestresult`,
                testresultlist
            );
            //console.log('addOrUpdateIndvTestResAppv : res ', res)
            return res;
        } catch (err) {
            console.log('TestResultSlice : addOrUpdateIndvTestResAppv -> error : ', err);
            return err;
        }
    });

/*----------------------------- updateTestResrvAprvState -----------------------------------*/
export const updateTestResrvAprvState = createAsyncThunk('updateTestResrvAprvState', async (testresrvlist) => {
    try {
        let res = await axios.put(
            `${process.env.REACT_APP_API_URL}/pagebookdate/updatetestresrvaprvstate`,
            testresrvlist
        );
        //console.log('updateTestResrvAprvState : res ', testresrvlist);
        return res;
    } catch (err) {
        console.log('TestResultSlice : updateTestResrvAprvState -> error : ', err);
        return err;
    }
});

/*-------------------------- createSlice --------------------------*/
export const testResultStateSlice = createSlice({
    name: 'testresultstate', //slice or store name
    initialState: {
        testresultarr: [],
        indvtestresultarr: [],
        addOrUpdateIndvTestResState: {},
        updateTestRsrvState: [],
        prevIndvTestResult: [],// for database,
        prevDataGridTestResult: [],// for datagrid
        isLoading: false,
        error: null,
    },
    reducers: {
        /*--------------- updated on 19-11-2023 ----------------*/
        keepPrevIndvTestResAppv: async (state, action) => {
            return {
                ...state,
                prevIndvTestResult: [{ ...state.testresultarr }]
            };
        },

        keepPrevDataGridTestResAppv: (state, action) => {
            return {
                ...state,
                prevDataGridTestResult: action.payload
            };
        },
    },
    extraReducers: (builder) => {
        /*-------------------- By Reservation Code ---------------*/
        builder.addCase(fetchTestResultByResvCode.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTestResultByResvCode.fulfilled, (state, action) => {
            state.isLoading = false;
            state.testresultarr = action.payload;
        })
        builder.addCase(fetchTestResultByResvCode.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*-------------------- By Personal Id ---------------*/
        builder.addCase(fetchLastestIndvTestResult.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchLastestIndvTestResult.fulfilled, (state, action) => {
            state.isLoading = false;
            state.indvtestresultarr = action.payload;
        })
        builder.addCase(fetchLastestIndvTestResult.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*------------------- add or update test result info ---------*/
        builder.addCase(addOrUpdateIndvTestResAppv.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(addOrUpdateIndvTestResAppv.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addOrUpdateIndvTestResState = action.payload;
        })
        builder.addCase(addOrUpdateIndvTestResAppv.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*------------------- update test reservation info ---------*/
        builder.addCase(updateTestResrvAprvState.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateTestResrvAprvState.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updateTestRsrvState = action.payload;
        })
        builder.addCase(updateTestResrvAprvState.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

    }
});//testReservationStateSlice

export const { keepPrevIndvTestResAppv, keepPrevDataGridTestResAppv } = testResultStateSlice.actions;
export default testResultStateSlice.reducer;
