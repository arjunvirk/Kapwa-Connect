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
  LIVE_SESSION_DELETE_REQUEST,
  LIVE_SESSION_DELETE_SUCCESS,
  LIVE_SESSION_DELETE_FAIL,
} from "../constants/liveSessionConstants";

import { API_URL } from "../config/api";

// CREATE LIVE SESSION

export const createLiveSession = (sessionData) => async (dispatch) => {
  try {
    dispatch({
      type: LIVE_SESSION_CREATE_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/live-sessions`,
      {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(sessionData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create live session");
    }

    dispatch({
      type: LIVE_SESSION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIVE_SESSION_CREATE_FAIL,
      payload: error.message,
    });
  }
};

// GET TEACHER LIVE SESSIONS

export const getTeacherLiveSessions = () => async (dispatch) => {
  try {
    dispatch({
      type: TEACHER_LIVE_SESSIONS_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/live-sessions/teacher`,
      {
        method: "GET",

        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch teacher sessions");
    }

    dispatch({
      type: TEACHER_LIVE_SESSIONS_SUCCESS,
      payload: data.sessions,
    });
  } catch (error) {
    dispatch({
      type: TEACHER_LIVE_SESSIONS_FAIL,
      payload: error.message,
    });
  }
};

// GET STUDENT LIVE SESSIONS

export const getStudentLiveSessions = () => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_LIVE_SESSIONS_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/live-sessions/student`,
      {
        method: "GET",

        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch student sessions");
    }

    dispatch({
      type: STUDENT_LIVE_SESSIONS_SUCCESS,
      payload: data.sessions,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_LIVE_SESSIONS_FAIL,
      payload: error.message,
    });
  }
};

export const deleteLiveSession = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LIVE_SESSION_DELETE_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/live-sessions/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: LIVE_SESSION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LIVE_SESSION_DELETE_FAIL,
      payload: error.message,
    });
  }
};
