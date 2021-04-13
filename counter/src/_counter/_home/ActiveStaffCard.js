import React, { useState } from "react";
import {
	Avatar,
	Badge,
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const StyledBadge = withStyles((theme) => ({
	badge: {
		backgroundColor: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
	},
}))(Badge);

const ActiveStaffCard = () => {
	const [t] = useTranslation("counter");

	const [staffs, setStaffs] = useState([
		{ word: "B" },
		{ word: "A" },
		{ word: "A" },
		{ word: "A" },
		{ word: "A" },
		{ word: "A" },
		{ word: "A" },
		{ word: "A" },
		{ word: "A" },
		{ word: "A" },
	]);

	return (
		<Card elevation={2}>
			<CardHeader title={t("activestaffs")} />
			<Divider />
			<Box padding="12px">
				{staffs.map((el) => (
					<StyledBadge
						key={Math.random()}
						overlap="circle"
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						variant="dot"
						style={{
							margin: "12px",
						}}
					>
						<Avatar>{el.word}</Avatar>
					</StyledBadge>
				))}
			</Box>
		</Card>
	);
};

export default ActiveStaffCard;
