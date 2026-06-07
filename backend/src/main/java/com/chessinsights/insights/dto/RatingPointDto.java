package com.chessinsights.insights.dto;

import java.time.LocalDate;

/** レート推移の1点(ISO日付に正規化済み)。 */
public record RatingPointDto(LocalDate date, int rating) {
}
