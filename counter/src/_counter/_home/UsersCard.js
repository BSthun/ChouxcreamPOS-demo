import React, { useContext, useEffect, useState } from "react";
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
import axios from "../../utils/instance/axios";
import { FloatingContext } from "../../context/FloatingContext";

const StyledBadge = withStyles((theme) => ({
	badge: {
		backgroundColor: "#eba40c",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
	},
}))(Badge);

const UsersCard = () => {
	const { openSnackBar } = useContext(FloatingContext);
	const [t] = useTranslation("counter");

	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get("/users/list")
			.then((response) => {
				if (response.data.success) {
					setUsers(response.data.users);
				} else {
					openSnackBar(response.data.error_code);
				}
			})
			.catch((error) => openSnackBar(error.message));
	}, []);

	return (
		<Card elevation={2}>
			<CardHeader title={t("users")} />
			<Divider />
			<Box padding="12px">
				{users.map((el) => (
					<StyledBadge
						key={Math.random()}
						overlap="circle"
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						variant={el.permission == "admin" ? "dot" : "standard"}
						style={{
							margin: "12px",
						}}
					>
						<Avatar alt={el.name} src={el.avatar} />
					</StyledBadge>
				))}
			</Box>
		</Card>
	);
};

export default UsersCard;
