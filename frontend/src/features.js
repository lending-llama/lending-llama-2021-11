import {SplitFactory} from "@splitsoftware/splitio";
import {store} from "./redux";
import {featureChanged} from "./actions/features";

export const FEATURES = {
  FIRST: "my-first-split",
  MULTIPLE_TIERS: "multiple-tiers"
}

const factory = SplitFactory({
  core: {
    authorizationKey: '4lpueit34kikq4uj1shd1ru5ghcnm9e0hs08',
    key: 'key'
  }
});
const client = factory.client();

client.on(client.Event.SDK_READY, () => {
  store.dispatch(featureChanged(FEATURES.FIRST, client.getTreatment(FEATURES.FIRST)))
  store.dispatch(featureChanged(FEATURES.MULTIPLE_TIERS, client.getTreatment(FEATURES.MULTIPLE_TIERS)))
});
client.on(client.Event.SDK_UPDATE, () => {
  store.dispatch(featureChanged(FEATURES.FIRST, client.getTreatment(FEATURES.FIRST)))
  store.dispatch(featureChanged(FEATURES.MULTIPLE_TIERS, client.getTreatment(FEATURES.MULTIPLE_TIERS)))
});
