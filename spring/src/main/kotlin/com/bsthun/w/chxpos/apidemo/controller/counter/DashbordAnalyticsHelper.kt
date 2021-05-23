package com.bsthun.w.chxpos.apidemo.controller.counter

import com.bsthun.w.chxpos.apidemo.utils.MySqlConnector.getConnection
import java.sql.Date

object DashbordAnalyticsHelper {
	val analytics: ArrayList<Map<String, Any>>
		get() {
			val analyticStatement = getConnection()
				.prepareStatement(
					"SELECT  DATE(orders.timestamp) as date, COUNT(1) as count FROM orders " +
							"WHERE DATE(orders.timestamp) <= CURRENT_DATE AND DATE(orders.timestamp) > ? " +
							"GROUP BY DATE(orders.timestamp) "
				)
			analyticStatement.setDate(1, Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 30))
			val analyticSet = analyticStatement.executeQuery()
			val dates = ArrayList<Map<String, Any>>()
			while (analyticSet.next()) {
				val date = mapOf(
					"date" to analyticSet.getDate("date").time,
					"count" to analyticSet.getInt("count")
				)
				dates.add(date)
			}
			return dates
		}
}