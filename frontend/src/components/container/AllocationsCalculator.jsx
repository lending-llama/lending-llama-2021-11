import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {multipleTiersFetched} from "../../actions/allocations";
import {errorsAdded} from "../../actions/errors";
import {AmountInput} from "../presentation/AmountInput";
import {AllocationsTable} from "../presentation/AllocationsTable";
import {fetchJsonAndDispatchOnError} from "../../fetchJsonAndDispatchOnError";

export function fetchAllocations(amount, dispatch) {
  if (amount === "") {
    return Promise.resolve([]);
  }
  return fetchJsonAndDispatchOnError(`/api/allocations?amount=${amount}`, dispatch);
}

export function AllocationsCalculator() {
  const dispatch = useDispatch()

  const [amount, setAmount] = useState(0.1);

  const allocations = useSelector(x=>x.allocations.multipleTiers)

  useEffect(() => {
    fetchAllocations(amount, dispatch)
      .then(x=>dispatch(multipleTiersFetched(x)))
  }, [amount])

  return <>
    <AmountInput value={amount} onChange={e => setAmount(e.target.value)}/>
    <div className="pt-4"><AllocationsTable allocations={allocations}/></div>
  </>;
}
