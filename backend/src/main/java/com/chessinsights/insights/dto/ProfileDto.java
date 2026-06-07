package com.chessinsights.insights.dto;

import java.time.Instant;
import java.util.List;

/** フロント返却用のプロフィール概要。 */
public record ProfileDto(
        String username,
        String title,
        Instant createdAt,
        String url,
        long playTimeSeconds,
        CountDto count,
        List<PerfDto> perfs,
        boolean disabled
) {
}
