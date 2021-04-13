package com.bsthun.w.chxpos.apidemo;

import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.SQLException;

@SpringBootApplication
public class Entrypoint {
	public static void main(String[] args) {
		SpringApplication.run(Entrypoint.class, args);
		
		// Connect to MySQL Server
		try {
			new MySqlConnector();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
