import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardWithHeader, InputWithLabel} from "./components/presentation";
import {AllocationsTable} from "./components/presentation/AllocationsTable";
import {errorsAdded} from "./actions/errors";
import {FEATURES} from "./features";
import {bestRateFetched, multipleTiersFetched} from "./actions/allocations";
import * as PropTypes from "prop-types";

export function formatRate(rate) {
  return rate.toFixed(2) + "%";
}

export const BestRateCard = () => {
  const dispatch = useDispatch()

  const bestAllocation = useSelector(x=>x.allocations.bestRate)
  useEffect(() => {
    fetch(`/api/best-rate`)
      .then(x=>x.json())
      .then(x=>dispatch(bestRateFetched(x)))
  }, [])

  return (
    <Card>
      Best rate: {bestAllocation.rate && (
      <>
        <span data-testid="allocation-c020b901">
          {formatRate(bestAllocation.rate)}
        </span> {bestAllocation.name}
      </>
    )}
    </Card>
  )
}

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

function AmountInput(props) {
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

function AllocationsCard() {
  const dispatch = useDispatch()

  const [amount, setAmount] = useState(0.1);

  const allocations = useSelector(x=>x.allocations.multipleTiers)

  useEffect(() => {
    fetchAllocations(amount)
      .then(x=>dispatch(multipleTiersFetched(x)))
      .catch(e => dispatch(errorsAdded(e.message)))
  }, [amount])

  return <Card>
    <AmountInput value={amount} onChange={e => setAmount(e.target.value)}/>
    <div className="pt-4"><AllocationsTable allocations={allocations}/></div>
  </Card>;
}

function InfoCard(props) {
  return <CardWithHeader header="Public Service Announcement">
    <p>{props.children}</p>
  </CardWithHeader>;
}

export const App = () => {
  const features = useSelector(x => x.features)

  return (
    <>
      <BestRateCard/>
      {features[FEATURES.MULTIPLE_TIERS] === "on"
        ? <div className="pt-2">
          <AllocationsCard />
        </div>
        : null
      }
      <div className="pt-2">
        <InfoCard>WAGMI</InfoCard>
      </div>
    </>
  );
}
