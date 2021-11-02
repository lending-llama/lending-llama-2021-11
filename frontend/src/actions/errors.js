import {ERRORS_ADDED, ERRORS_DISMISSED_FIRST} from "../constants/errors";

export const errorsDismissedFirst = () => ({type: ERRORS_DISMISSED_FIRST})
export const errorsAdded = (msg) => ({type: ERRORS_ADDED, payload: msg})
