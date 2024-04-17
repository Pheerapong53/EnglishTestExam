import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    exam: [],
}

export const ExamInfoSlice = createSlice({
    name: 'ExamInfoStore',
    initialState,
    reducers: {
        start : (state, action) => {
            return action.payload;
            // state.exam = action.payload;
        },
        finish : (state) => {
            state.exam = [];
        },
    }
})

export const fetchQuestions = createAsyncThunk("fetchQuestions", async({testresultcode, token}) => {
    try {
        let res = await axios.get(process.env.REACT_APP_API_URL +
            `/indvform?testresultcode=${testresultcode}`,
          {
            headers: {
              authtoken: "bearer " + token,
            },
          });
          return res.data;
    }catch(err) {
        console.log('ExamInfoSlice fetchQuestions -> error : ', err);
    }
})

export const { start, finish } = ExamInfoSlice.actions;
export default ExamInfoSlice.reducer;
