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

export const homeworkCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HOMEWORK_CREATE_REQUEST:
      return {
        loading: true,
      };

    case HOMEWORK_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        homework: action.payload,
      };

    case HOMEWORK_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// HOMEWORK LIST

export const homeworkListReducer = (state = { homeworks: [] }, action) => {
  switch (action.type) {
    case HOMEWORK_LIST_REQUEST:
      return {
        loading: true,
      };

    case HOMEWORK_LIST_SUCCESS:
      return {
        loading: false,
        homeworks: action.payload,
      };

    case HOMEWORK_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// HOMEWORK DETAILS

export const homeworkDetailsReducer = (state = { homework: {} }, action) => {
  switch (action.type) {
    case HOMEWORK_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case HOMEWORK_DETAILS_SUCCESS:
      return {
        loading: false,
        homework: action.payload,
      };

    case HOMEWORK_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const homeworkDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case HOMEWORK_DELETE_REQUEST:
      return {
        loading: true,
      };

    case HOMEWORK_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case HOMEWORK_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const homeworkSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case HOMEWORK_SUBMIT_REQUEST:
      return {
        loading: true,
      };

    case HOMEWORK_SUBMIT_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case HOMEWORK_SUBMIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
