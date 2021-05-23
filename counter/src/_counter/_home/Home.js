import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { TitleBar } from "../bars/TitleBar";
import MarginButtomWrapper from "../../components/MarginButtomWrapper";
import WelcomeCard from "./WelcomeCard";
import ListingCard from "./ListingCard";
import RecentOrderCard from "./RecentOrderCard";
import TodayAnalyticCard from "./TodayAnalyticCard";
import axios from "../../utils/instance/axios";
import { FloatingContext } from "../../context/FloatingContext";
import UsersCard from "./UsersCard";

const Home = () => {
	const { openSnackBar } = useContext(FloatingContext);
	const [t] = useTranslation("counter");
	const [dashboard, setDashboard] = useState({
		listings: {
			menus_total: 0,
			menus_food: 0,
			orders_total: 0,
			orders_today: 0,
			users_total: 0,
			users_admin: 0,
		},
		analytics: [],
		orders: [],
	});

	useEffect(() => {
		axios
			.get("/counter/dashboard")
			.then((response) => {
				if (response.data.success) {
					setDashboard({
						listings: response.data.listings,
						analytics: response.data.analytics,
						orders: response.data.orders,
					});
				} else {
					openSnackBar(response.data.error_code);
				}
			})
			.catch((error) => openSnackBar(error.message));
	}, []);

	return (
		<div id="counter-home">
			<TitleBar breadcrumbs={[]} title={t("home")} />
			<Box
				className="container"
				margin="24px auto"
				padding="0 24px"
				maxWidth="1024px"
			>
				<MarginButtomWrapper>
					<WelcomeCard />
				</MarginButtomWrapper>
				<MarginButtomWrapper>
					<ListingCard listings={dashboard.listings} />
				</MarginButtomWrapper>
				<Grid container spacing={3}>
					<Grid item md={6} xs={12}>
						<MarginButtomWrapper>
							<RecentOrderCard orders={dashboard.orders} />
						</MarginButtomWrapper>
					</Grid>
					<Grid item md={6} xs={12}>
						<MarginButtomWrapper>
							<UsersCard />
						</MarginButtomWrapper>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

export default Home;
