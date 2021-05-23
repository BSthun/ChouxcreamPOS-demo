package com.bsthun.w.chxpos.apidemo.beans

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.config.annotation.CorsRegistry

@Configuration
@EnableWebMvc
class MvcConfigurer : WebMvcConfigurer {
	override fun addCorsMappings(registry: CorsRegistry) {
		registry
			.addMapping("/**")
			.allowedOrigins("http://localhost:3000", "https://dp-chxpos.bsthun.com")
			.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
			.allowCredentials(true)
	}
}