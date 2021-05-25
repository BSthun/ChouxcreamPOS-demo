package com.bsthun.w.chxpos.apidemo.controller.user

import com.bsthun.w.chxpos.apidemo.utils.GravatarUtil.getUrl
import com.bsthun.w.chxpos.apidemo.utils.JwtUtil.parseToken
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.failureResponse
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.successResponse
import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector
import io.jsonwebtoken.Claims
import io.jsonwebtoken.JwtException
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.sql.SQLException

@RestController
class UserListEndpoint {
	@GetMapping(path = ["/users/list"])
	fun list(@CookieValue token: String): Map<String, Any> {
		// * Verify JWT
		val claims: Claims
		try {
			claims = parseToken(token)
			if (claims["permission"] != "admin") return failureResponse("INSUFFICIENT_PERMISSION")
		} catch (e: JwtException) {
			return failureResponse("UNVERSED_TOKEN")
		}
		
		// * Database actions
		try {
			MySqlConnector.connection.use { connection ->
				val userSet = connection.createStatement().executeQuery("SELECT * FROM users")
				val users = ArrayList<Map<String, Any>>()
				while (userSet.next()) {
					users.add(
						mapOf(
							"id" to userSet.getLong("id"),
							"name" to userSet.getString("name"),
							"email" to userSet.getString("email"),
							"permission" to userSet.getString("permission"),
							"avatar" to getUrl(userSet.getString("email"))
						)
					)
				}
				return successResponse(mapOf("users" to users))
			}
		} catch (e: SQLException) {
			return failureResponse(e)
		}
	}
}