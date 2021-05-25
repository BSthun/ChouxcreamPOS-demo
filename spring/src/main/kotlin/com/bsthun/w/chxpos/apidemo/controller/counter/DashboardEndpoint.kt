package com.bsthun.w.chxpos.apidemo.controller.counter

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
class DashboardEndpoint {
	
	@GetMapping(path = ["/counter/dashboard"])
	fun dashboard(@CookieValue token: String): Map<String, Any> {
		// * Verify JWT
		val claims: Claims
		try {
			claims = parseToken(token)
			if (claims["permission"] != "admin") return failureResponse("INSUFFICIENT_PERMISSION")
		} catch (e: JwtException) {
			return failureResponse("UNVERSED_TOKEN")
		}
		
		// * Actions
		try {
			MySqlConnector.connection.use { connection ->
				val listings = DashboardListingsHelper.getListings(connection)
				val analytics = DashbordAnalyticsHelper.getAnalytics(connection)
				val orders = DashboardOrdersHelper.getOrders(connection)
				return successResponse(mapOf("listings" to listings, "analytics" to analytics, "orders" to orders))
			}
		} catch (e: SQLException) {
			e.printStackTrace()
			return failureResponse()
		}
	}
}