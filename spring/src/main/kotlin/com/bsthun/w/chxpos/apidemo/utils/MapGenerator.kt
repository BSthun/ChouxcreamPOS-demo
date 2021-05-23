package com.bsthun.w.chxpos.apidemo.utils

object MapGenerator {
	fun successResponse(payload: Map<String, Any> = java.util.Map.of()): Map<String, Any> {
		val map: MutableMap<String, Any> = HashMap()
		map["success"] = true
		map.putAll(payload)
		return map
	}
	
	fun failureResponse(
		errorCode: String = "SERVER_SIDE_ERROR",
		errorMsg: String? = "No description provided."
	): Map<String, Any> {
		return java.util.Map.of<String, Any>("success", false, "error_code", errorCode, "error_msg", errorMsg)
	}
	
	fun failureResponse(e: Exception): Map<String, Any> {
		return failureResponse("SERVER_SIDE_ERROR", e.message)
	}
}