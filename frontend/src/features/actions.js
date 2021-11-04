import {FEATURE_CHANGED} from "./constants";

export const featureChanged = (name, value) => ({type: FEATURE_CHANGED, payload: {[name]: value}})
