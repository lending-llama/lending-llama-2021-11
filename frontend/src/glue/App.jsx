import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardWithHeader} from "../common/presentation/Panels";
import {FEATURES} from "./features";
import {bestRateFetched} from "../features/allocations/actions";
import {AllocationsCalculator} from "../features/allocations/AllocationsCalculator";
import {fetchJsonFromBackend} from "../common/http";

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
    fetchJsonFromBackend(`/best-rate`, dispatch)
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
