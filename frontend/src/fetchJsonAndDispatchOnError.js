import {multipleTiersFetched} from "./actions/allocations";
import {errorsAdded} from "./actions/errors";
import {} from "react-redux";

export function fetchJsonAndDispatchOnError(url, dispatch) {
  return fetch(url)
  .then(async x => {
    if (x.status >= 400) {
      throw new Error(await x.text())
    }
    return x
  })
  .then(x => x.json())
  .catch(e => dispatch(errorsAdded(e.message)));
}
