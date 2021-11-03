import {InputWithLabel} from "./InputGroups";
import * as PropTypes from "prop-types";
import React from "react";

export function AmountInput(props) {
  return <InputWithLabel
    name="amount"
    label="BTC Amount"
    type="number"
    value={props.value}
    step="0.1"
    placeholder="Amount of BTC you want to lend"
    onChange={props.onChange}
  />;
}

AmountInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func
};
