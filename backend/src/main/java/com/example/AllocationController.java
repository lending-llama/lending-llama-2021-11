package com.example;

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

    private RestTemplate restTemplate;
    private FeatureToggleState featureToggleState;

    public AllocationController(RestTemplate restTemplate, FeatureToggleState featureToggleState) {
        this.restTemplate = restTemplate;
        this.featureToggleState = featureToggleState;
    }

    private List<PlatformTier> getPlatformTiersDescByRate(String currency) {
        String url = String.format("https://priceless-khorana-4dd263.netlify.app/%s-rates.json", currency);
        Platform[] platforms = restTemplate.getForObject(url, Platform[].class);
        return extractBestRateTiers(platforms)
            .collect(Collectors.toList());
    }

    @GetMapping("/best-rate")
    public Allocation getBestRate() {
        PlatformTier tier1 = getPlatformTiersDescByRate("btc").get(0);
        return new Allocation().setName(tier1.getName()).setRate(tier1.getRate());
    }

    @GetMapping("/allocations")
    public Stream<Allocation> getAllocation(@RequestParam Double amount) throws Exception {
        if (!featureToggleState.isEnabled("multiple-tiers")) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        List<PlatformTier> platformTiers = getPlatformTiersDescByRate("btc");

        return AllocationSelector.getAllocations(amount, platformTiers);
    }

    static Stream<PlatformTier> extractBestRateTiers(Platform[] platforms) {
        return stream(platforms).flatMap(p -> stream(p.getTiers()).map(t ->
                new PlatformTier()
                    .setName(p.getName())
                    .setRate(t.getRate())
                    .setMax(t.getMax())
            ))
            .sorted(Comparator.comparingDouble(PlatformTier::getRate).reversed());
    }

    public Allocation getBestEthRate() {
        PlatformTier tier1 = getPlatformTiersDescByRate("eth").get(0);
        return new Allocation().setName(tier1.getName()).setRate(tier1.getRate());
    }
}
