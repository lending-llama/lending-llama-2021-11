package com.example;

import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.SplitFactory;
import io.split.client.SplitFactoryBuilder;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Arrays;
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
//        splitClient.blockUntilReady();
        return splitClient;
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

}
