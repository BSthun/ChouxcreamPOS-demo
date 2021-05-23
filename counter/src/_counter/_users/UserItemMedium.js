import React from "react";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	makeStyles,
	Typography,
} from "@material-ui/core";

const UserItemMedium = ({ id, name, email, permission, avatar }) => {
	const styles = useStyles();
	return (
		<Box className={styles.root}>
			<Card className={styles.card}>
				<CardContent className={styles.content}>
					<Typography variant="h6">{name}</Typography>
					<Typography variant="body1">{email}</Typography>
					<Typography
						variant="body1"
						color="textSecondary"
						className={styles.perm}
					>
						{permission}
					</Typography>
				</CardContent>
				<CardMedia className={styles.cover} image={avatar} />
			</Card>
		</Box>
	);
};

const useStyles = makeStyles({
	root: {
		position: "relative",
		width: 400,
		height: 120,
	},

	card: {
		position: "absolute",
		width: "100%",
		height: 120,
		transition: "box-shadow .5s cubic-bezier(0, 0, 0.2, 1)",
		"&:hover": {
			boxShadow:
				"0px 6px 12px -3px rgb(0 0 0 / 20%), 0px 10px 28px 1px rgb(0 0 0 / 14%), 0px 4px 36px 3px rgb(0 0 0 / 12%)",
		},
		display: "flex",
		justifyContent: "space-between",
	},

	content: {
		flex: 1,
		alignSelf: "center",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},

	perm: {
		textTransform: "capitalize",
	},

	cover: {
		width: 120,
	},
});

export default UserItemMedium;
