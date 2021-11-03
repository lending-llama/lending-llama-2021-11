import nock from 'nock'
import {render, waitFor} from "@testing-library/react";
import React from "react";
import {App, BestRateCard, formatRate} from "./App";
import {Provider} from "react-redux";
import {createOwnStore} from "./redux";
import 'whatwg-fetch' // sets global.fetch
import '@testing-library/jest-dom' // extends Jest with .toHaveTextContent

describe('Llending Llama UI', () => {
  beforeEach(nock.cleanAll)

  it('Renders best rate', async () => {
    const c = render(<BestRateCard bestAllocation={{name: 'foo', rate: 7}}/>);
    expect(c.getByTestId('allocation-c020b901')).toHaveTextContent(/7\.0./)
  })
})

describe("Rate formatting", () => {
  it('formats 3 decimal places to 2', () => {
    expect(formatRate(7.168)).toEqual("7.17%")
  })
})
