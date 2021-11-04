import React from 'react';
import renderer from 'react-test-renderer';
import {Card, CardWithHeader} from "./Panels";

describe('Card', () => {
  it('has skeleton as specified by Tailwind UI', () => {
    expect(renderer.create(<Card/>).toJSON()).toMatchSnapshot();
  })
})

describe('CardWithHeader', () => {
  it('has skeleton as specified by Tailwind UI', () => {
    expect(renderer.create(
      <CardWithHeader header="header">
        main content
      </CardWithHeader>
    ).toJSON()).toMatchSnapshot();
  })
})
