package com.bsthun.w.chxpos.apidemo.utils

import org.apache.commons.dbcp.BasicDataSource
import org.slf4j.LoggerFactory
import java.sql.Connection

object MySqlConnector {
	private val dataSource = BasicDataSource()
	
	init {
		dataSource.url = SecretProperties.MYSQL_URL
		dataSource.username = SecretProperties.MYSQL_USERNAME
		dataSource.password = SecretProperties.MYSQL_PASSWORD
	}
	
	val connection: Connection
		get() = dataSource.connection
}