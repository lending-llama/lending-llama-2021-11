import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardWithHeader} from "./components/presentation";
import {FEATURES} from "./features";
import {bestRateFetched} from "./actions/allocations";
import {AllocationsCalculator} from "./components/container/AllocationsCalculator";
import {fetchJsonAndDispatchOnError} from "./fetchJsonAndDispatchOnError";
import {errorsAdded} from "./actions/errors";

export function formatRate(rate) {
  return rate.toFixed(2) + "%";
}

export const BestRateInfo = () => {
  const dispatch = useDispatch()

  const bestAllocation = useSelector(x=>x.allocations.bestRate)
  useEffect(() => {
    fetchJsonAndDispatchOnError(`/api/best-rate`, dispatch)
      .then(x=>dispatch(bestRateFetched(x)))
  }, [])

  return (
    <>
      Best rate: {bestAllocation.rate && (
      <>
        <span data-testid="allocation-c020b901">
          {formatRate(bestAllocation.rate)}
        </span> {bestAllocation.name}
      </>
    )}
    </>
  )
}

function InfoCard() {
  return <CardWithHeader header="Public Service Announcement">
    <p>WAGMI</p>
  </CardWithHeader>;
}

export const App = () => {
  const features = useSelector(x => x.features)

  return (
    <>
      <Card><BestRateInfo/></Card>
      {features[FEATURES.MULTIPLE_TIERS] === "on"
        ? <div className="pt-2">
            <Card><AllocationsCalculator/></Card>
          </div>
        : null
      }
      <div className="pt-2">
        <InfoCard/>
      </div>
    </>
  );
}
