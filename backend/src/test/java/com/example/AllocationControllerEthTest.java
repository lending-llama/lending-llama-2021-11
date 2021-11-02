package com.example;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;

@SpringBootTest
public class AllocationControllerEthTest {

    @Autowired
    private AllocationController allocationController;
    @Autowired
    private RestTemplate restTemplate;

    private MockRestServiceServer mockServer;
    private ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    public void beforeEach() {
        mockServer = MockRestServiceServer.createServer(restTemplate);
    }

    @Test
    public void returnsValue() throws Exception {
        Platform platform1 = new Platform()
            .setName("platform1")
            .setTiers(new Platform.Tier[]{new Platform.Tier().setRate(5.0)});
        Platform platform2 = new Platform()
            .setName("platform2")
            .setTiers(new Platform.Tier[]{new Platform.Tier().setRate(6.0)});

        mockServer
            .expect(requestTo(new URI("https://priceless-khorana-4dd263.netlify.app/eth-rates.json")))
            .andExpect(method(HttpMethod.GET))
            .andRespond(withStatus(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(mapper.writeValueAsString(List.of(platform1, platform2)))
            );

        assertThat(allocationController.getBestEthRate()).isEqualTo(new Allocation().setName("platform2").setRate(6.0));
    }
}
