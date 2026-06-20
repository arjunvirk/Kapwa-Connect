import {
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_ALL_REQUEST,
  REVIEW_ALL_SUCCESS,
  REVIEW_ALL_FAIL,
  REVIEW_APPROVE_REQUEST,
  REVIEW_APPROVE_SUCCESS,
  REVIEW_APPROVE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DELETE_FAIL,
} from "../constants/reviewConstants";

import { API_URL } from "../config/api";

// CREATE REVIEW

export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_CREATE_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/reviews`,
      {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(reviewData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: REVIEW_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload: error.message,
    });
  }
};

// APPROVED REVIEWS (Homepage)

export const getReviews = () => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_LIST_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/reviews`);

    const data = await response.json();

    dispatch({
      type: REVIEW_LIST_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload: error.message,
    });
  }
};

// ALL REVIEWS (Teacher)

export const getAllReviews = () => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_ALL_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/reviews/all`,
      {
        credentials: "include",
      },
    );

    const data = await response.json();

    dispatch({
      type: REVIEW_ALL_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_ALL_FAIL,
      payload: error.message,
    });
  }
};

// APPROVE REVIEW

export const approveReview = (id) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_APPROVE_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/reviews/${id}/approve`,
      {
        method: "PUT",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: REVIEW_APPROVE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_APPROVE_FAIL,
      payload: error.message,
    });
  }
};

// DELETE REVIEW

export const deleteReview = (id) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_DELETE_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/reviews/${id}`,
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
      type: REVIEW_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_DELETE_FAIL,
      payload: error.message,
    });
  }
};

export const getApprovedReviews = () => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_LIST_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/reviews`);

    const data = await response.json();

    dispatch({
      type: REVIEW_LIST_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload: error.message,
    });
  }
};
