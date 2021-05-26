import React from "react";
import {
	Avatar,
	Box,
	IconButton,
	makeStyles,
	Typography,
} from "@material-ui/core";
import axios from "../utils/instance/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CartItem = ({ id, name, price, quantity, setCarts }) => {
	const styles = useStyles();

	const remove = () => {
		setCarts((carts) => carts.filter((el) => el.id != id));
	};

	return (
		<Box className={styles.root}>
			<Box display="flex" alignItems="center">
				<Avatar
					src={`${axios.baseURL}/menus/image/${id}`}
					className={styles.large}
				/>
				<Box display="flex" flexDirection="column">
					<Typography variant="h6">{name}</Typography>
					<Typography variant="body1">
						{price} × ฿{quantity} = ฿{price * quantity}
					</Typography>
				</Box>
			</Box>
			<IconButton className={styles.iconButton} onClick={remove}>
				<FontAwesomeIcon icon={faTimes} style={{ fontSize: 16 }} />
			</IconButton>
		</Box>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 12,
		borderBottom: "1px solid #dadce0",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},

	iconButton: {
		width: 24,
		height: 24,
	},

	large: {
		width: theme.spacing(11),
		height: theme.spacing(11),
		margin: "0 12px 0 0",
	},
}));

export default CartItem;
