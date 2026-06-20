import {
  CROSSWORD_LIST_REQUEST,
  CROSSWORD_LIST_SUCCESS,
  CROSSWORD_LIST_FAIL,
  CROSSWORD_CREATE_REQUEST,
  CROSSWORD_CREATE_SUCCESS,
  CROSSWORD_CREATE_FAIL,
} from "../constants/crosswordConstants";

export const crosswordListReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case CROSSWORD_LIST_REQUEST:
      return { loading: true, questions: [] };

    case CROSSWORD_LIST_SUCCESS:
      return {
        loading: false,
        questions: action.payload,
      };

    case CROSSWORD_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const crosswordCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CROSSWORD_CREATE_REQUEST:
      return { loading: true };

    case CROSSWORD_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        question: action.payload,
      };

    case CROSSWORD_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
