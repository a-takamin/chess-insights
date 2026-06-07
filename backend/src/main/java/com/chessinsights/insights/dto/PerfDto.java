package com.chessinsights.insights.dto;

/** フロント返却用の種目別レーティング。 */
public record PerfDto(String key, int rating, int games, int prog, boolean provisional) {
}
