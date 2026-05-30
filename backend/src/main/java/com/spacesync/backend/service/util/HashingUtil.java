package com.spacesync.backend.service.util;

import org.mindrot.jbcrypt.BCrypt;

public class HashingUtil {
    public static String hashPassword(String password) {
        int logRounds = 12;

        String salt = BCrypt.gensalt(logRounds);

        return BCrypt.hashpw(password, salt);
    }
}
