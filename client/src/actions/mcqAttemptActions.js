import {
  MCQ_ATTEMPT_FAIL,
  MCQ_ATTEMPT_LIST_FAIL,
  MCQ_ATTEMPT_LIST_REQUEST,
  MCQ_ATTEMPT_LIST_SUCCESS,
  MCQ_ATTEMPT_REQUEST,
  MCQ_ATTEMPT_SUCCESS,
  MCQ_RESULTS_FAIL,
  MCQ_RESULTS_REQUEST,
  MCQ_RESULTS_SUCCESS,
} from "../constants/mcqAttemptConstants";

import { API_URL } from "../config/api";

// SUBMIT MCQ

export const attemptMCQ = (id, answers) => async (dispatch) => {
  try {
    dispatch({
      type: MCQ_ATTEMPT_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/mcq-attempts/${id}/attempt`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          answers,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit MCQ");
    }

    dispatch({
      type: MCQ_ATTEMPT_SUCCESS,

      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MCQ_ATTEMPT_FAIL,

      payload: error.message,
    });
  }
};

// GET MY ATTEMPTS

export const listMyAttempts = () => async (dispatch) => {
  try {
    dispatch({
      type: MCQ_ATTEMPT_LIST_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/mcq-attempts/my-attempts`,
      {
        method: "GET",

        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch attempts");
    }

    dispatch({
      type: MCQ_ATTEMPT_LIST_SUCCESS,

      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MCQ_ATTEMPT_LIST_FAIL,

      payload: error.message,
    });
  }
};

// GET MCQ RESULTS

export const getMCQResults = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MCQ_RESULTS_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/mcq-attempts/${id}/results`,
      {
        method: "GET",

        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch results");
    }

    dispatch({
      type: MCQ_RESULTS_SUCCESS,

      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MCQ_RESULTS_FAIL,

      payload: error.message,
    });
  }
};
