package com.bsthun.w.chxpos.apidemo.controller.order

import com.bsthun.w.chxpos.apidemo.utils.JwtUtil.parseToken
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.failureResponse
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.successResponse
import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector
import io.jsonwebtoken.Claims
import io.jsonwebtoken.JwtException
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.sql.Statement

@RestController
class CommitOrderEndpoint {
	@PostMapping(path = ["/orders/commit"])
	fun newaccount(
		@CookieValue token: String,
		@RequestParam menus: String,
		@RequestParam quantities: String,
		@RequestParam total: Int
	): Map<String, Any> {
		// * Verify JWT
		val claims: Claims
		try {
			claims = parseToken(token)
			if (claims["permission"] != "admin")
				return failureResponse("INSUFFICIENT_PERMISSION")
		} catch (e: JwtException) {
			return failureResponse("UNVERSED_TOKEN")
		}
		
		// * Database actions
		try {
			MySqlConnector.connection.use { connection ->
				val newOrderStatement = connection
					.prepareStatement(
						"INSERT INTO orders (total, user) VALUES (?, ?)",
						Statement.RETURN_GENERATED_KEYS
					)
				newOrderStatement.setInt(1, total)
				newOrderStatement.setLong(2, claims["id"].toString().toLong())
				newOrderStatement.executeUpdate()
				val resultSet = newOrderStatement.generatedKeys
				resultSet.next()
				val orderId = resultSet.getInt(1)
				val menusArr = menus.split(",").toTypedArray()
				val quantitiesArr = quantities.split(",").toTypedArray()
				for (i in menusArr.indices) {
					val addOrderItemStatement = connection
						.prepareStatement("INSERT INTO order_items (order_id, menu_id, quiantity) VALUES (?, ?, ?)")
					addOrderItemStatement.setInt(1, orderId)
					addOrderItemStatement.setInt(2, menusArr[i].toInt())
					addOrderItemStatement.setInt(3, quantitiesArr[i].toInt())
					addOrderItemStatement.executeUpdate()
					val updateStockStatement = connection
						.prepareStatement("UPDATE menus SET stock = stock - ? WHERE id = ?")
					updateStockStatement.setInt(1, quantitiesArr[i].toInt())
					updateStockStatement.setInt(2, menusArr[i].toInt())
					updateStockStatement.executeUpdate()
				}
				return successResponse()
			}
		} catch (e: Exception) {
			e.printStackTrace()
			return failureResponse(e)
		}
	}
}