package com.example;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class FeatureToggleState {

    private Map<String, Boolean> state = new HashMap<>();

    public FeatureToggleState() {}

    public boolean isEnabled(String featureName) {
        return Optional.ofNullable(state.get(featureName)).orElse(false);
    }

    public void update(String featureName, boolean isEnabled) {
        state.put(featureName, isEnabled);
    }

}
