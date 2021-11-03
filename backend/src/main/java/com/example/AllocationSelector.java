package com.example;

import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class AllocationSelector {

    static Stream<Allocation> getAllocations(Double amount,
        List<PlatformTier> platformTiers) {
        int count = (int) IntStream.range(1, platformTiers.size())
            .takeWhile(i -> platformTiers.stream().limit(i).mapToDouble(PlatformTier::getMax).sum() < amount)
            .count();

        return platformTiers.subList(0, count+1).stream().map(
            t -> new Allocation().setName(t.getName()).setRate(t.getRate())
        );
    }
}
