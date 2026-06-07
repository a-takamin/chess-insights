package com.chessinsights.lichess;

import com.chessinsights.lichess.dto.LichessUser;
import com.chessinsights.lichess.dto.RatingHistoryEntry;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;

/**
 * lichess 公開 API(認証不要)を呼び出すクライアント。
 * 404/429 はアプリ固有の例外に変換する。
 */
@Component
public class LichessClient {

    private final RestClient restClient;

    public LichessClient(RestClient lichessRestClient) {
        this.restClient = lichessRestClient;
    }

    public LichessUser getUser(String username) {
        return restClient.get()
                .uri("/api/user/{username}", username)
                .retrieve()
                .onStatus(status -> status.value() == 404, (req, res) -> {
                    throw new UserNotFoundException(username);
                })
                .onStatus(status -> status.value() == 429, (req, res) -> {
                    throw new RateLimitException();
                })
                .body(LichessUser.class);
    }

    public List<RatingHistoryEntry> getRatingHistory(String username) {
        return restClient.get()
                .uri("/api/user/{username}/rating-history", username)
                .retrieve()
                .onStatus(status -> status.value() == 404, (req, res) -> {
                    throw new UserNotFoundException(username);
                })
                .onStatus(status -> status.value() == 429, (req, res) -> {
                    throw new RateLimitException();
                })
                .body(new ParameterizedTypeReference<List<RatingHistoryEntry>>() {
                });
    }
}
