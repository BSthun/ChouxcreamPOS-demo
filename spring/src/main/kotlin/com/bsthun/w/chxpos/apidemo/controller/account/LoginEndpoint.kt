package com.bsthun.w.chxpos.apidemo.controller.account

import com.bsthun.w.chxpos.apidemo.utils.GoogleRecaptchaUtil
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator
import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector
import com.warrenstrange.googleauth.GoogleAuthenticator
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.sql.SQLException
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@RestController
class LoginEndpoint {
	var googleAuthenticator = GoogleAuthenticator()
	
	@PostMapping(path = ["/account/login"])
	fun login(
		@RequestParam email: String,
		@RequestParam password: Int,
		@RequestParam recaptcha: String,
		response: HttpServletResponse
	): Map<String, Any> {
		
		// * Verify reCaptcha
		if (!GoogleRecaptchaUtil.validate(recaptcha)) {
			return MapGenerator.failureResponse("UNVERIFIED_RECAPTCHA")
		}
		
		try {
			val userStatement = MySqlConnector
				.getConnection()
				.prepareStatement("SELECT id, name, gauth, permission FROM users WHERE email = ?")
			userStatement.setString(1, email)
			val userSet = userStatement.executeQuery()
			if (userSet.next()) {
				// Case of user exist
				// * Check weather TOTP code is match
				if (googleAuthenticator.authorize(userSet.getString("gauth"), password)) {
					val token = LoginHelper.signLogin(
						userSet.getLong("id"),
						email,
						userSet.getString("name"),
						userSet.getString("permission")
					)
					val cookie = Cookie("token", token)
					cookie.path = "/"
					response.addCookie(cookie)
					return MapGenerator.successResponse(mapOf("token" to token))
				} else {
					return MapGenerator.failureResponse("INVALID_CREDENTIAL")
				}
			} else {
				// Case of user does not exist
				return MapGenerator.failureResponse("USER_NOT_EXIST")
			}
		} catch (e: SQLException) {
			e.printStackTrace()
			return MapGenerator.failureResponse(e)
		}
	}
}