package com.bsthun.w.chxpos.apidemo.controller.menu

import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.failureResponse
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.successResponse
import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.sql.SQLException

@RestController
class MenuListEndpoint {
	@GetMapping(path = ["/menus/list"])
	fun list(): Map<String, Any> {
		try {
			MySqlConnector.connection.use { connection ->
				val menuSet = connection
					.createStatement()
					.executeQuery("SELECT id, name, description, price, category, stock FROM menus ORDER BY id DESC ")
				val menus = ArrayList<Map<String, Any>>()
				while (menuSet.next()) {
					menus.add(
						mapOf(
							"id" to menuSet.getLong("id"),
							"name" to menuSet.getString("name"),
							"description" to menuSet.getString("description"),
							"category" to menuSet.getString("category"),
							"price" to menuSet.getInt("price"),
							"stock" to menuSet.getInt("stock")
						)
					)
				}
				return successResponse(mapOf("menus" to menus))
			}
		} catch (e: SQLException) {
			return failureResponse(e)
		}
	}
}