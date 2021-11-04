import {combineReducers, createStore} from 'redux'
import {errorsReducer} from "./errors/reducers";
import {featuresReducer} from "./reducers";
import {allocationsReducer} from "./allocations/reducers";

export const createOwnStore = () => {return createStore( combineReducers({
    allocations: allocationsReducer,
    features: featuresReducer,
    errors: errorsReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}

export const store = createOwnStore()
