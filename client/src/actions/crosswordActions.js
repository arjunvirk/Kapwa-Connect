import {
  CROSSWORD_LIST_REQUEST,
  CROSSWORD_LIST_SUCCESS,
  CROSSWORD_LIST_FAIL,
} from "../constants/crosswordConstants";

import { API_URL } from "../config/api";

// GET ALL CROSSWORD QUESTIONS

export const listCrosswordQuestions = () => async (dispatch) => {
  try {
    dispatch({
      type: CROSSWORD_LIST_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/crossword`, {
      method: "GET",

      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch crossword questions");
    }

    dispatch({
      type: CROSSWORD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CROSSWORD_LIST_FAIL,
      payload: error.message,
    });
  }
};
