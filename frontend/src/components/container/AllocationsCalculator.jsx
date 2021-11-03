import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {multipleTiersFetched} from "../../actions/allocations";
import {errorsAdded} from "../../actions/errors";
import {AmountInput} from "../presentation/AmountInput";
import {AllocationsTable} from "../presentation/AllocationsTable";

export function fetchAllocations(amount) {
  if (amount === "") {
    return Promise.resolve([]);
  }
  return fetch(`/api/allocations?amount=${amount}`)
    .then(async x => {
      if (x.status >= 400) {
        throw new Error(await x.text())
      }
      return x
    })
    .then(x => x.json());
}

export function AllocationsCalculator() {
  const dispatch = useDispatch()

  const [amount, setAmount] = useState(0.1);

  const allocations = useSelector(x=>x.allocations.multipleTiers)

  useEffect(() => {
    fetchAllocations(amount)
      .then(x=>dispatch(multipleTiersFetched(x)))
      .catch(e => dispatch(errorsAdded(e.message)))
  }, [amount])

  return <>
    <AmountInput value={amount} onChange={e => setAmount(e.target.value)}/>
    <div className="pt-4"><AllocationsTable allocations={allocations}/></div>
  </>;
}
