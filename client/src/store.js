import { configureStore } from "@reduxjs/toolkit";

import {
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  studentListReducer,
  userDetailsReducer,
  userUpdateReducer,
  userDeleteReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
} from "./reducers/userReducers";

import {
  homeworkCreateReducer,
  homeworkDetailsReducer,
  homeworkListReducer,
  homeworkDeleteReducer,
  homeworkSubmitReducer,
} from "./reducers/homeworkReducers";

import {
  mcqCreateReducer,
  mcqDetailsReducer,
  mcqListReducer,
  mcqDeleteReducer,
  mcqUpdateReducer,
} from "./reducers/mcqReducers";

import {
  mcqAttemptReducer,
  mcqAttemptListReducer,
  mcqResultsReducer,
} from "./reducers/mcqAttemptReducers";

import {
  liveSessionCreateReducer,
  teacherLiveSessionsReducer,
  studentLiveSessionsReducer,
  liveSessionDeleteReducer,
} from "./reducers/liveSessionReducers";

import {
  crosswordListReducer,
  crosswordCreateReducer,
} from "./reducers/crosswordReducers";

import {
  fillBlankListReducer,
  fillBlankCreateReducer,
} from "./reducers/fillBlankReducers";

import {
  wordMatchListReducer,
  wordMatchCreateReducer,
} from "./reducers/wordMatchReducers";

import {
  reviewCreateReducer,
  reviewListReducer,
  reviewAllReducer,
  reviewApproveReducer,
  reviewDeleteReducer,
} from "./reducers/reviewReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const store = configureStore({
  reducer: {
    // USER

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,

    studentList: studentListReducer,

    // HOMEWORK

    homeworkCreate: homeworkCreateReducer,
    homeworkList: homeworkListReducer,
    homeworkDetails: homeworkDetailsReducer,
    homeworkDelete: homeworkDeleteReducer,
    homeworkSubmit: homeworkSubmitReducer,

    // MCQ

    mcqCreate: mcqCreateReducer,
    mcqList: mcqListReducer,
    mcqDetails: mcqDetailsReducer,
    mcqDelete: mcqDeleteReducer,
    mcqUpdate: mcqUpdateReducer,

    // MCQ Attempts

    mcqAttempt: mcqAttemptReducer,
    mcqAttemptList: mcqAttemptListReducer,
    mcqResults: mcqResultsReducer,

    // LIVE SESSION
    liveSessionCreate: liveSessionCreateReducer,
    teacherLiveSessions: teacherLiveSessionsReducer,
    studentLiveSessions: studentLiveSessionsReducer,
    liveSessionDelete: liveSessionDeleteReducer,

    // CROSSWORD GAME
    crosswordList: crosswordListReducer,
    crosswordCreate: crosswordCreateReducer,

    // FILLINTHEBLANK GAME
    fillBlankList: fillBlankListReducer,
    fillBlankCreate: fillBlankCreateReducer,

    // WORDMATCH GAME
    wordMatchList: wordMatchListReducer,
    wordMatchCreate: wordMatchCreateReducer,

    // REVIEWS
    reviewCreate: reviewCreateReducer,
    reviewList: reviewListReducer,
    reviewAll: reviewAllReducer,
    reviewApprove: reviewApproveReducer,
    reviewDelete: reviewDeleteReducer,
  },

  preloadedState: initialState,
});

export default store;
