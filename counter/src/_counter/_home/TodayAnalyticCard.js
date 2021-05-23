import React from "react";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import DelayLink from "../../utils/routing/DelayLink";

const data = [
	{ time: "8 A.M.", orders: 12 },
	{ time: "9 A.M.", orders: 15 },
	{ time: "10 A.M.", orders: 21 },
	{ time: "11 A.M.", orders: 9 },
	{ time: "12 P.M.", orders: 19 },
	{ time: "1 P.M.", orders: 11 },
	{ time: "2 P.M.", orders: 15 },
];

const TodayAnalyticsCard = () => {
	const [t] = useTranslation("counter");

	return (
		<Card elevation={2}>
			<CardHeader title={t("analytics")} />
			<Divider />
			<CardContent>
				<Box
					display="flex"
					flexDirection="column"
					overflow="scroll"
					alignItems="center"
				>
					<Typography>{t("orderstoday")}</Typography>
					<LineChart
						width={350}
						height={200}
						data={data}
						style={{ transform: "translateX(-30px)" }}
					>
						<Line type="monotone" dataKey="orders" stroke="#8884d8" />
						<XAxis dataKey="time" />
						<YAxis />
					</LineChart>
				</Box>
			</CardContent>
			{/* <Divider />
			<CardActions disableSpacing>
				<DelayLink to="/counter/dashboard" style={{ marginLeft: "auto" }}>
					<Button>
						{t("viewmore")} &nbsp;
						<FontAwesomeIcon style={{ fontSize: 12 }} icon={faChevronRight} />
					</Button>
				</DelayLink>
			</CardActions> */}
		</Card>
	);
};

export default TodayAnalyticsCard;
