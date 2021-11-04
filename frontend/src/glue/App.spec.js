import nock from 'nock'
import {render, waitFor} from "@testing-library/react";
import React from "react";
import {BestRateInfo, formatRate} from "./App";
import {Provider} from "react-redux";
import {createOwnStore} from "../features/redux";
import 'whatwg-fetch' // sets global.fetch
import '@testing-library/jest-dom' // extends Jest with .toHaveTextContent

describe('Llending Llama UI', () => {
  beforeEach(nock.cleanAll)

  it('Renders best rate', async () => {
    nock(/./)
      .get('/api/best-rate')
      .reply(200, {name: 'foo', rate: 7})

    const c = render(<Provider store={createOwnStore()}><BestRateInfo/></Provider>);
    await waitFor(() => c.getByText('foo', {exact:false}))
    expect(c.getByTestId('allocation-c020b901')).toHaveTextContent(/7\.0./)
  })
})

describe("Rate formatting", () => {
  it('formats 3 decimal places to 2', () => {
    expect(formatRate(7.168)).toEqual("7.17%")
  })
})
