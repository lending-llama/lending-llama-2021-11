import * as r from "ramda"
import {BEST_RATE_FETCHED, MULTIPLE_TIERS_FETCHED} from "../constants/allocations";

export const allocationsReducer = (state = {bestRate: {}, multipleTiers: []}, action) => {
  switch (action.type) {
    case BEST_RATE_FETCHED:
      return r.assoc('bestRate', action.payload)(state)
    case MULTIPLE_TIERS_FETCHED:
      return r.assoc('multipleTiers', action.payload)(state)
    default:
      return state
  }
};
