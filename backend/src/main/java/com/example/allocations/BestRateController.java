package com.example.allocations;

import com.example.marketrates.PlatformTier;
import com.example.marketrates.PlatformTierFetcher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BestRateController {
    private PlatformTierFetcher platformTierFetcher;

    public BestRateController(PlatformTierFetcher platformTierFetcher) {
        this.platformTierFetcher = platformTierFetcher;
    }

    @GetMapping("/best-rate")
    public Allocation getBestRate() {
        PlatformTier tier1 = platformTierFetcher.getPlatformTiersDescByRate("btc").get(0);
        return new Allocation().setName(tier1.getName()).setRate(tier1.getRate());
    }

    public Allocation getBestEthRate() {
        PlatformTier tier1 = platformTierFetcher.getPlatformTiersDescByRate("eth").get(0);
        return new Allocation().setName(tier1.getName()).setRate(tier1.getRate());
    }
}
