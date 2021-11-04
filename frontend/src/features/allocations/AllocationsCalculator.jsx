import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {multipleTiersFetched} from "./actions";
import {AmountInput} from "../../common/presentation/AmountInput";
import {AllocationsTable} from "./AllocationsTable";
import {fetchJsonFromBackend} from "../../common/http";

export function fetchAllocations(amount, dispatch) {
  if (amount === "") {
    return Promise.resolve([]);
  }
  return fetchJsonFromBackend(`/allocations?amount=${amount}`, dispatch);
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
