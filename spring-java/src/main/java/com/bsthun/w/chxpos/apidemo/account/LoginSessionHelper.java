package com.bsthun.w.chxpos.apidemo.account;

import com.bsthun.w.chxpos.apidemo.utils.JwtUtil;

import java.util.Collections;
import java.util.Map;

public class LoginSessionHelper {
	private static final String JWT_SUBJECT = "CHXPOSDEMO/COUNTERLOGIN";
	
	public static String signLogin(long id, String username, String permission) {
		return JwtUtil.generateToken(JWT_SUBJECT, Map.of(
				"id",
				id,
				"username",
				username,
				"permission",
				Collections.singletonList(permission)
		));
	}
	
	public static String signTemporary(long id, String username, String permission, long restaurantid) {
		return JwtUtil.generateToken(JWT_SUBJECT, Map.of(
				"id",
				id,
				"username",
				username,
				"permission",
				Collections.singletonList(permission)
		));
	}
}
