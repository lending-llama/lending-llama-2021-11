package com.example.marketrates;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.stream.Collectors;

import static com.example.marketrates.PlatformTierFetcher.extractBestRateTiers;
import static org.assertj.core.api.Assertions.assertThat;

class PlatformTierFetcherTest {

    @Test
    void extractBestTiersForMultipleRates() {
        List<Platform> platformList = List.of(
            new Platform()
                .setName("Ledn")
                .setTiers(new Platform.Tier[]{new Platform.Tier().setRate(6.25).setMax(1.0)}),
            new Platform()
                .setName("BlockFi")
                .setTiers(new Platform.Tier[]{new Platform.Tier().setRate(4.5).setMax(0.1)})
        );

        List<PlatformTier> expected = List.of(
            new PlatformTier()
                .setName("Ledn")
                .setRate(6.25)
                .setMax(1.0),
            new PlatformTier()
                .setName("BlockFi")
                .setRate(4.5)
                .setMax(0.1)
        );

        List<PlatformTier> actual = extractBestRateTiers(platformList.toArray(new Platform[0]))
            .collect(Collectors.toList());

        assertThat(actual).isEqualTo(expected);
    }
}
