package com.bsthun.w.chxpos.apidemo.controller.menu

import com.bsthun.w.chxpos.apidemo.utils.JwtUtil.parseToken
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.failureResponse
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.successResponse
import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector.getConnection
import io.jsonwebtoken.Claims
import io.jsonwebtoken.JwtException
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.sql.Blob
import java.util.*
import javax.sql.rowset.serial.SerialBlob

@RestController
class MenuAddEndpoint {
	
	@PostMapping(path = ["/menus/add"])
	fun _add(
		@CookieValue token: String,
		@RequestParam name: String,
		@RequestParam description: String,
		@RequestParam price: Int,
		@RequestParam stock: Int,
		@RequestParam category: String,
		@RequestParam image: String
	): Map<String, Any> {
		
		// * Validate data
		if (name.isBlank() || description.isBlank() || price == 0 || stock == 0 || category.isBlank() || image.isBlank()) return failureResponse(
			"MISSING_FIELD"
		)
		
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
			val addMenuStatement = getConnection().prepareStatement(
					"INSERT INTO menus (name, description, img, price, stock, category) VALUES (?, ?, ?, ?, ?, ?)"
				)
			addMenuStatement.setString(1, name)
			addMenuStatement.setString(2, description)
			val imageBytes = Base64.getDecoder().decode(image.substring(image.indexOf(",") + 1))
			val imageBlob: Blob = SerialBlob(imageBytes)
			addMenuStatement.setBlob(3, imageBlob)
			addMenuStatement.setInt(4, price)
			addMenuStatement.setInt(5, stock)
			addMenuStatement.setString(6, category)
			val addMenuResult = addMenuStatement.executeUpdate()
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