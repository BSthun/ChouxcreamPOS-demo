package com.bsthun.w.chxpos.apidemo.test;

import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test/common")
public class CommonTest
{
	@GetMapping(path = "/simplequery")
	public Map<String, Object> _simplequery() {
		Map<String, Object> res = new HashMap<>();
		
		try  {
			Connection connection = MySqlConnector.getConnection();
			Statement stmt = connection.createStatement();
			ResultSet resultSet = stmt.executeQuery("SELECT * FROM menus");

			res.put("success", true);
			ArrayList<Map<String, Object>> menus = new ArrayList<>();
			
			while (resultSet.next()) {
				Map<String, Object> menu = new HashMap<>();
				menu.put("id", resultSet.getBigDecimal("id"));
				menu.put("name", resultSet.getString("name"));
				menu.put("description", resultSet.getString("description"));
				menu.put("category", resultSet.getString("category"));
				menu.put("price", resultSet.getInt("price"));
				menu.put("stock", resultSet.getInt("stock"));
				menus.add(menu);
			}
			res.put("payload", menus);
		} catch (SQLException e) {
			res.put("success", false);
		}
		return res;
	}
	
	@GetMapping(path = "/simpleparams")
	public Map<String, Object> _simplequery(@RequestParam(name = "id") long menuid) {
		Map<String, Object> res = new HashMap<>();
		
		try  {
			Connection connection = MySqlConnector.getConnection();
			PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM menus WHERE id = ?");
			preparedStatement.setLong(1, menuid);
			ResultSet resultSet = preparedStatement.executeQuery();
			
			res.put("success", true);
			
			if (resultSet.next()) {
				Map<String, Object> menu = new HashMap<>();
				menu.put("id", resultSet.getBigDecimal("id"));
				menu.put("name", resultSet.getString("name"));
				menu.put("description", resultSet.getString("description"));
				menu.put("category", resultSet.getString("category"));
				menu.put("price", resultSet.getInt("price"));
				menu.put("stock", resultSet.getInt("stock"));
				res.put("payload", menu);
			}else{
				res.put("success", false);
				res.put("note", "MENU_NOT_FOUND");
			}
		} catch (SQLException e) {
			res.put("success", false);
			res.put("note", "QUERY_FAILURE");
		}
		return res;
	}
}