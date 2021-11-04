package com.example.marketrates;

import lombok.Data;

@Data
public class Platform {
    private String name;
    private Tier[] tiers;

    @Data
    public static class Tier {
        private Double rate;
        private Double max;
    }
}
