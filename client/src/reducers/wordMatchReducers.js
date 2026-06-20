import {
  WORD_MATCH_LIST_REQUEST,
  WORD_MATCH_LIST_SUCCESS,
  WORD_MATCH_LIST_FAIL,
  WORD_MATCH_CREATE_REQUEST,
  WORD_MATCH_CREATE_SUCCESS,
  WORD_MATCH_CREATE_FAIL,
} from "../constants/wordMatchConstants";

export const wordMatchListReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case WORD_MATCH_LIST_REQUEST:
      return { loading: true, questions: [] };

    case WORD_MATCH_LIST_SUCCESS:
      return {
        loading: false,
        questions: action.payload,
      };

    case WORD_MATCH_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const wordMatchCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WORD_MATCH_CREATE_REQUEST:
      return { loading: true };

    case WORD_MATCH_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        question: action.payload,
      };

    case WORD_MATCH_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
