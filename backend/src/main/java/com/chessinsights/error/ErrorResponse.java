package com.chessinsights.error;

/** エラー時にフロントへ返す JSON ボディ。 */
public record ErrorResponse(String error) {
}
