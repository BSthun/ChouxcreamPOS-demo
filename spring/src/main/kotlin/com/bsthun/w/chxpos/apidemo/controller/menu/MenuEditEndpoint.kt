package com.bsthun.w.chxpos.apidemo.controller.menu

import com.bsthun.w.chxpos.apidemo.utils.JwtUtil.parseToken
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.failureResponse
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.successResponse
import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector.getConnection
import io.jsonwebtoken.JwtException
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.sql.Blob
import java.util.*
import javax.sql.rowset.serial.SerialBlob

@RestController
class MenuEditEndpoint {
	@PostMapping(path = ["/menus/edit"])
	fun _edit(
		@CookieValue token: String,
		@RequestParam id: Int,
		@RequestParam name: String,
		@RequestParam description: String,
		@RequestParam price: Int,
		@RequestParam stock: Int,
		@RequestParam category: String,
		@RequestParam image: String
	): Map<String, Any> {		// * Validate data
		if (id == 0 || name.isBlank() || description.isBlank() || price == 0 || stock == 0 || category.isBlank() || image.isBlank()) return failureResponse(
			"MISSING_FIELD"
		)
		
		// * Verify JWT
		try {
			val claims = parseToken(token)
			if (claims["permission"] != "admin") return failureResponse("INSUFFICIENT_PERMISSION")
		} catch (e: JwtException) {
			return failureResponse("UNVERSED_TOKEN")
		}
		
		// * Database actions
		try {
			val editMenuStatement = getConnection().prepareStatement(
					"UPDATE menus SET name = ?, description = ?, img = ?, price = ?, category = ?, stock = ? WHERE id = ?"
				)
			editMenuStatement.setString(1, name)
			editMenuStatement.setString(2, description)
			val imageBytes = Base64.getDecoder().decode(image.substring(image.indexOf(",") + 1))
			val imageBlob: Blob = SerialBlob(imageBytes)
			editMenuStatement.setBlob(3, imageBlob)
			editMenuStatement.setInt(4, price)
			editMenuStatement.setString(5, category)
			editMenuStatement.setInt(6, stock)
			editMenuStatement.setLong(7, id.toLong())
			val addMenuResult = editMenuStatement.executeUpdate()
			if (addMenuResult == 1) {
				return successResponse()
			} else {
				return failureResponse("ACTION_FAILURE")
			}
		} catch (e: Exception) {
			e.printStackTrace()
			return failureResponse(e)
		}
	}
}