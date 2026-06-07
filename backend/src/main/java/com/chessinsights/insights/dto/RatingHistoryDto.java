package com.chessinsights.insights.dto;

import java.util.List;

/** フロント返却用の種目別レート推移。 */
public record RatingHistoryDto(String name, List<RatingPointDto> points) {
}
