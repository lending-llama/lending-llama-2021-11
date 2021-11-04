import {errorsReducer} from "./reducers";
import {errorsAdded, errorsDismissedFirst} from "./actions";

describe('Errors reducer', () => {
  const state = ['foo']
  it('removes error', () => {
    state.push('bar')
    expect(errorsReducer(state, errorsDismissedFirst()))
      .toEqual(['bar'])
  })
  it('saves payloads', () => {
    expect(errorsReducer(state, errorsAdded('baz')))
      .toEqual(['foo', 'bar', 'baz'])
  })
})
