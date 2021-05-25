package com.bsthun.w.chxpos.apidemo.controller.account

import com.bsthun.w.chxpos.apidemo.utils.GoogleRecaptchaUtil.validate
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.failureResponse
import com.bsthun.w.chxpos.apidemo.utils.MapGenerator.successResponse
import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector
import com.warrenstrange.googleauth.GoogleAuthenticator
import org.apache.commons.codec.digest.DigestUtils
import org.apache.commons.validator.routines.EmailValidator
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.sql.SQLException
import java.sql.SQLIntegrityConstraintViolationException

@RestController
class NewAccountEndpoint {
	
	var googleAuthenticator = GoogleAuthenticator()
	
	companion object {
		
		private const val INVITECODE_ADMIN_HASH = "49915e0d7d4b402e3017d010bc1c0e83cac6c797d6c16e66340fe3268693a6a1"
		private const val INVITECODE_ADMIN_HASH_CSC105 =
			"351c1852b7e67df784da0868c3d8b0412fa0831efe8d4fcc3ac42c4d05c29cf7" // csc105admin
		private const val INVITECODE_STAFF_HASH_CSC105 =
			"07cec0a57b6529116dfff2b5f5f1511b8e9f3dbf673625f7aa252237835983ee" // csc105
	}
	
	@PostMapping(path = ["/account/newaccount"])
	fun newaccount(
		@RequestParam name: String,
		@RequestParam email: String,
		@RequestParam invitationCode: String,
		@RequestParam recaptcha: String
	): Map<String, Any> {
		
		// * Verify reCaptcha
		if (!validate(recaptcha)) {
			return failureResponse("UNVERIFIED_RECAPTCHA")
		}
		
		// * Verify invitation code permission
		var permission: String? = null
		if (DigestUtils.sha256Hex(invitationCode) == INVITECODE_ADMIN_HASH || DigestUtils.sha256Hex(invitationCode) == INVITECODE_ADMIN_HASH_CSC105)
			permission = "admin"
		if (DigestUtils.sha256Hex(invitationCode) == INVITECODE_STAFF_HASH_CSC105)
			permission = "staff"
		if (permission == null) return failureResponse("INVALID_INVITE_CODE")
		
		// * Validate data
		if (name.length < 4 || name.length > 64) return failureResponse(
			"ALERT_TEXT",
			"Name length should be between 4 and 64 characters."
		)
		if (!EmailValidator.getInstance().isValid(email))
			return failureResponse(
				"ALERT_TEXT",
				"Malformed email address."
			)
		
		// * Database actions
		try {
			MySqlConnector.connection.use { connection ->
				// Generate Google Authenticator Key
				val googleAuthenticatorKey = googleAuthenticator.createCredentials()
				val key = googleAuthenticatorKey.key
				val addUserStatement =
					connection.prepareStatement("INSERT INTO users (name, email, gauth, permission) VALUES (?, ?, ?, ?)")
				addUserStatement.setString(1, name)
				addUserStatement.setString(2, email)
				addUserStatement.setString(3, key)
				addUserStatement.setString(4, permission)
				return when (addUserStatement.executeUpdate()) {
					1 ->
						successResponse(
							mapOf(
								"gauth" to "otpauth://totp/$email?secret=$key&issuer=Chouxcream%20POS"
							)
						)
					else ->
						failureResponse()
				}
			}
		} catch (e: SQLIntegrityConstraintViolationException) {
			return failureResponse("DUPLICATE_EMAIL")
		} catch (e: SQLException) {
			return failureResponse(e)
		}
	}
}