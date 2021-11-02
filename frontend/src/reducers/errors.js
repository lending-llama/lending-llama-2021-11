import {ERRORS_ADDED, ERRORS_DISMISSED_FIRST} from "../constants/errors";

export const errorsReducer = (state = [], action) => {
  switch (action.type) {
    case ERRORS_ADDED:
      return [...state, action.payload]
    case ERRORS_DISMISSED_FIRST:
      return state.slice(1)
    default:
      return state
  }
};
