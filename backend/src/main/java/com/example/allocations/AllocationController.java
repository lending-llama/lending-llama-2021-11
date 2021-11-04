package com.example.allocations;

import com.example.featuretoggles.FeatureToggleState;
import com.example.marketrates.Platform;
import com.example.marketrates.PlatformTier;
import com.example.marketrates.PlatformTierFetcher;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.Arrays.stream;

@RestController
public class AllocationController {

    private PlatformTierFetcher platformTierFetcher;
    private FeatureToggleState featureToggleState;

    public AllocationController(PlatformTierFetcher platformTierFetcher, FeatureToggleState featureToggleState) {
        this.platformTierFetcher = platformTierFetcher;
        this.featureToggleState = featureToggleState;
    }

    @GetMapping("/best-rate")
    public Allocation getBestRate() {
        PlatformTier tier1 = platformTierFetcher.getPlatformTiersDescByRate("btc").get(0);
        return new Allocation().setName(tier1.getName()).setRate(tier1.getRate());
    }

    @GetMapping("/allocations")
    public Stream<Allocation> getAllocation(@RequestParam Double amount) throws Exception {
        if (!featureToggleState.isEnabled("multiple-tiers")) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        List<PlatformTier> platformTiers = platformTierFetcher.getPlatformTiersDescByRate("btc");

        return AllocationSelector.getAllocations(amount, platformTiers);
    }

    public Allocation getBestEthRate() {
        PlatformTier tier1 = platformTierFetcher.getPlatformTiersDescByRate("eth").get(0);
        return new Allocation().setName(tier1.getName()).setRate(tier1.getRate());
    }
}
