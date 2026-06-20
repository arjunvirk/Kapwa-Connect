import {
  WORD_MATCH_LIST_REQUEST,
  WORD_MATCH_LIST_SUCCESS,
  WORD_MATCH_LIST_FAIL,
} from "../constants/wordMatchConstants";

import { API_URL } from "../config/api";

// GET ALL WORD MATCH QUESTIONS

export const listWordMatchQuestions = () => async (dispatch) => {
  try {
    dispatch({
      type: WORD_MATCH_LIST_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/word-match`, {
      method: "GET",

      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch word match questions");
    }

    dispatch({
      type: WORD_MATCH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORD_MATCH_LIST_FAIL,
      payload: error.message,
    });
  }
};
