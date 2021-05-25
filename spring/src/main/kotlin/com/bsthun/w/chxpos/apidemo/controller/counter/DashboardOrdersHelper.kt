package com.bsthun.w.chxpos.apidemo.controller.counter

import java.sql.Connection

object DashboardOrdersHelper {
	fun getOrders(connection: Connection): ArrayList<Map<String, Any>> {
		val orderSet = connection
			.createStatement()
			.executeQuery(
				"SELECT orders.id, orders.total, orders.timestamp, ANY_VALUE(users.name) AS biller, GROUP_CONCAT(order_items.menu_id) AS menus FROM orders INNER JOIN users ON users.id = orders.user INNER JOIN order_items ON orders.id = order_items.order_id GROUP BY orders.id ORDER BY orders.id DESC LIMIT 5"
			)
		val orders = ArrayList<Map<String, Any>>()
		while (orderSet.next()) {
			orders.add(
				mapOf(
					"id" to orderSet.getLong("id"),
					"total" to orderSet.getString("total"),
					"timestamp" to orderSet.getTimestamp("timestamp").time,
					"menus" to orderSet.getString("menus"),
					"biller" to orderSet.getString("biller")
				)
			)
		}
		return orders
	}
}