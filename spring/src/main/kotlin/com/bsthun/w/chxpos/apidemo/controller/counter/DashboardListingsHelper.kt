package com.bsthun.w.chxpos.apidemo.controller.counter

import java.sql.Connection
import java.sql.Timestamp

object DashboardListingsHelper {
	fun getListings(connection: Connection): Map<String, Any> {
		// Menu overview
		val menuListingStatement = connection.prepareStatement(
			"SELECT COUNT(*) AS total, IFNULL(SUM(IF(category = 'food', 1, 0)), 0) AS food FROM menus"
		)
		val menuListingSet = menuListingStatement.executeQuery()
		menuListingSet.next()
		
		// Order overview
		val orderListingStatement = connection.prepareStatement(
			"SELECT COUNT(*) AS total, IFNULL(SUM(IF(timestamp > ?, 1, 0)), 0) AS today FROM orders"
		)
		orderListingStatement.setTimestamp(1, Timestamp(System.currentTimeMillis() - 1000 * 60 * 60 * 24))
		val orderListingSet = orderListingStatement.executeQuery()
		orderListingSet.next()
		
		// User overview
		val userListingStatement = connection.prepareStatement(
			"SELECT COUNT(*) AS total, IFNULL(SUM(IF(permission = 'admin', 1, 0)), 0) AS admin FROM users"
		)
		val userListingSet = userListingStatement.executeQuery()
		userListingSet.next()
		
		// Construct map
		return mapOf(
			"menus_total" to menuListingSet.getInt("total"),
			"menus_food" to menuListingSet.getInt("food"),
			"orders_total" to orderListingSet.getInt("total"),
			"orders_today" to orderListingSet.getInt("today"),
			"users_total" to userListingSet.getInt("total"),
			"users_admin" to userListingSet.getInt("admin")
		)
	}
}