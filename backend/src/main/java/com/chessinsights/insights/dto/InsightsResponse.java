package com.chessinsights.insights.dto;

import java.util.List;

/** {@code GET /api/insights/{username}} のレスポンス全体。 */
public record InsightsResponse(ProfileDto profile, List<RatingHistoryDto> ratingHistory) {
}
