import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const setShowScoringCriteria = createAsyncThunk('setShowScoringCriteria',
    async (data) => {
        const { rsrvcode, scoringshowed } = data;
        try {
            let res = await axios.put(
                `${process.env.REACT_APP_API_URL}/testmgmt/showscoringcriteria/rsrvcode/${rsrvcode}/scoringshowed/${scoringshowed}`
            );
            //console.log('date & time', res);
            return res;
        } catch (err) {
            console.log('testMgmtSlice : setShowScoringCriteria -> error : ', err);
        };

    });

export const updateTestInvigilator = createAsyncThunk('updateTestInvigilator',
    async (data) => {
        const { rsrvcode, invigilator_id } = data;
        try {
            let res = await axios.put(
                `${process.env.REACT_APP_API_URL}/testmgmt/invigilator/rsrvcode/${rsrvcode}/invigilator_id/${invigilator_id}`
            );
            return res;
        } catch (err) {
            console.log('testMgmtSlice : updateTestInvigilator -> error : ', err);
        };

    });

export const updateTestType = createAsyncThunk('updateTestType',
    async (data) => {
        const { rsrvcode, testtype } = data;
        try {
            let res = await axios.put(
                `${process.env.REACT_APP_API_URL}/testmgmt/seltesttype/rsrvcode/${rsrvcode}/testtype/${testtype}`
            );
            return res;
        } catch (err) {
            console.log('testMgmtSlice : updateTestType -> error : ', err);
        };
    });

export const updateIndvTestType = createAsyncThunk('updateIndvTestType',
    async (data) => {
        const { testresultcode, testtype } = data;
        try {
            let res = await axios.put(
                `${process.env.REACT_APP_API_URL}/testmgmt/indvseltesttype/testresultcode/${testresultcode}/testtype/${testtype}`
            );
            return res;
        } catch (err) {
            console.log('testMgmtSlice : updateIndvTestType -> error : ', err);
        };
    });

export const updateTestLocationAndInvigilator = createAsyncThunk('updateTestLocationAndInvigilator',
    async (data) => {
        const encodedData = encodeURIComponent(JSON.stringify(data));

        try {
            let res = await axios.put(
                `${process.env.REACT_APP_API_URL}/testmgmt/loc_inv/${encodedData}`
            );
            return res;
        } catch (err) {
            console.log('testMgmtSlice : updateTestLocationAndInvigilator -> error : ', err);
        };
    });

export const fetchTestResultByDateAndTime = createAsyncThunk('fetchTestResultByDateAndTime',
    async ({ resvcode, date, time }) => {
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API_URL}/testmgmt/gettestresultbydatetime/resvcode/${resvcode}/date/${date}/time/${time}`
            );
            return res;
        } catch (err) {
            console.log('testMgmtSlice : fetchTestResultByDateAndTime -> error : ', err);
        };

    });

/*----------------------------------------------------------------------------*/
/*----------------------------- added on 01-11-2023 --------------------------*/
/*----------------------------------------------------------------------------*/
export const fetchTestResultByDateTimeLabroom = createAsyncThunk('fetchTestResultByDateTimeLabroom',
    async ({ labroom, date, time }) => {
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API_URL}/testmgmt/testresultbydatetimelabroom/labroom/${labroom}/date/${date}/time/${time}`
            );
            return res;
        } catch (err) {
            console.log('testMgmtSlice : fetchTestResultByDateTimeLabroom -> error : ', err);
        };
    });

/*-----------------------------------------------------------------------------*/
/*--------------------------------- added on 03-11-2023 -----------------------*/
/*-----------------------------------------------------------------------------*/
export const fetchAllTestResultByDateAndTime = createAsyncThunk('fetchAllTestResultByDateAndTime', async ({ date, time }) => {
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/testmgmt/alltestresultbydateandtime/date/${date}/time/${time}`
        );
        return res;
    } catch (err) {
        console.log('testMgmtSlice : fetchAllTestResultByDateAndTime -> error : ', err);
    };
});

/*-------------------------------------------------------------------------*/
/*------------------- added on 07-11-2023 ---------------------------------*/
/*-------------------------------------------------------------------------*/
export const updateInvigatorDateAndTime = createAsyncThunk('updateInvigatorDateAndTime',
    async ({ date, time, labroom, newinvigilator }) => {
        try {
            let res = await axios.put(
                `${process.env.REACT_APP_API_URL}/testmgmt/updatetestinvigilatorbydatetime/date/${date}/time/${time}/labroom/${labroom}/newinvigilator/${newinvigilator}`
            );
            return res;
        } catch (err) {
            console.log('testMgmtSlice : updateInvigatorDateAndTime -> error : ', err);
        };
    });

/*-------------------------------------------------------------------------*/
/*------------------- added on 08-11-2023 && updated on 11-11-2023 ---------------------------------*/
/*-------------------------------------------------------------------------*/
export const updateLabroomByIndvTestResultCode = createAsyncThunk('updateLabroomByIndvTestResultCode',
    async ({ testresultcode, labroom, invigilator }) => {
        try {
            let res = await axios.put(
                `${process.env.REACT_APP_API_URL}/testmgmt/updatelabroombyindvtestresultcode/testresultcode/${testresultcode}/labroom/${labroom}/invigilator/${invigilator}`
            );
            //console.log('updateLabroomByIndvTestResultCode ---> ', res);
            return res;
        } catch (err) {
            console.log('testMgmtSlice : updateLabroomByIndvTestResultCode -> error : ', err);
        };
    });

/*-------------------------------------------------------------------------*/
/*------------------- added on 24-12-2023 ---------------------------------*/
/*-------------------------------------------------------------------------*/
export const fetchAllTestForm = createAsyncThunk('fetchAllTestForm', async () => {
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/testmgmt/fetchalltestform`
        );
        //console.log('res---->', res);
        return res.data;
    } catch (err) {
        console.log('testMgmtSlice : fetchAllTestForm -> error : ', err);
    };
});

export const updateIndvTestForm = createAsyncThunk('updateIndvTestForm', async ({ resvcode, persid, form }) => {
    try {
        let res = await axios.put(
            `${process.env.REACT_APP_API_URL}/testmgmt/resvcode/${resvcode}/persid/${persid}/form/${form}`
        );
        //console.log('res---->', res);
        return res.data;
    } catch (err) {
        console.log('testMgmtSlice : updateIndvTestForm -> error : ', err);
    };
});

export const fetchTestFormByResvcodePersid = createAsyncThunk('fetchTestFormByResvcodePersid',
    async ({ resvcodepersid }) => {
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API_URL}/testmgmt/fetchtestformbyresvcodepersid/resvcodepersid/${resvcodepersid}`
            );
            //console.log('res---->', res);
            return res.data;
        } catch (err) {
            console.log('testMgmtSlice : fetchTestFormByResvcodePersid -> error : ', err);
        };
    });

export const fetchTestFormByResvcode = createAsyncThunk('fetchTestFormByResvcode',
    async ({ resvcode }) => {
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API_URL}/testmgmt/fetchtestformbyresvcode/resvcode/${resvcode}`
            );
            //console.log('fetchTestFormByResvcode---->', res.data, ' : ', resvcode);
            return res.data;
        } catch (err) {
            console.log('testMgmtSlice : fetchTestFormByResvcodePersid -> error : ', err);
        };
    });

export const delTestFormByResvcodePersid = createAsyncThunk('delTestFormByResvcodePersid',
    async ({ resvcodepersid }) => {
        try {
            let res = await axios.delete(
                `${process.env.REACT_APP_API_URL}/testmgmt/deltestformbyresvcodepersid/resvcodepersid/${resvcodepersid}`);
            //console.log('res---->', res);
            return res.data;
        } catch (err) {
            console.log('testMgmtSlice : delTestFormByResvcodePersid -> error : ', err);
        };
    });

export const delAllTestFormByResvcode = createAsyncThunk('delAllTestFormByResvcode',
    async ({ allfrmresvcode }) => {
        try {
            let res = await axios.delete(
                `${process.env.REACT_APP_API_URL}/testmgmt/delalltestformbyresvcode/allfrmresvcode/${allfrmresvcode}`);
            //console.log('res---->', res);
            return res.data;
        } catch (err) {
            console.log('testMgmtSlice : delAllTestFormByResvcode -> error : ', err);
        };
    });

export const genHardCopyTestFormByResvcode = createAsyncThunk('genHardCopyTestFormByResvcode',
    async ({ resvcode }) => {
        //console.log('resvcode ---> ', resvcode)
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API_URL}/testmgmt/genhardcopytestformbyresvcode/resvcode/${resvcode}`
            );
            //console.log('res---->', res.data);
            return res.data;
        } catch (err) {
            console.log('testMgmtSlice : genHardCopyTestFormByResvcode -> error : ', err);
        };
    });

export const updateGrpTestForm = createAsyncThunk('updateGrpTestForm',
    async ({ resvcode, persid, form }) => {
        try {
            let res = await axios.put(
                `${process.env.REACT_APP_API_URL}/testmgmt/grptestfrm/resvcode`, { resvcode, persid, form }
            );
            //console.log('res---->', res.data);
            return res.data;
        } catch (err) {
            console.log('testMgmtSlice : updateGrpTestForm -> error : ', err);
        };
    });

export const createGrpTestForm = createAsyncThunk('createGrpTestForm',
    async (form) => {
        //console.log('createGrpTestForm ---> ', form);
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API_URL}/testmgmt/creategrptestfrm/form/${form}`
            );
            //console.log('res---->', res.data);
            return res.data;
        } catch (err) {
            console.log('testMgmtSlice : genHardCopyTestFormByResvcode -> error : ', err);
        };
    });

export const getIntroVideoFiles = createAsyncThunk('getIntroVideoFile',
    async () => {
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API_URL}/testmgmt/introvideofiles`
            );
            //console.log('res---->', res.data);
            return res.data;
        } catch (err) {
            console.log('testMgmtSlice : getIntroVideoFile -> error : ', err);
        }

    });

export const getSingleIntroVideoFile = createAsyncThunk('getSingleIntroVideoFile',
    async (singlevideo) => {
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API_URL}/testmgmt/singleintrovideofile/${singlevideo}`,
            );

            //console.log('getSingleIntroVideoFile --> res ', res);
            return res;
        } catch (err) {
            console.log('testMgmtSlice : getSingleIntroVideoFile -> error : ', err);
        }

    });

export const delSingleIntroVideoFile = createAsyncThunk('delSingleIntroVideoFile',
    async (singlevideo) => {
        try {
            let res = await axios.delete(
                `${process.env.REACT_APP_API_URL}/testmgmt/delintrovideofile`,
                { data: singlevideo }
            );

            //console.log('Slice delSingleIntroVideoFile ---> ', res);
            return res;
        } catch (err) {
            console.log('testMgmtSlice : delSingleIntroVideoFile -> error : ', err);
        }
    });
/*-------------------------------------------------------------------------*/
/*-------------------------------- CreateSlice ----------------------------*/
/*-------------------------------------------------------------------------*/
export const testMgmtSlice = createSlice({
    name: 'testmgmtstate', //slice or store name
    initialState: {
        showscoringcriteria: [],
        alltestresultbydatetimearr: [], //added on 03-11-2023
        updateinvigatorbydatetimearr: null, //added on 07-11-2023
        updatelabroomarr: null, //added on 08-11-2023
        questionform: null, //added on 24-12-2023
        indvquestionform: null, //added on 12-01-2024
        printgrptestform: null, //---------->added on 22-02-2024
        testresultarr: null,
        testresultdtlbarr: null,
        invigilator: null,
        testtype: null,
        indvtesttype: null,
        locationInvigilator: null,
        introvideofiles: null, //-------------> added on 14-03-2024
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        /*---------------------- setShowScoringCriteria ------------------*/
        builder.addCase(setShowScoringCriteria.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(setShowScoringCriteria.fulfilled, (state, action) => {
            state.isLoading = false;
            state.showscoringcriteria = action.payload;
        })
        builder.addCase(setShowScoringCriteria.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*---------------------- updateTestInvigilator ------------------*/
        builder.addCase(updateTestInvigilator.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateTestInvigilator.fulfilled, (state, action) => {
            state.isLoading = false;
            state.invigilator = action.payload;
        })
        builder.addCase(updateTestInvigilator.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*---------------------- updateTestType ------------------*/
        builder.addCase(updateTestType.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateTestType.fulfilled, (state, action) => {
            state.isLoading = false;
            state.testtype = action.payload;
        })
        builder.addCase(updateTestType.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*---------------------- updateIndvTestType ------------------*/
        builder.addCase(updateIndvTestType.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateIndvTestType.fulfilled, (state, action) => {
            state.isLoading = false;
            state.indvtesttype = action.payload;
        })
        builder.addCase(updateIndvTestType.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*---------------------- updateTestLocationAndInvigilator ------------------*/
        builder.addCase(updateTestLocationAndInvigilator.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateTestLocationAndInvigilator.fulfilled, (state, action) => {
            state.isLoading = false;
            state.locationInvigilator = action.payload;
        })
        builder.addCase(updateTestLocationAndInvigilator.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*---------------------- fetchTestResultByDateAndTime ------------------*/
        builder.addCase(fetchTestResultByDateAndTime.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTestResultByDateAndTime.fulfilled, (state, action) => {
            //console.log('fetchTestResultByDateAndTime ---> ', action.payload);
            state.isLoading = false;
            state.testresultarr = action.payload;
        })
        builder.addCase(fetchTestResultByDateAndTime.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*----------------------------- added on 01-11-2023 ------------------------*/
        /*---------------------- fetchTestResultByDateTimeLabroom ------------------*/
        builder.addCase(fetchTestResultByDateTimeLabroom.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTestResultByDateTimeLabroom.fulfilled, (state, action) => {
            //console.log('fetchTestResultByDateTimeLabroom ---> ', action.payload);
            state.isLoading = false;
            state.testresultdtlbarr = action.payload;
        })
        builder.addCase(fetchTestResultByDateTimeLabroom.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*----------------------------- added on 03-11-2023 ------------------------*/
        /*-------------------- By Date and Time ---------------*/
        builder.addCase(fetchAllTestResultByDateAndTime.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchAllTestResultByDateAndTime.fulfilled, (state, action) => {
            state.isLoading = false;
            state.alltestresultbydatetimearr = action.payload;
        })
        builder.addCase(fetchAllTestResultByDateAndTime.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*----------------------------- added on 06-11-2023 ------------------------*/
        /*-------------------- By Date and Time ---------------*/
        builder.addCase(updateInvigatorDateAndTime.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateInvigatorDateAndTime.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updateinvigatorbydatetimearr = action.payload;
        })
        builder.addCase(updateInvigatorDateAndTime.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*----------------------------- added on 08-11-2023 ------------------------*/
        /*-------------------- By TestResultCode ---------------*/
        builder.addCase(updateLabroomByIndvTestResultCode.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateLabroomByIndvTestResultCode.fulfilled, (state, action) => {
            //console.log('updateLabroomByIndvTestResultCode.fulfilled ---> ', action.payload);
            state.isLoading = false;
            state.updatelabroomarr = action.payload;
        })
        builder.addCase(updateLabroomByIndvTestResultCode.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*----------------------------- added on 26-12-2023 ------------------------*/
        /*------------------------------ fetchAllTestForm ------------------*/
        builder.addCase(fetchAllTestForm.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchAllTestForm.fulfilled, (state, action) => {
            //console.log('fetchAllTestForm ---> ', action.payload);
            state.isLoading = false;
            state.questionform = action.payload;
        })
        builder.addCase(fetchAllTestForm.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*------------------------------ updateIndvTestForm ------------------*/
        builder.addCase(updateIndvTestForm.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateIndvTestForm.fulfilled, (state, action) => {
            //console.log('updateIndvTestForm ---> ', action.payload);
            state.isLoading = false;
            //state.questionform = action.payload;
        })
        builder.addCase(updateIndvTestForm.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*------------------- updateGrpTestForm added on 25-02-2024 ---------------------*/
        builder.addCase(updateGrpTestForm.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateGrpTestForm.fulfilled, (state, action) => {
            state.isLoading = false;
            //state.questionform = action.payload;
        })
        builder.addCase(updateGrpTestForm.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*------------------- createGrpTestForm added on 25-02-2024 ---------------------*/
        builder.addCase(createGrpTestForm.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(createGrpTestForm.fulfilled, (state, action) => {
            state.isLoading = false;
            //state.questionform = action.payload;
        })
        builder.addCase(createGrpTestForm.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*------------------------------ fetchTestFormByResvcodePersid ------------------*/
        builder.addCase(fetchTestFormByResvcodePersid.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTestFormByResvcodePersid.fulfilled, (state, action) => {
            //console.log('fetchTestFormByResvcodePersid ---> ', action.payload);
            state.isLoading = false;
            //state.indvquestionform = action.payload;
        })
        builder.addCase(fetchTestFormByResvcodePersid.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*------------------------------ fetchTestFormByResvcode ------------------*/
        builder.addCase(fetchTestFormByResvcode.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTestFormByResvcode.fulfilled, (state, action) => {
            //console.log('TestMgmt :: fetchTestFormByResvcode ---> ', action.payload);
            state.isLoading = false;
            state.indvquestionform = action.payload;
        })
        builder.addCase(fetchTestFormByResvcode.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*------------------------------ delTestFormByResvcodePersid ------------------*/
        builder.addCase(delTestFormByResvcodePersid.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(delTestFormByResvcodePersid.fulfilled, (state, action) => {
            //console.log('fetchTestFormByResvcodePersid ---> ', action.payload);
            state.isLoading = false;
            //state.indvquestionform = action.payload;
        })
        builder.addCase(delTestFormByResvcodePersid.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*------------------------------ delTestFormByResvcode ------------------*/
        builder.addCase(delAllTestFormByResvcode.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(delAllTestFormByResvcode.fulfilled, (state, action) => {
            //console.log('fetchTestFormByResvcode ---> ', action.payload);
            state.isLoading = false;
            //state.indvquestionform = action.payload;
        })
        builder.addCase(delAllTestFormByResvcode.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*------------------------------ genHardCopyTestFormByResvcode ------------------*/
        builder.addCase(genHardCopyTestFormByResvcode.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(genHardCopyTestFormByResvcode.fulfilled, (state, action) => {
            //console.log('genHardCopyTestFormByResvcode ---> ', action.payload);
            state.isLoading = false;
            state.printgrptestform = action.payload;
        })
        builder.addCase(genHardCopyTestFormByResvcode.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*---------------------- getIntroVideoFile ------------------*/
        builder.addCase(getIntroVideoFiles.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getIntroVideoFiles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.introvideofiles = action.payload;
        })
        builder.addCase(getIntroVideoFiles.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*------------------ getSingleIntroVideoFile ----------------*/
        builder.addCase(getSingleIntroVideoFile.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getSingleIntroVideoFile.fulfilled, (state, action) => {
            state.isLoading = false;
            //state.introvideofiles = action.payload;
        })
        builder.addCase(getSingleIntroVideoFile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        /*------------------------------ delSingleIntroVideoFile ------------------*/
        builder.addCase(delSingleIntroVideoFile.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(delSingleIntroVideoFile.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(delSingleIntroVideoFile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});//testMgmtSlice

export default testMgmtSlice.reducer;