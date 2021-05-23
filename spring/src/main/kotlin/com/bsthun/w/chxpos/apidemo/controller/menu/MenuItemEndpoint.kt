package com.bsthun.w.chxpos.apidemo.controller.menu

import com.bsthun.w.chxpos.apidemo.utils.MapGenerator
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.successResponse
import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector.getConnection
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import java.sql.SQLException
import java.util.*

@RestController
class MenuItemEndpoint {
	@GetMapping(path = ["/menus/item/{id}"])
	fun _item(@PathVariable id: Int): Map<String, Any> {
		try {
			val menuItemStatement = getConnection()
				.prepareStatement("SELECT * FROM menus WHERE id = ?")
			menuItemStatement.setLong(1, id.toLong())
			val menuItemSet = menuItemStatement.executeQuery()
			if (menuItemSet.next()) {
				val blob = menuItemSet.getBlob("img")
				val menu = mapOf(
					"id" to menuItemSet.getLong("id"),
					"name" to menuItemSet.getString("name"),
					"description" to menuItemSet.getString("description"),
					"image" to
							if (blob == null)
								""
							else
								"data:image/jpeg;base64," +
										Base64.getEncoder().encodeToString(blob.getBytes(1, blob.length().toInt())),
					"price" to menuItemSet.getInt("price"),
					"category" to menuItemSet.getString("category"),
					"stock" to menuItemSet.getInt("stock")
				)
				return successResponse(java.util.Map.of("menu", menu))
			} else {
				throw ResponseStatusException(HttpStatus.NOT_FOUND)
			}
		} catch (e: SQLException) {
			return MapGenerator.failureResponse(e)
		}
	}
}