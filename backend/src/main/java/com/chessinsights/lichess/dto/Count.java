package com.chessinsights.lichess.dto;

/** lichess の対局集計(勝敗数など)。 */
public record Count(int all, int rated, int win, int loss, int draw) {
}
