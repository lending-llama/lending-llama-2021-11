package com.example;

import lombok.Data;

/**
 * A flattening of Platform + Platform.Tier
 */
@Data
public class PlatformTier {
    private String name;
    private Double rate;
    private Double max;
}
