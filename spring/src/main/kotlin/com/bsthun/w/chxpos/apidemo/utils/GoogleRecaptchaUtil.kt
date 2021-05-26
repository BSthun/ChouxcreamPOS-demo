package com.bsthun.w.chxpos.apidemo.utils

import com.goebl.david.Webb

object GoogleRecaptchaUtil {
	fun validate(token: String): Boolean {
		val webb = Webb.create()
		val result = webb
			.post("https://www.google.com/recaptcha/api/siteverify")
			.param("secret", SecretProperties.RECAPTCHA_SECRET)
			.param("response", token)
			.asJsonObject()
			.body
		return result.getBoolean("success")
	}
}