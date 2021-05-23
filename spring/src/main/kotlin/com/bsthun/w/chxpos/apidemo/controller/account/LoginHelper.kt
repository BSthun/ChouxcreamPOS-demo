package com.bsthun.w.chxpos.apidemo.controller.account

import com.bsthun.w.chxpos.apidemo.utils.GravatarUtil.getUrl
import com.bsthun.w.chxpos.apidemo.utils.JwtUtil.generateToken

object LoginHelper {
	private const val JWT_SUBJECT = "CHXPOSDEMO/COUNTERLOGIN"
	
	fun signLogin(id: Long, email: String, name: String, permission: String): String {
		return generateToken(
			JWT_SUBJECT,
			mapOf(
				"id" to id,
				"email" to email,
				"name" to name,
				"permission" to permission,
				"avatar" to getUrl(email)
			)
		)
	}
}