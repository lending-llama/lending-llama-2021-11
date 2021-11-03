import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, InputWithLabel} from "./presentation";
import {AllocationsTable} from "./presentation/AllocationsTable";
import {errorsAdded} from "./actions/errors";
import {FEATURES} from "./features";
import {bestRateFetched, multipleTiersFetched} from "./actions/allocations";

export function formatRate(rate) {
  return rate.toFixed(2) + "%";
}

export const BestRateCard = (props) => {
  return (
    <Card>
      Best rate: {props.bestAllocation.rate && (
      <>
        <span data-testid="allocation-c020b901">
          {formatRate(props.bestAllocation.rate)}
        </span> {props.bestAllocation.name}
      </>
    )}
    </Card>
  )
}

export const App = () => {
  const dispatch = useDispatch()

  const [amount, setAmount] = useState(0.1);

  const bestAllocation = useSelector(x=>x.allocations.bestRate)
  useEffect(() => {
    fetch(`/api/best-rate`)
      .then(x=>x.json())
      .then(x=>dispatch(bestRateFetched(x)))
  }, [])

  const allocations = useSelector(x=>x.allocations.multipleTiers)
  useEffect(() => {
    fetch(`/api/allocations?amount=${amount}`)
      .then(async x => {
        if (x.status >= 400) {throw new Error(await x.text())}
        return x
      })
      .then(x=>x.json())
      .then(x=>dispatch(multipleTiersFetched(x)))
      .catch(e => dispatch(errorsAdded(e.message)))
  }, [amount])

  const features = useSelector(x => x.features)

  return (
    <>
      <BestRateCard bestAllocation={bestAllocation} />
      {features[FEATURES.MULTIPLE_TIERS] === "on"
        ? <div className="pt-2">
            <Card>
              <InputWithLabel
                name="amount"
                label="BTC Amount"
                type="number"
                value={amount}
                step="0.1"
                placeholder="Amount of BTC you want to lend"
                onChange={e => setAmount(e.target.value)}
              />
              <div className="pt-4"><AllocationsTable allocations={allocations}/></div>
            </Card>
          </div>
        : null
      }
      <div className="pt-2">
        <Card>
          <p>WAGMI</p>
        </Card>
      </div>
    </>
  );
}
