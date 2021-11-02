package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AllocationControllerBestRateTest {
    @Autowired
    private TestRestTemplate template;

    @Test
    public void returnsBestRate() throws Exception {
        ResponseEntity<Allocation> res = template.getForEntity("/best-rate", Allocation.class);
        assertThat(res.getBody()).isEqualTo(new Allocation().setName("Ledn").setRate(6.25));
    }
}
