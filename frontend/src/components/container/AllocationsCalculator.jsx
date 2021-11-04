import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {multipleTiersFetched} from "../../actions/allocations";
import {errorsAdded} from "../../actions/errors";
import {AmountInput} from "../presentation/AmountInput";
import {AllocationsTable} from "../presentation/AllocationsTable";
import {myFetch} from "../../App";

export function fetchAllocations(amount) {
  if (amount === "") {
    return Promise.resolve([]);
  }
  return myFetch(`/api/allocations?amount=${amount}`);
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
