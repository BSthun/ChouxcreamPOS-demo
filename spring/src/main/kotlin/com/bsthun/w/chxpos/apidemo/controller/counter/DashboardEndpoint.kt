package com.bsthun.w.chxpos.apidemo.controller.counter

import com.bsthun.w.chxpos.apidemo.utils.JwtUtil.parseToken
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.failureResponse
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.successResponse
import io.jsonwebtoken.Claims
import io.jsonwebtoken.JwtException
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.sql.SQLException

@RestController
class DashboardEndpoint {
	
	@GetMapping(path = ["/counter/dashboard"])
	fun _dashboardlisting(@CookieValue token: String): Map<String, Any> {
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
			val listings = DashboardListingsHelper.listings
			val analytics = DashbordAnalyticsHelper.analytics
			val orders = DashboardOrdersHelper.orders
			return successResponse(mapOf("listings" to listings, "analytics" to analytics, "orders" to orders))
		} catch (e: SQLException) {
			e.printStackTrace()
			return failureResponse()
		}
	}
}