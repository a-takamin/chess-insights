package com.chessinsights.lichess.dto;

import java.util.List;

/**
 * {@code GET /api/user/{username}/rating-history} の要素。
 * points の各要素は {@code [year, month(0始まり), day, rating]}。
 */
public record RatingHistoryEntry(String name, List<List<Integer>> points) {
}
