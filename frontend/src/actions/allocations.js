import {BEST_RATE_FETCHED, MULTIPLE_TIERS_FETCHED} from "../constants/allocations";

export const bestRateFetched = (allocation) => ({type: BEST_RATE_FETCHED, payload: allocation})
export const multipleTiersFetched = (allocations) => ({type: MULTIPLE_TIERS_FETCHED, payload: allocations})
