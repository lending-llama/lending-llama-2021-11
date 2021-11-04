package com.example.allocations;

import com.example.marketrates.PlatformTier;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class AllocationSelector {

    static Stream<Allocation> getAllocations(Double amount,
                                             List<PlatformTier> platformTiers) {
        final List<PlatformTier> sorted = platformTiers.stream().sorted(Comparator.comparingDouble(PlatformTier::getRate).reversed()).collect(Collectors.toList());

        int count = (int) IntStream.range(1, sorted.size())
            .takeWhile(i -> sorted.stream().limit(i).map(PlatformTier::getMax).mapToDouble(d -> d == null ? Double.MAX_VALUE : d).sum() < amount)
            .count();

        return sorted.subList(0, count+1).stream().map(
            t -> new Allocation().setName(t.getName()).setRate(t.getRate())
        );
    }
}
