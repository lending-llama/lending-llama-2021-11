import * as r from "ramda"
import {FEATURE_CHANGED} from "../constants/features";

export const featuresReducer = (state = {}, action) => {
  switch (action.type) {
    case FEATURE_CHANGED:
      return r.mergeRight(state, action.payload)
    default:
      return state
  }
}
