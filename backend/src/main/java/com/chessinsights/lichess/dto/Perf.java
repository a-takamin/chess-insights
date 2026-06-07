package com.chessinsights.lichess.dto;

/**
 * lichess の種目別レーティング。
 *
 * <p>perfs には通常のレーティング種目({@code games, rating, ...})のほか、
 * Puzzle Storm/Racer/Streak のように {@code {runs, score}} という別形の項目も含まれる。
 * それらでは下記フィールドが欠落するため、すべて nullable( boxed) で受ける。
 */
public record Perf(Integer games, Integer rating, Integer rd, Integer prog, Boolean prov) {
}
