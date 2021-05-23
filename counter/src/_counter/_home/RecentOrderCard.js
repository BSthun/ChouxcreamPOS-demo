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

const RecentOrderCard = ({ orders }) => {
	const [t] = useTranslation("counter");

	return (
		<Card elevation={2}>
			<CardHeader title={t("recentorders")} />
			{orders.map((el) => (
				<Box key={Math.random()}>
					<Divider />
					<RecentOrderItem {...el} />
				</Box>
			))}
		</Card>
	);
};

export default RecentOrderCard;
