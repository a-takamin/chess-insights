package com.chessinsights.lichess;

/** lichess にレート制限(429)された場合にスローされる。 */
public class RateLimitException extends RuntimeException {
    public RateLimitException() {
        super("Rate limited by lichess");
    }
}
