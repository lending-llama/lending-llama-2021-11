import {FEATURE_CHANGED} from "../constants/features";

export const featureChanged = (name, value) => ({type: FEATURE_CHANGED, payload: {[name]: value}})
