package com.chessinsights.insights;

import com.chessinsights.insights.dto.CountDto;
import com.chessinsights.insights.dto.InsightsResponse;
import com.chessinsights.insights.dto.PerfDto;
import com.chessinsights.insights.dto.ProfileDto;
import com.chessinsights.insights.dto.RatingHistoryDto;
import com.chessinsights.insights.dto.RatingPointDto;
import com.chessinsights.lichess.LichessClient;
import com.chessinsights.lichess.UserNotFoundException;
import com.chessinsights.lichess.dto.Count;
import com.chessinsights.lichess.dto.LichessUser;
import com.chessinsights.lichess.dto.Perf;
import com.chessinsights.lichess.dto.RatingHistoryEntry;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

/** lichess から取得したデータをフロント返却用に整形・集約する。 */
@Service
public class InsightsService {

    private final LichessClient lichessClient;

    public InsightsService(LichessClient lichessClient) {
        this.lichessClient = lichessClient;
    }

    public InsightsResponse getInsights(String username) {
        // ユーザーの存在判定はプロフィール取得で行う（ここでの 404 が本当の「不在」）。
        LichessUser user = lichessClient.getUser(username);

        // rating-history は一部アカウント(閉鎖済み等)で 404 を返すが、
        // ユーザー自体は存在するため履歴なし(空)として扱う。
        List<RatingHistoryEntry> history;
        try {
            history = lichessClient.getRatingHistory(username);
        } catch (UserNotFoundException e) {
            history = List.of();
        }

        return new InsightsResponse(toProfile(user), toRatingHistory(history));
    }

    private ProfileDto toProfile(LichessUser user) {
        List<PerfDto> perfs = user.perfs() == null ? List.of()
                : user.perfs().entrySet().stream()
                .filter(e -> e.getValue() != null
                        && e.getValue().games() != null && e.getValue().games() > 0)
                .map(e -> toPerf(e.getKey(), e.getValue()))
                .sorted(Comparator.comparingInt(PerfDto::games).reversed())
                .toList();

        Count c = user.count();
        CountDto count = c == null
                ? new CountDto(0, 0, 0, 0)
                : new CountDto(c.all(), c.win(), c.loss(), c.draw());

        long playSeconds = user.playTime() == null ? 0 : user.playTime().total();

        Instant createdAt = user.createdAt() == null
                ? null
                : Instant.ofEpochMilli(user.createdAt());

        return new ProfileDto(
                user.username(),
                user.title(),
                createdAt,
                user.url(),
                playSeconds,
                count,
                perfs,
                Boolean.TRUE.equals(user.disabled())
        );
    }

    private PerfDto toPerf(String key, Perf perf) {
        boolean provisional = Boolean.TRUE.equals(perf.prov());
        int rating = perf.rating() == null ? 0 : perf.rating();
        int prog = perf.prog() == null ? 0 : perf.prog();
        return new PerfDto(key, rating, perf.games(), prog, provisional);
    }

    private List<RatingHistoryDto> toRatingHistory(List<RatingHistoryEntry> history) {
        if (history == null) {
            return List.of();
        }
        return history.stream()
                .filter(e -> e.points() != null && !e.points().isEmpty())
                .map(e -> new RatingHistoryDto(
                        e.name(),
                        e.points().stream().map(this::toPoint).toList()))
                .toList();
    }

    /** lichess の {@code [year, month(0始まり), day, rating]} を ISO 日付に正規化する。 */
    private RatingPointDto toPoint(List<Integer> p) {
        LocalDate date = LocalDate.of(p.get(0), p.get(1) + 1, p.get(2));
        return new RatingPointDto(date, p.get(3));
    }
}
