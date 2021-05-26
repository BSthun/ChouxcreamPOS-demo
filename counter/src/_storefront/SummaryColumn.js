import React, { useContext } from "react";
import { Avatar, Box, Button, Grid, Typography } from "@material-ui/core";
import { ProfileContext } from "../context/ProfileContext";
import CartItem from "./CartItem";
import axios from "../utils/instance/axios";
import qs from "qs";
import { FloatingContext } from "../context/FloatingContext";
import { Link } from "react-router-dom";

const SummaryColumn = ({ carts, setCarts, place }) => {
	const { openSnackBar } = useContext(FloatingContext);
	const { profile } = useContext(ProfileContext);

	return (
		<Box
			display="flex"
			flexDirection="column"
			width="350px"
			borderLeft="1px solid #dadce0"
		>
			<Box flex="1" overflow="scroll">
				<Box padding="12px 24px" borderBottom="1px solid #dadce0">
					<Typography variant="h6">Cart</Typography>
				</Box>
				{carts.map(
					(el) =>
						el.quantity != 0 && (
							<CartItem key={el.id} {...el} setCarts={setCarts} />
						)
				)}
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				padding="24px"
				boxShadow="0px -6px 9px -3px rgb(0 0 0 / 20%)"
			>
				<Typography variant="h6" color="textSecondary">
					Biller
				</Typography>
				<Box display="flex" alignItems="center">
					<Avatar src={profile.avatar} />
					<Typography variant="h6" style={{ margin: "0 0 0 12px" }}>
						{profile.name}
					</Typography>
				</Box>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				padding="0 24px"
			>
				<Typography variant="h6" color="textSecondary">
					Total
				</Typography>
				<Typography variant="h6">
					${carts.reduce((a, b) => a + b.quantity * b.price, 0)}
				</Typography>
			</Box>
			<Grid container spacing={2} style={{ padding: "24px" }}>
				<Grid item xs={12}>
					<Button variant="outlined" size="large" fullWidth onClick={place}>
						Place order
					</Button>
				</Grid>
				<Grid item xs={6}>
					<Button
						variant="outlined"
						fullWidth
						onClick={() =>
							setCarts((carts) => carts.map((el) => ({ ...el, quantity: 0 })))
						}
					>
						Clear Cart
					</Button>
				</Grid>
				<Grid item xs={6}>
					<Link to="/counter">
						<Button variant="outlined" fullWidth>
							Admin panel
						</Button>
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
};

export default SummaryColumn;
