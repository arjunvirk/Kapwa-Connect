import {
  FILL_BLANK_LIST_REQUEST,
  FILL_BLANK_LIST_SUCCESS,
  FILL_BLANK_LIST_FAIL,
  FILL_BLANK_CREATE_REQUEST,
  FILL_BLANK_CREATE_SUCCESS,
  FILL_BLANK_CREATE_FAIL,
} from "../constants/fillBlankConstants";

export const fillBlankListReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case FILL_BLANK_LIST_REQUEST:
      return { loading: true, questions: [] };

    case FILL_BLANK_LIST_SUCCESS:
      return {
        loading: false,
        questions: action.payload,
      };

    case FILL_BLANK_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const fillBlankCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FILL_BLANK_CREATE_REQUEST:
      return { loading: true };

    case FILL_BLANK_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        question: action.payload,
      };

    case FILL_BLANK_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
