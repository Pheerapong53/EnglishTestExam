/* eslint-disable array-callback-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { green, orange, red } from "@mui/material/colors";
import axios from "axios";

const eventbgcolor = {
    'empty': green['700'],
    'full': orange['700'],
    'lock': red['700']
};
//'booking/fetchBookingInOnePeriod' -> period
export const fetchBookingInOnePeriod = createAsyncThunk('booking/fetchBookingInOnePeriod', async (arg) => {
    const acttmplist = [];
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}/pagebookdate/rsvn/s_date/${arg.s_date}/e_date/${arg.e_date}`
        );

        //console.log('fetchBookingInOnePeriod ->> ', res.data);
        res.data.map(act => {
            //console.log('act-------------> ', act);
            Object.keys(act['lab']).map(el => {
                switch (el) {
                    case 'lab0': case 'lab1': case 'lab2': case 'lab3':
                    case 'lab6':
                        act['lab'][el].forEach(lb => {
                            let tmp = {};
                            let findobj = acttmplist.find(elem => elem.extendedProps?.resvcode === lb.resvcode);
                            if (findobj) {
                                findobj.extendedProps.seatcount += lb.seatcount;
                                findobj.extendedProps.lab += lb.lab !== 'lab0' ? `, ${lb.lab} `.toUpperCase() : ',  รอกำหนด';
                                let index = acttmplist.findIndex(obj => obj.extendedProps.resvcode === lb.resvcode);
                                acttmplist[index] = findobj;
                            } else {
                                tmp = {
                                    'title': `${lb.projcode} : ${lb.projname}`,
                                    'start': act.dt_start,
                                    'end': act.dt_end,
                                    'extendedProps': {
                                        'resvcode': `${lb.resvcode}`,
                                        'directorate': `${lb.direct}`,
                                        'lab': lb.lab !== 'lab0' ? ` ${lb.lab} `.toUpperCase() : 'รอกำหนด',
                                        'seatcount': lb.seatcount,
                                        'remainseat': act.seatremain,
                                        'totalseated': act.totalseated,
                                        'totalseat': act.totalseat
                                    },
                                    'description': `${lb.projname}`,
                                    'display': 'block',
                                    'color': act.seatremain[el] === 0 ? eventbgcolor['full'] : eventbgcolor['empty'],
                                    'allDay': false,
                                }
                            }
                            //console.log('tmp ===> ', tmp);
                            if (Object.keys(tmp).length !== 0) {
                                acttmplist.push(tmp);
                            }
                            /*let tmp = {
                                'title': `${lb.projcode} : ${lb.projname}`,
                                'start': act.dt_start,
                                'end': act.dt_end,
                                'extendedProps': {
                                    'resvcode': `${lb.resvcode}`,
                                    'directorate': `${lb.direct}`,
                                    'lab': `${lb.lab}`,
                                    'seatcount': `${sum}`,//`${lb.seatcount}`,
                                    'remainseat': act.seatremain,
                                    'totalseated': act.totalseated,
                                    'totalseat': act.totalseat
                                },
                                'description': `${lb.projname}`,
                                'display': 'block',
                                'color': act.seatremain[el] === 0 ? eventbgcolor['full'] : eventbgcolor['empty'],
                                'allDay': false,
                            };
                            
                            acttmplist.push(tmp);*/
                        });
                        break;
                        default: break;
                }
            });
        });

        return (acttmplist);
    } catch (err) {
        console.log('PageBookDateSlice -> error : ', err);
    };
}
);

//export const 


export const bookDateSlice = createSlice({
    name: 'bookdate', //slice or store name
    initialState: {
        bookdatearr: [],
        isLoading: false,
        error: null,
        datelocking: []//{ 'date': '', 'period': '', 'isLocking': false },
    },
    reducers: {
        setLockDate: (state, action) => {
            state.datelocking = [...state.datelocking, action.payload];
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchBookingInOnePeriod.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchBookingInOnePeriod.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bookdatearr = action.payload;
        })
        builder.addCase(fetchBookingInOnePeriod.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});//bookDateSlice

export const { setLockDate, setNewDate } = bookDateSlice.actions;
export default bookDateSlice.reducer;
