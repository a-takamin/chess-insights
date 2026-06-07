package com.chessinsights.lichess.dto;

import java.util.Map;

/**
 * {@code GET /api/user/{username}} のレスポンス。
 * 必要なフィールドのみ定義(未知フィールドは Jackson が無視する設定が既定)。
 */
public record LichessUser(
        String id,
        String username,
        String title,
        Map<String, Perf> perfs,
        Long createdAt,
        Long seenAt,
        PlayTime playTime,
        String url,
        Count count,
        Boolean disabled
) {
}
