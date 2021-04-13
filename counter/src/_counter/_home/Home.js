import React from "react";
import { Box, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { TitleBar } from "../bars/TitleBar";
import MarginButtomWrapper from "../../components/MarginButtomWrapper";
import WelcomeCard from "./WelcomeCard";
import ListingCard from "./ListingCard";
import RecentOrderCard from "./RecentOrderCard";
import TodayAnalyticCard from "./TodayAnalyticCard";
import ActiveStaffCard from "./ActiveStaffCard";

const Home = () => {
	const [t] = useTranslation("counter");

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
					<ListingCard />
				</MarginButtomWrapper>
				<Grid container spacing={3}>
					<Grid item md={6} xs={12}>
						<MarginButtomWrapper>
							<RecentOrderCard />
						</MarginButtomWrapper>
					</Grid>
					<Grid item md={6} xs={12}>
						<MarginButtomWrapper>
							<TodayAnalyticCard />
						</MarginButtomWrapper>
						<MarginButtomWrapper>
							<ActiveStaffCard />
						</MarginButtomWrapper>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

export default Home;
