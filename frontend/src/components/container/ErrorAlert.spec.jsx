import {ErrorAlert} from "./ErrorAlert";
import {render} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import {createOwnStore} from "../../redux";
import '@testing-library/jest-dom'
import {errorsAdded, errorsDismissedFirst} from "../../actions/errors"; // extends Jest with .toHaveTextContent

describe('Error Alert', () => {
  it('displays error msg', () => {
    const ownStore = createOwnStore()
    const alert = render(<Provider store={ownStore}><ErrorAlert/></Provider>);
    ownStore.dispatch(errorsAdded('fdsa'))
    alert.getByText('fdsa')
  })
  it('dismisses error msg', async () => {
    const ownStore = createOwnStore()
    const alert = render(<Provider store={ownStore}><ErrorAlert/></Provider>);
    ownStore.dispatch(errorsDismissedFirst())
    expect(alert.queryAllByText('fdsa')).toEqual([])
  })
})
