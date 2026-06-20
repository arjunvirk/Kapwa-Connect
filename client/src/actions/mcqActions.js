// CREATE MCQ
import {
  MCQ_ATTEMPT_LIST_FAIL,
  MCQ_ATTEMPT_LIST_REQUEST,
  MCQ_ATTEMPT_LIST_SUCCESS,
  MCQ_CREATE_FAIL,
  MCQ_CREATE_REQUEST,
  MCQ_CREATE_SUCCESS,
  MCQ_DELETE_FAIL,
  MCQ_DELETE_REQUEST,
  MCQ_DELETE_SUCCESS,
  MCQ_DETAILS_FAIL,
  MCQ_DETAILS_REQUEST,
  MCQ_DETAILS_SUCCESS,
  MCQ_LIST_FAIL,
  MCQ_LIST_REQUEST,
  MCQ_LIST_SUCCESS,
  MCQ_UPDATE_FAIL,
  MCQ_UPDATE_REQUEST,
  MCQ_UPDATE_SUCCESS,
} from "../constants/mcqConstants";

import { API_URL } from "../config/api";

export const createMCQ = (mcqData) => async (dispatch) => {
  try {
    dispatch({
      type: MCQ_CREATE_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/mcq`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify(mcqData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create MCQ");
    }

    dispatch({
      type: MCQ_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MCQ_CREATE_FAIL,
      payload: error.message,
    });
  }
};

// GET ALL MCQ

export const listMCQ = () => async (dispatch) => {
  try {
    dispatch({
      type: MCQ_LIST_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/mcq`, {
      method: "GET",

      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch MCQs");
    }

    dispatch({
      type: MCQ_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MCQ_LIST_FAIL,
      payload: error.message,
    });
  }
};

// GET MCQ DETAILS

export const getMCQDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MCQ_DETAILS_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/mcq/${id}`, {
      method: "GET",

      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch MCQ");
    }

    dispatch({
      type: MCQ_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MCQ_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// DELETE MCQ

export const deleteMCQ = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MCQ_DELETE_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/mcq/${id}`, {
      method: "DELETE",

      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete MCQ");
    }

    dispatch({
      type: MCQ_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MCQ_DELETE_FAIL,
      payload: error.message,
    });
  }
};

export const updateMCQ = (id, mcqData) => async (dispatch) => {
  try {
    dispatch({
      type: MCQ_UPDATE_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/mcq/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify(mcqData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update MCQ");
    }

    dispatch({
      type: MCQ_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MCQ_UPDATE_FAIL,
      payload: error.message,
    });
  }
};

export const listMyAttempts = () => async (dispatch) => {
  try {
    dispatch({
      type: MCQ_ATTEMPT_LIST_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/mcq-attempts/my-attempts`, {
      method: "GET",

      credentials: "include",
    });

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
