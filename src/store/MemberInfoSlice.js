import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMemberInfoByPersId = createAsyncThunk('fetchMemberInfoByPersId', async (arg) => {
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/pagebookdate/querymemberinfo/persid/${arg.pers_id}`,{
                // headers: {
                //     'Content-Type': 'application/json',
                //     'authtoken' : 'bearer ' + arg.token,
                // }
            }
        );
        return (res.data);
    } catch (err) {
        console.log('MemberInfoSlice fetchMemberInfoByPersId -> error : ', err);
    };
});

export const fetchMemberInfoByName = createAsyncThunk('fetchMemberInfoByName', async (arg) => {
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/pagebookdate/querymemberinfo/persname/${arg.pers_name}`
        );
        return (res.data);
    } catch (err) {
        console.log('MemberInfoSlice fetchMemberInfoByName -> error : ', err);
    };
});

export const fetchMemberInfoByUserType = createAsyncThunk('fetchMemberInfoByUserType', async (usertype) => {
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/pagebookdate/queryMemberInfoByUsrType/usertype/${usertype}`
        );
        return (res.data);
    } catch (err) {
        console.log('MemberInfoSlice fetchMemberInfoByPosition -> error : ', err);
    }
});

export const memberInfoSlice = createSlice({
    name: 'memberinfo', //slice or store name  memberinfo.meminfoarr
    initialState: {
        meminfoarr: null,
        meminfobyusrtype: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMemberInfoByPersId.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchMemberInfoByPersId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.meminfoarr = action.payload;
        })
        builder.addCase(fetchMemberInfoByPersId.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        builder.addCase(fetchMemberInfoByName.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchMemberInfoByName.fulfilled, (state, action) => {
            state.isLoading = false;
            state.meminfoarr = action.payload;
        })
        builder.addCase(fetchMemberInfoByName.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        builder.addCase(fetchMemberInfoByUserType.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchMemberInfoByUserType.fulfilled, (state, action) => {
            state.isLoading = false;
            state.meminfobyusrtype = action.payload;
        })
        builder.addCase(fetchMemberInfoByUserType.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});//memberInfoSlice 

export default memberInfoSlice.reducer;
