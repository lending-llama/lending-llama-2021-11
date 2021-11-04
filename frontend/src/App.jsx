import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardWithHeader} from "./components/presentation";
import {FEATURES} from "./features";
import {bestRateFetched} from "./actions/allocations";
import {AllocationsCalculator} from "./components/container/AllocationsCalculator";

export function myFetch(url) {
  return fetch(url)
    .then(async x => {
      if (x.status >= 400) {
        throw new Error(await x.text())
      }
      return x
    })
    .then(x => x.json());
}

export function formatRate(rate) {
  return rate.toFixed(2) + "%";
}

export const BestRateInfo = () => {
  const dispatch = useDispatch()

  const bestAllocation = useSelector(x=>x.allocations.bestRate)
  useEffect(() => {
    myFetch(`/api/best-rate`)
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
    <div className="flex flex-col space-y-2">
      <Card><BestRateInfo/></Card>
      {features[FEATURES.MULTIPLE_TIERS] === "on"
        ? <Card><AllocationsCalculator/></Card>
        : null
      }
      <InfoCard/>
    </div>
  );
}
