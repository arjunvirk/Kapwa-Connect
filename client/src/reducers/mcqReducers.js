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

export const mcqCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MCQ_CREATE_REQUEST:
      return {
        loading: true,
      };

    case MCQ_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        mcq: action.payload,
      };

    case MCQ_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// MCQ LIST

export const mcqListReducer = (state = { mcqs: [] }, action) => {
  switch (action.type) {
    case MCQ_LIST_REQUEST:
      return {
        loading: true,
      };

    case MCQ_LIST_SUCCESS:
      return {
        loading: false,
        mcqs: action.payload,
      };

    case MCQ_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// MCQ DETAILS

export const mcqDetailsReducer = (state = { mcq: {} }, action) => {
  switch (action.type) {
    case MCQ_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case MCQ_DETAILS_SUCCESS:
      return {
        loading: false,
        mcq: action.payload,
      };

    case MCQ_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// DELETE MCQ

export const mcqDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MCQ_DELETE_REQUEST:
      return {
        loading: true,
      };

    case MCQ_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case MCQ_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// update

export const mcqUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MCQ_UPDATE_REQUEST:
      return {
        loading: true,
      };

    case MCQ_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case MCQ_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const mcqAttemptListReducer = (
  state = {
    attempts: [],
  },

  action,
) => {
  switch (action.type) {
    case MCQ_ATTEMPT_LIST_REQUEST:
      return {
        loading: true,

        attempts: [],
      };

    case MCQ_ATTEMPT_LIST_SUCCESS:
      return {
        loading: false,

        attempts: action.payload,
      };

    case MCQ_ATTEMPT_LIST_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};
