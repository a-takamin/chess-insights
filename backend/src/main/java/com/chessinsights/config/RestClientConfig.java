package com.chessinsights.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    /** lichess 用に baseUrl と User-Agent(推奨)を設定した RestClient。 */
    @Bean
    public RestClient lichessRestClient() {
        return RestClient.builder()
                .baseUrl("https://lichess.org")
                .defaultHeader("User-Agent", "chess-insights")
                .build();
    }
}
