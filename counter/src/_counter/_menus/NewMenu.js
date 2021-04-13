import React from "react";
import PropTypes from "prop-types";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Divider,
	FormControl,
	Grid,
	Input,
	InputAdornment,
	InputLabel,
	makeStyles,
	TextField,
	Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { TitleBar } from "../bars/TitleBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
	foodimg: {
		height: 200,
	},
});

const NewMenu = (props) => {
	const classes = useStyles();
	const [t] = useTranslation("counter");

	return (
		<div id="menus">
			<TitleBar
				breadcrumbs={[{ title: t("menus"), href: "/counter/menus" }]}
				title={t("newmenu")}
			/>
			<Box maxWidth="560px" margin="32px auto">
				<Card elevation={2}>
					<CardHeader title={t("newmenu")} />
					<Divider />
					<CardContent>
						<TextField fullWidth label={t("menuname")} />
						<TextField
							fullWidth
							multiline
							rows={4}
							margin="normal"
							label={t("menudescription")}
						/>
						<Grid container spacing={3}>
							<Grid item md={6} xs={12}>
								<FormControl fullWidth margin="normal">
									<InputLabel>{t("price")}</InputLabel>
									<Input
										type="number"
										startAdornment={
											<InputAdornment position="start">$</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									select
									fullWidth
									margin="normal"
									label={t("category")}
									SelectProps={{
										native: true,
									}}
								>
									<option value="food">{t("food")}</option>
									<option value="drink">{t("drink")}</option>
									<option value="snack">{t("snack")}</option>
								</TextField>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item md={8} xs={12}>
								<TextField
									fullWidth
									defaultValue="0"
									type="number"
									label={t("instock")}
								/>
							</Grid>
							<Grid
								item
								md={4}
								xs={12}
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "flex-end",
								}}
							>
								<input
									accept="image/*"
									style={{ display: "none" }}
									id="counter-menus-newmenu--uploadimg"
									multiple
									type="file"
								/>
								<label htmlFor="counter-menus-newmenu--uploadimg">
									<Button
										variant="outlined"
										component="span"
										style={{ margin: "auto auto auto 0" }}
									>
										{t("uploadimage")}
									</Button>
								</label>
							</Grid>
						</Grid>
					</CardContent>
					<CardMedia
						className={classes.foodimg}
						image="https://dp-chxpos-mockapi.bsthun.com/counter/menus/images/orange.jpg"
						title="Contemplative Reptile"
					/>
					<CardActions disableSpacing>
						<Button
							variant="contained"
							color="primary"
							size="large"
							style={{ margin: "0 0 0 auto" }}
						>
							<FontAwesomeIcon style={{ fontSize: 15 }} icon={faSave} /> &nbsp;
							&nbsp;
							{t("save")}
						</Button>
					</CardActions>
				</Card>
			</Box>
		</div>
	);
};

NewMenu.propTypes = {};

export default NewMenu;
