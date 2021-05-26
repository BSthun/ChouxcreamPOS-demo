package com.bsthun.w.chxpos.apidemo.utils

import com.goebl.david.Webb
import org.json.JSONObject
import java.util.*

object ScbSandboxUtil {
	private var accessToken: String = ""
	private var accessTokenExpire: Long = 0L
	
	fun generateQr(amount: Int, ref2: Long): String {
		if (accessTokenExpire < System.currentTimeMillis() / 1000L)
			refreshToken()
		
		val webb = Webb.create()
		val result = webb
			.post("https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create")
			.header("Content-Type", "application/json")
			.header("Accept-Language", "EN")
			.header("RequestUid", UUID.randomUUID())
			.header("ResourceOwnerId", SecretProperties.SCB_SANDBOX_KEY)
			.header("Authorization", "Bearer $accessToken")
			.body(
				JSONObject(
					mapOf(
						"qrType" to "PP",
						"ppType" to "BILLERID",
						"ppId" to "621440384844731",
						"ref1" to "CHXPOSDEMO",
						"ref2" to ref2.toString(),
						"ref3" to "JHH",
						"amount" to amount.toString()
					)
				).toString()
			)
			.ensureSuccess()
			.asJsonObject()
			.body
		return result.getJSONObject("data").getString("qrRawData")
	}
	
	private fun refreshToken() {
		if (accessToken.equals("") || true) {
			try {
				val result = Webb.create()
					.post("https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token")
					.header("Content-Type", "application/json")
					.header("Accept-Language", "EN")
					.header("RequestUid", UUID.randomUUID())
					.header("ResourceOwnerId", SecretProperties.SCB_SANDBOX_KEY)
					.body(
						JSONObject(
							mapOf(
								"applicationKey" to SecretProperties.SCB_SANDBOX_KEY,
								"applicationSecret" to SecretProperties.SCB_SANDBOX_SECRET
							)
						).toString()
					)
					.ensureSuccess()
					.asJsonObject()
					.body
				
				accessToken = result.getJSONObject("data").getString("accessToken")
				accessTokenExpire = result.getJSONObject("data").getLong("expiresAt")
				
				println(accessToken)
			} catch (e: Exception) {
				e.printStackTrace()
			}
			
		}
	}
}