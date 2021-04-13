package com.bsthun.w.chxpos.apidemo.test;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/test/authen")
public class AuthenTest {
	
	@GetMapping(path = "/googleauth")
	public Map<String, Object> _googleauth() {
		GoogleAuthenticator gAuth = new GoogleAuthenticator();
		final GoogleAuthenticatorKey key = gAuth.createCredentials();
		return Map.of("key", "otpauth://totp/Counter%20SSO?secret=" + key.getKey() + "&issuer=Chouxcream%20POS");
	}
}
