package com.bsthun.w.chxpos.apidemo.controller.menu

import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector.getConnection
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import java.sql.SQLException

@RestController
class MenuImageEndpoint {
	@GetMapping(path = ["/menus/image/{menuId}"], produces = [MediaType.IMAGE_JPEG_VALUE])
	fun image(@PathVariable menuId: Int): ByteArray {
		try {
			val imageStatement = getConnection().prepareStatement("SELECT img FROM menus WHERE id = ?")
			imageStatement.setLong(1, menuId.toLong())
			val imageSet = imageStatement.executeQuery()
			if (imageSet.next()) {
				val blob = imageSet.getBlob("img") ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)
				val bytes = blob.getBytes(1, blob.length().toInt())
				blob.free()
				return bytes
			}
		} catch (e: SQLException) {
			e.printStackTrace()
		}
		throw ResponseStatusException(HttpStatus.NOT_FOUND)
	}
}