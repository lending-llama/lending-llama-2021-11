import {errorsAdded} from "./actions/errors";

export function fetchJsonFromBackend(url, dispatch) {
  return fetch("/api"+url)
  .then(async x => {
    if (x.status >= 400) {
      throw new Error(await x.text())
    }
    return x
  })
  .then(x => x.json())
  .catch(e => dispatch(errorsAdded(e.message)));
}
