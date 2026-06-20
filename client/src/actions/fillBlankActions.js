import {
  FILL_BLANK_LIST_REQUEST,
  FILL_BLANK_LIST_SUCCESS,
  FILL_BLANK_LIST_FAIL,
} from "../constants/fillBlankConstants";

import { API_URL } from "../config/api";

// GET ALL FILL BLANK QUESTIONS

export const listFillBlankQuestions = () => async (dispatch) => {
  try {
    dispatch({
      type: FILL_BLANK_LIST_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/fill-blanks`, {
      method: "GET",

      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch fill blank questions");
    }

    dispatch({
      type: FILL_BLANK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FILL_BLANK_LIST_FAIL,
      payload: error.message,
    });
  }
};
