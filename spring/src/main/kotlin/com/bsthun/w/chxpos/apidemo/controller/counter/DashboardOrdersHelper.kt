package com.bsthun.w.chxpos.apidemo.controller.counter

import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector.getConnection
import java.sql.SQLException

object DashboardOrdersHelper {
	val orders: ArrayList<Map<String, Any>>
		get() {
			val orderSet = getConnection()
				.createStatement()
				.executeQuery(
					"SELECT orders.id, orders.total, orders.timestamp, GROUP_CONCAT(order_items.menu_id) AS menus, users.name AS biller FROM orders INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN users ON users.id = orders.user GROUP BY orders.id ORDER BY orders.id DESC LIMIT 5"
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