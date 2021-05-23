import React, { useContext, useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from "@material-ui/core";
import axios from "../utils/instance/axios";
import { FloatingContext } from "../context/FloatingContext";

const MenuItem = ({ id, name, description, price, stock, setCarts }) => {
	const { openSnackBar } = useContext(FloatingContext);
	const styles = useStyles();
	const [quantity, setQuantity] = useState(0);

	const onAdd = () => {
		if (quantity != 0) {
			setCarts((carts) => [
				...carts,
				{
					id: id,
					name: name,
					price: price,
					quantity: quantity,
				},
			]);
			setQuantity(0);
		} else {
			openSnackBar("Please specify quantity first.");
		}
	};

	return (
		<Box className={styles.root}>
			<Card className={styles.card}>
				<CardMedia
					className={styles.media}
					image={`${axios.baseURL}/menus/image/${id}`}
				/>
				<CardContent className={styles.content}>
					<Typography variant="h5">{name}</Typography>
					<Typography variant="body1" color="textSecondary" sty>
						{description}
					</Typography>
					<Typography variant="body1" gutterBottom>
						${price} | {stock} remaining
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={8}>
							<TextField
								variant="outlined"
								margin="dense"
								type="number"
								value={quantity}
								onChange={(event) =>
									event.target.value > 0 &&
									event.target.value <= stock &&
									setQuantity(event.target.value)
								}
							/>
						</Grid>
						<Grid
							item
							xs={4}
							style={{
								display: "flex",
								alignItems: "center",
								margin: "4px 0 0 0",
							}}
						>
							<Button variant="outlined" onClick={onAdd}>
								Add
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	);
};

const useStyles = makeStyles({
	root: {
		width: 300,
		height: 370,
	},

	card: {
		height: 370,
		transition: "box-shadow .5s cubic-bezier(0, 0, 0.2, 1)",
		"&:hover": {
			boxShadow:
				"0px 6px 12px -3px rgb(0 0 0 / 20%), 0px 10px 28px 1px rgb(0 0 0 / 14%), 0px 4px 36px 3px rgb(0 0 0 / 12%)",
		},
	},

	media: {
		height: 150,
	},

	content: {
		height: 200,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
});

export default MenuItem;
