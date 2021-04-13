package com.bsthun.w.chxpos.apidemo.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MySqlConnector {
	private static final Logger logger = LoggerFactory.getLogger(MySqlConnector.class);
	private static Connection connection;
	
	public MySqlConnector() throws SQLException {
		reconnect();
	}
	
	public static Connection getConnection() throws SQLException {
		if (connection.isClosed())
			reconnect();
		return connection;
	}
	
	private static void reconnect() throws SQLException {
		connection = DriverManager.getConnection(Secret.MYSQL_URL, Secret.MYSQL_USERNAME, Secret.MYSQL_PASSWORD);
		logger.info("Reconnected to MySQL Server");
	}
}
