package com.example.marketrates;

import org.springframework.web.client.RestOperations;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.Arrays.stream;

public class PlatformTierFetcher {

    private RestOperations restTemplate;

    public PlatformTierFetcher(final RestOperations restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<PlatformTier> getPlatformTiersDescByRate(String currency) {
        String url = String.format("https://priceless-khorana-4dd263.netlify.app/%s-rates.json", currency);
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



}
