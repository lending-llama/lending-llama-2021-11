package com.example.featuretoggles;

import io.split.client.SplitClient;

import javax.annotation.PostConstruct;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class FeatureToggleUpdater {

    private static final Set<String> FEATURE_NAMES = Set.of("my-first-split", "multiple-tiers");

    private final SplitClient splitClient;
    private final FeatureToggleState featureToggleState;

    public FeatureToggleUpdater(SplitClient splitClient, FeatureToggleState featureToggleState) {
        this.splitClient = splitClient;
        this.featureToggleState = featureToggleState;
    }

    public void enable(final String featureName) {
        featureToggleState.update(featureName, true);
    }

    public void disable(final String featureName) {
        featureToggleState.update(featureName, false);
    }

    @PostConstruct
    public void init() {
        final Map<String, Boolean> states = FEATURE_NAMES.stream().collect(Collectors.toMap(name -> name, name -> isOn(name, splitClient)));
        states.forEach(featureToggleState::update);
    }

    private static boolean isOn(final String name, final SplitClient splitClient) {
        return "on".equals(splitClient.getTreatment("key", name));
    }
}
