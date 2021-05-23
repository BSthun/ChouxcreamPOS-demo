import React, { useContext } from "react";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { ProfileContext } from "../../context/ProfileContext";

const WelcomeCard = () => {
	const { profile } = useContext(ProfileContext);
	const [t] = useTranslation("counter");

	const hours = new Date().getHours();

	return (
		<Card elevation={2}>
			<CardContent>
				<Typography color="textSecondary" gutterBottom>
					Chouxcream POS
				</Typography>
				<Typography variant="h5" component="h2" gutterBottom>
					{hours < 12
						? t("goodmorning")
						: hours < 17
						? t("goodafternoon")
						: t("goodevening")}
					<b style={{ fontWeight: 500 }}> {profile.name}</b>
					{t("fullstop")}
				</Typography>
				<Typography color="textSecondary" variant="h6">
					<FontAwesomeIcon icon={faStore} />
					&nbsp; Untitled Store
				</Typography>
			</CardContent>
		</Card>
	);
};

export default WelcomeCard;
