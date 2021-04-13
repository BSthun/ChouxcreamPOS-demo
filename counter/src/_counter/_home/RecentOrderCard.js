import React, { useState } from "react";
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import RecentOrderItem from "./RecentOrderItem";

const RecentOrderCard = () => {
	const [t] = useTranslation("counter");
	const [recentOrders, setRecentOrders] = useState([
		{
			orderno: 10012,
			table: 20,
			paid: 125.9,
			foods: [
				{
					name: "Steak",
					img:
						"https://dp-chxpos-mockapi.bsthun.com/counter/menus/images/steak.jpg",
				},
				{
					name: "Cornflakes",
					img:
						"https://dp-chxpos-mockapi.bsthun.com/counter/menus/images/cornflakes.jpg",
				},
			],
		},
		{
			orderno: 10011,
			table: 12,
			paid: 75,
			foods: [
				{
					name: "Orange",
					img:
						"https://dp-chxpos-mockapi.bsthun.com/counter/menus/images/orange.jpg",
				},
			],
		},
		{
			orderno: 10010,
			table: 3,
			paid: 43,
			foods: [
				{
					name: "Lollipop",
				},
				{
					name: "Marshmallow",
				},
				{
					name: "Nougat",
				},
				{
					name: "Oreo",
				},
			],
		},
		{
			orderno: 10009,
			table: 7,
			paid: 59,
			foods: [
				{
					name: "ข้าวผัดไก่",
				},
				{
					name: "ปลากระพงทอดน้ำปลา",
				},
				{
					name: "เกี๋ยวกุ้ง",
				},
			],
		},
	]);

	return (
		<Card elevation={2}>
			<CardHeader title={t("recentorders")} />
			{recentOrders.map((el) => (
				<Box key={Math.random()}>
					<Divider />
					<RecentOrderItem
						orderno={el.orderno}
						table={el.table}
						paid={el.paid}
						foods={el.foods}
					/>
				</Box>
			))}
		</Card>
	);
};

export default RecentOrderCard;
