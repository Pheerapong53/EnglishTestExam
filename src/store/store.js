import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import thunk from "redux-thunk";
import userSilce from "./userSilce";
/*---------------- import PageBook Slice -------------------*/
import bookDateReducer from './PgBookDateSlice';
import seatStateReducer from './SeatMgmtSlice';
import scoringCriteriaReducer from './TestScoringCriteriaMgmtSlice';
import memberInfoReducer from './MemberInfoSlice';
import testResvInfoReducer from './TestReservationSlice';
import testResultInfoReducer from './TestResultSlice';
import testmgmtstateReducer from './TestMgmtSlice';
import TestInfoSliceReducer from "./TestInfoSlice";
import ExamInfoSliceReducer from "./ExamInfoSlice";

const reducers = combineReducers({
  user: userSilce,
  bookdate: bookDateReducer,
  seatstate: seatStateReducer,
  scoringcriteriastate: scoringCriteriaReducer,
  memberinfostate: memberInfoReducer,
  testresvinfostate: testResvInfoReducer,
  testresultstate: testResultInfoReducer,
  testmgmtstate: testmgmtstateReducer,
  testinfo: TestInfoSliceReducer,
  examinfo: ExamInfoSliceReducer,
});

// const store = configureStore({
//     reducer: {
//         user: userSilce,
//     }
// });

const persistConfig = {
  key: "user",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== "production",
  // middleware: [thunk]
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
});

export default store;
