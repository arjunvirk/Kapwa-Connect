// CREATE HOMEWORK

import {
  HOMEWORK_CREATE_FAIL,
  HOMEWORK_CREATE_REQUEST,
  HOMEWORK_CREATE_SUCCESS,
  HOMEWORK_DELETE_FAIL,
  HOMEWORK_DELETE_REQUEST,
  HOMEWORK_DELETE_SUCCESS,
  HOMEWORK_DETAILS_FAIL,
  HOMEWORK_DETAILS_REQUEST,
  HOMEWORK_DETAILS_SUCCESS,
  HOMEWORK_LIST_FAIL,
  HOMEWORK_LIST_REQUEST,
  HOMEWORK_LIST_SUCCESS,
  HOMEWORK_SUBMIT_FAIL,
  HOMEWORK_SUBMIT_REQUEST,
  HOMEWORK_SUBMIT_SUCCESS,
} from "../constants/homeworkConstants";

import { API_URL } from "../config/api";

export const createHomework = (homeworkData) => async (dispatch) => {
  try {
    dispatch({
      type: HOMEWORK_CREATE_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/homework`, {
      method: "POST",
      credentials: "include",

      body: homeworkData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create homework");
    }

    dispatch({
      type: HOMEWORK_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOMEWORK_CREATE_FAIL,
      payload: error.message,
    });
  }
};

// GET ALL HOMEWORK

export const listHomework = () => async (dispatch) => {
  try {
    dispatch({
      type: HOMEWORK_LIST_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/homework`, {
      method: "GET",

      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch homework");
    }

    dispatch({
      type: HOMEWORK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOMEWORK_LIST_FAIL,
      payload: error.message,
    });
  }
};

// GET HOMEWORK DETAILS

export const getHomeworkDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: HOMEWORK_DETAILS_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/homework/${id}`, {
      method: "GET",

      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch homework details");
    }

    dispatch({
      type: HOMEWORK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOMEWORK_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const deleteHomework = (id) => async (dispatch) => {
  try {
    dispatch({
      type: HOMEWORK_DELETE_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/homework/${id}`, {
      method: "DELETE",

      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete homework");
    }

    dispatch({
      type: HOMEWORK_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: HOMEWORK_DELETE_FAIL,
      payload: error.message,
    });
  }
};

// SUBMIT HOMEWORK

export const submitHomework = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: HOMEWORK_SUBMIT_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/homework/${id}/submit`,
      {
        method: "POST",

        credentials: "include",

        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit homework");
    }

    dispatch({
      type: HOMEWORK_SUBMIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOMEWORK_SUBMIT_FAIL,
      payload: error.message,
    });
  }
};
