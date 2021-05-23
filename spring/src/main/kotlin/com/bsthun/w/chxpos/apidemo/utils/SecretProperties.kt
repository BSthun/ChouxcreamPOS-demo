package com.bsthun.w.chxpos.apidemo.utils

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.PropertySource

@Configuration
@ConfigurationProperties(prefix = "secrets")
@PropertySource(value = ["classpath:variables.yml"], factory = YamlPropertySourceFactory::class)
class SecretProperties {
	
	companion object {
		// MySQL credential
		var MYSQL_URL: String = ""
		var MYSQL_USERNAME: String = ""
		var MYSQL_PASSWORD: String = ""
		
		// Json Web Token
		var JWT_KEY: String = ""
		
		// Google reCaptcha key
		var RECAPTCHA_KEY: String = ""
	}
	
	// Setters
	fun setMysqlUrl(mysqlUrl: String) {
		MYSQL_URL = mysqlUrl
	}
	
	fun setMysqlUsername(mysqlUsername: String) {
		MYSQL_USERNAME = mysqlUsername
	}
	
	fun setMysqlPassword(mysqlPassword: String) {
		MYSQL_PASSWORD = mysqlPassword
	}
	
	fun setJwtKey(jwtKey: String) {
		JWT_KEY = jwtKey
	}
	
	fun setRecaptchaKey(recaptchaKey: String) {
		RECAPTCHA_KEY = recaptchaKey
	}
}