package com.example;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.stream.Collectors;
import org.junit.jupiter.api.Test;

class AllocationSelectorTest {
    @Test
    public void selectMultiplePlatformTiers() {
        List<Allocation> expected = List.of(
            new Allocation().setName("Ledn").setRate(6.25),
            new Allocation().setName("BlockFi").setRate(4.5)
        );

        List<PlatformTier> platformTiers = List.of(
            new PlatformTier()
                .setName("Ledn")
                .setRate(6.25)
                .setMax(1.0),
            new PlatformTier()
                .setName("BlockFi")
                .setRate(4.5)
                .setMax(0.1)
        );

        List<Allocation> actual = AllocationSelector.getAllocations(1.1, platformTiers)
            .collect(Collectors.toList());

        assertThat(actual).isEqualTo(expected);
    }
}
