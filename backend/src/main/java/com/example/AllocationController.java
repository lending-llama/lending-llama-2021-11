package com.example;

import io.split.client.SplitClient;
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
    private SplitClient splitClient;

    public AllocationController(RestTemplate restTemplate, SplitClient splitClient) {
        this.restTemplate = restTemplate;
        this.splitClient = splitClient;
    }

    @GetMapping("/best-rate")
    public Allocation getBestRate() {
        PlatformTier tier1 = getPlatformTiersDescByRate().get(0);
        return new Allocation().setName(tier1.getName()).setRate(tier1.getRate());
    }

    @GetMapping("/allocations")
    public Stream<Allocation> getAllocation(@RequestParam Double amount) throws Exception {
        String treatment = splitClient.getTreatment("key","multiple-tiers");
        if (!"on".equals(treatment)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        List<PlatformTier> platformTiers = getPlatformTiersDescByRate();

        return AllocationSelector.getAllocations(amount, platformTiers);
    }

    private List<PlatformTier> getPlatformTiersDescByRate() {
        String url = "https://priceless-khorana-4dd263.netlify.app/btc-rates.json";
        Platform[] platforms = restTemplate.getForObject(url, Platform[].class);
        return extractBestRateTiers(platforms)
            .collect(Collectors.toList());
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
        String url = "https://priceless-khorana-4dd263.netlify.app/eth-rates.json";
        Platform[] platforms = restTemplate.getForObject(url, Platform[].class);
        List<PlatformTier> platformTiers = extractBestRateTiers(platforms)
            .collect(Collectors.toList());

        PlatformTier tier1 = platformTiers.get(0);
        return new Allocation().setName(tier1.getName()).setRate(tier1.getRate());
    }
}
