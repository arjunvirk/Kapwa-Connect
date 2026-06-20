import {
  LIVE_SESSION_CREATE_REQUEST,
  LIVE_SESSION_CREATE_SUCCESS,
  LIVE_SESSION_CREATE_FAIL,
  TEACHER_LIVE_SESSIONS_REQUEST,
  TEACHER_LIVE_SESSIONS_SUCCESS,
  TEACHER_LIVE_SESSIONS_FAIL,
  STUDENT_LIVE_SESSIONS_REQUEST,
  STUDENT_LIVE_SESSIONS_SUCCESS,
  STUDENT_LIVE_SESSIONS_FAIL,
  LIVE_SESSION_CREATE_RESET,
  LIVE_SESSION_DELETE_REQUEST,
  LIVE_SESSION_DELETE_SUCCESS,
  LIVE_SESSION_DELETE_FAIL,
} from "../constants/liveSessionConstants";

// CREATE LIVE SESSION
export const liveSessionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LIVE_SESSION_CREATE_REQUEST:
      return { loading: true };

    case LIVE_SESSION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        session: action.payload,
      };

    case LIVE_SESSION_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case LIVE_SESSION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// TEACHER LIVE SESSIONS
export const teacherLiveSessionsReducer = (
  state = { sessions: [] },
  action,
) => {
  switch (action.type) {
    case TEACHER_LIVE_SESSIONS_REQUEST:
      return {
        loading: true,
        sessions: [],
      };

    case TEACHER_LIVE_SESSIONS_SUCCESS:
      return {
        loading: false,
        sessions: action.payload,
      };

    case TEACHER_LIVE_SESSIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// STUDENT LIVE SESSIONS
export const studentLiveSessionsReducer = (
  state = { sessions: [] },
  action,
) => {
  switch (action.type) {
    case STUDENT_LIVE_SESSIONS_REQUEST:
      return {
        loading: true,
        sessions: [],
      };

    case STUDENT_LIVE_SESSIONS_SUCCESS:
      return {
        loading: false,
        sessions: action.payload,
      };

    case STUDENT_LIVE_SESSIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const liveSessionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LIVE_SESSION_DELETE_REQUEST:
      return { loading: true };

    case LIVE_SESSION_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case LIVE_SESSION_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
