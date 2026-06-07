package com.chessinsights.lichess;

/** lichess に該当ユーザーが存在しない(404)場合にスローされる。 */
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String username) {
        super("User not found: " + username);
    }
}
