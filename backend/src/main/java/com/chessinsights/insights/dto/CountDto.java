package com.chessinsights.insights.dto;

/** フロント返却用の勝敗集計。 */
public record CountDto(int all, int win, int loss, int draw) {
}
