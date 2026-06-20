import {
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_RESET,
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

// CREATE

export const reviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_CREATE_REQUEST:
      return { loading: true };

    case REVIEW_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case REVIEW_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case REVIEW_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

// HOMEPAGE REVIEWS

export const reviewListReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case REVIEW_LIST_REQUEST:
      return {
        loading: true,
        reviews: [],
      };

    case REVIEW_LIST_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case REVIEW_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// ALL REVIEWS

export const reviewAllReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case REVIEW_ALL_REQUEST:
      return {
        loading: true,
        reviews: [],
      };

    case REVIEW_ALL_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case REVIEW_ALL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// APPROVE

export const reviewApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_APPROVE_REQUEST:
      return { loading: true };

    case REVIEW_APPROVE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case REVIEW_APPROVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// DELETE

export const reviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_DELETE_REQUEST:
      return { loading: true };

    case REVIEW_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case REVIEW_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
