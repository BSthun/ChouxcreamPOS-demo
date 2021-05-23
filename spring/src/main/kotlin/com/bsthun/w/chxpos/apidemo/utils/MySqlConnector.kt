package com.bsthun.w.chxpos.apidemo.utils

import org.slf4j.LoggerFactory
import java.sql.Connection
import java.sql.DriverManager
import java.sql.SQLException

object MySqlConnector {
	
	private val logger = LoggerFactory.getLogger(MySqlConnector.javaClass)
	private var connection: Connection? = null
	
	fun getConnection(): Connection {
		logger.info("Commited")
		if (connection == null || !connection!!.isValid(200))
			connect()
		logger.info("Returned")
		return connection!!
	}
	
	private fun connect() {
		logger.info("Connecting to MySQL Server")
		connection = DriverManager.getConnection(
			SecretProperties.MYSQL_URL + "?autoReconnect=true",
			SecretProperties.MYSQL_USERNAME,
			SecretProperties.MYSQL_PASSWORD
		)
	}
}