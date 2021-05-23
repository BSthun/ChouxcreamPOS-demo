package com.bsthun.w.chxpos.apidemo.controller.order

import com.bsthun.w.chxpos.apidemo.utils.JwtUtil.parseToken
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.failureResponse
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.successResponse
import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector.getConnection
import io.jsonwebtoken.Claims
import io.jsonwebtoken.JwtException
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.sql.SQLException

@RestController
class OrderListEndpoint {
	@GetMapping(path = ["/orders/list"])
	fun _list(@CookieValue token: String): Map<String, Any> {
		// * Verify JWT
		val claims: Claims
		try {
			claims = parseToken(token)
			if (claims["permission"] != "admin") return failureResponse("INSUFFICIENT_PERMISSION")
		} catch (e: JwtException) {
			return failureResponse("UNVERSED_TOKEN")
		}
		
		// * Database action
		try {
			val orderSet = getConnection()
				.createStatement()
				.executeQuery(
					"SELECT orders.id, orders.total, orders.timestamp, GROUP_CONCAT(order_items.menu_id) AS menus, users.name AS biller FROM orders INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN users ON users.id = orders.user GROUP BY orders.id "
				)
			val orders = ArrayList<Map<String, Any>>()
			while (orderSet.next()) {
				orders.add(
					mapOf(
						"id" to orderSet.getLong("id"),
						"total" to orderSet.getString("total"),
						"timestamp" to orderSet.getTimestamp("timestamp").time,
						"menus" to orderSet.getString("menus"),
						"biller" to orderSet.getString("biller")
					)
				)
			}
			return successResponse(mapOf("orders" to orders))
		} catch (e: SQLException) {
			return failureResponse(e)
		}
	}
}