import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardWithHeader} from "./components/presentation";
import {FEATURES} from "./features";
import {bestRateFetched} from "./actions/allocations";
import {AllocationsCard} from "./components/container/AllocationsCard";

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
