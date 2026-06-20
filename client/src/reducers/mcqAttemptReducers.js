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

// SUBMIT MCQ

export const mcqAttemptReducer = (state = {}, action) => {
  switch (action.type) {
    case MCQ_ATTEMPT_REQUEST:
      return {
        loading: true,
      };

    case MCQ_ATTEMPT_SUCCESS:
      return {
        loading: false,

        success: true,

        attempt: action.payload,
      };

    case MCQ_ATTEMPT_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// MY ATTEMPTS

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

// MCQ RESULTS

export const mcqResultsReducer = (
  state = {
    results: [],
  },

  action,
) => {
  switch (action.type) {
    case MCQ_RESULTS_REQUEST:
      return {
        loading: true,

        results: [],
      };

    case MCQ_RESULTS_SUCCESS:
      return {
        loading: false,

        results: action.payload,
      };

    case MCQ_RESULTS_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};
