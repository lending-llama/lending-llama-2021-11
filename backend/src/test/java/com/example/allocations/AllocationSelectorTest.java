package com.example.allocations;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.stream.Collectors;

import com.example.marketrates.PlatformTier;
import org.junit.jupiter.api.Test;

class AllocationSelectorTest {

    @Test
    public void selectMultiplePlatformTiers() {
        List<Allocation> expected = List.of(
            new Allocation().setName("Platform1").setRate(2.0),
            new Allocation().setName("Platform2").setRate(1.0)
        );

        List<PlatformTier> platformTiers = List.of(
            new PlatformTier()
                .setName("Platform2")
                .setRate(1.0)
                .setMax(1.1),
            new PlatformTier()
                .setName("Platform1")
                .setRate(2.0)
                .setMax(1.0)
        );

        List<Allocation> actual = AllocationSelector.getAllocations(1.1, platformTiers)
            .collect(Collectors.toList());

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    public void selectUnlimitedPlatformTier() {
        List<Allocation> expected = List.of(
            new Allocation().setName("Platform1").setRate(2.0)
        );

        List<PlatformTier> platformTiers = List.of(
            new PlatformTier()
                .setName("Platform1")
                .setRate(2.0),
            new PlatformTier()
                .setName("Platform2")
                .setRate(1.0)
        );

        List<Allocation> actual = AllocationSelector.getAllocations(1.0, platformTiers)
            .collect(Collectors.toList());

        assertThat(actual).isEqualTo(expected);
    }
}
