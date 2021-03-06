package com.example;

import com.example.featuretoggles.FeatureToggleState;
import com.example.featuretoggles.FeatureToggleUpdater;
import com.example.marketrates.PlatformTierFetcher;
import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.SplitFactory;
import io.split.client.SplitFactoryBuilder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.concurrent.TimeoutException;

@SpringBootApplication(scanBasePackages = "com.example")
public class Application {

	public static void main(String[] args) throws Exception {
		System.setProperty("spring.devtools.livereload.enabled", "false");
		System.setProperty("logging.level.web", "DEBUG");
		SpringApplication.run(Application.class, args);
	}

    @Bean
    public SplitClient getSplitClient() throws IOException, URISyntaxException, InterruptedException, TimeoutException {
        SplitClientConfig config = SplitClientConfig.builder()
            .setBlockUntilReadyTimeout(10000)
            .build();
        SplitFactory splitFactory = SplitFactoryBuilder.build("reqt8c55ttivqsitjju67ikte2iamsmggagf", config);
        SplitClient splitClient = splitFactory.client();
        splitClient.blockUntilReady();
        return splitClient;
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

    @Bean
    public FeatureToggleState featureToggleState() {
        return new FeatureToggleState();
    }

    @Bean
    public FeatureToggleUpdater featureToggleUpdater(SplitClient splitClient, FeatureToggleState featureToggleState) {
        return new FeatureToggleUpdater(splitClient, featureToggleState);
    }

    @Bean
    public PlatformTierFetcher platformTierFetcher(RestTemplate restTemplate){
        return new PlatformTierFetcher(restTemplate);
    }
}
