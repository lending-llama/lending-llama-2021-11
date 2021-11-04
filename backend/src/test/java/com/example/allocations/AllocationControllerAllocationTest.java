package com.example.allocations;

import com.example.featuretoggles.FeatureToggleState;
import com.example.marketrates.Platform;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AllocationControllerAllocationTest {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    FeatureToggleState featureToggleState;

    private MockRestServiceServer mockServer;

    @BeforeEach
    public void beforeEach() {
        mockServer = MockRestServiceServer.createServer(restTemplate);
    }

	@Autowired
	private MockMvc mvc;

    private ObjectMapper mapper = new ObjectMapper();

    @Test
	public void findsBestWithOnlyLimitedRates() throws Exception {
        List<Allocation> expected = Arrays.asList(
            new Allocation().setName("Platform1").setRate(6.0),
            new Allocation().setName("Platform2").setRate(5.0)
        );

        featureToggleState.update("multiple-tiers", true);

        Platform platform1 = new Platform()
            .setName("Platform1")
            .setTiers(new Platform.Tier[]{new Platform.Tier().setRate(6.0).setMax(2.0), new Platform.Tier().setRate(2.5)});
        Platform platform2 = new Platform()
            .setName("Platform2")
            .setTiers(new Platform.Tier[]{new Platform.Tier().setRate(5.0).setMax(0.5)});


        mockServer
            .expect(requestTo(new URI("https://priceless-khorana-4dd263.netlify.app/btc-rates.json")))
            .andExpect(method(HttpMethod.GET))
            .andRespond(withStatus(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(mapper.writeValueAsString(List.of(platform1, platform2)))
            );

        mvc.perform(MockMvcRequestBuilders.get("/allocations?amount=2.5")
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().json(mapper.writeValueAsString(expected)));
	}
}
