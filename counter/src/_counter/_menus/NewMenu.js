import React, { useContext, useState } from "react";
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
	LinearProgress,
	makeStyles,
	TextField,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import qs from "qs";

import axios from "../../utils/instance/axios";
import { TitleBar } from "../bars/TitleBar";
import convertFileBase64 from "../../utils/helper/convertbase64";
import { FloatingContext } from "../../context/FloatingContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
	foodimg: {
		height: 200,
	},
});

const NewMenu = ({ edit }) => {
	const classes = useStyles();
	const history = useHistory();
	const [t] = useTranslation("counter");
	const { openSnackBar } = useContext(FloatingContext);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		id: edit?.id,
		name: edit ? edit.name : "",
		description: edit ? edit.description : "",
		price: edit ? edit.price : 0,
		category: edit ? edit.category : "food",
		stock: edit ? edit.stock : 0,
		image: edit ? edit.image : "",
	});

	const onImageChange = async (event) => {
		const file = event.target.files[0];
		const converted = await convertFileBase64(file);
		setForm((form) => ({ ...form, image: converted }));
	};

	const onSave = () => {
		setLoading(true);
		axios
			.post(edit ? "/menus/edit" : "/menus/add", qs.stringify(form))
			.then((response) => {
				if (response.data.success) {
					openSnackBar(
						edit ? "Menu has been updated!" : "Menu has been added!"
					);
					history.push("/counter/menus");
				} else {
					openSnackBar(response.data.error_code);
				}
			})
			.catch((error) => openSnackBar(error.message))
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div id="menus">
			<TitleBar
				breadcrumbs={[{ title: t("menus"), href: "/counter/menus" }]}
				title={edit ? `${t("editmenu")} #${edit.id}` : t("newmenu")}
			/>
			<Box maxWidth="560px" margin="32px auto">
				<Card elevation={2}>
					<CardHeader title={edit ? t("editmenu") : t("editmenu")} />
					<Divider />
					<CardContent>
						<TextField
							fullWidth
							label={t("menuname")}
							value={form.name}
							onChange={(event) =>
								setForm((form) => ({ ...form, name: event.target.value }))
							}
						/>
						<TextField
							fullWidth
							multiline
							rows={4}
							margin="normal"
							label={t("menudescription")}
							value={form.description}
							onChange={(event) =>
								setForm((form) => ({
									...form,
									description: event.target.value,
								}))
							}
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
										value={form.price}
										onChange={(event) =>
											setForm((form) => ({
												...form,
												price: event.target.value,
											}))
										}
									/>
								</FormControl>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									defaultValue="0"
									type="number"
									margin="normal"
									label={t("instock")}
									value={form.stock}
									onChange={(event) =>
										setForm((form) => ({
											...form,
											stock: event.target.value < 0 ? 0 : event.target.value,
										}))
									}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item md={8} xs={12}>
								<TextField
									select
									fullWidth
									label={t("category")}
									SelectProps={{
										native: true,
									}}
									value={form.category}
									onChange={(event) =>
										setForm((form) => ({
											...form,
											category: event.target.value,
										}))
									}
								>
									<option value="food">{t("food")}</option>
									<option value="snack">{t("snack")}</option>
									<option value="dessert">{t("dessert")}</option>
									<option value="drink">{t("drink")}</option>
								</TextField>
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
									type="file"
									onChange={onImageChange}
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

					{form.image && (
						<CardMedia
							className={classes.foodimg}
							image={form.image}
							title="Contemplative Reptile"
						/>
					)}
					<CardActions disableSpacing>
						<Button
							variant="contained"
							color="primary"
							size="large"
							style={{ margin: "0 0 0 auto" }}
							onClick={onSave}
							disabled={loading}
						>
							<FontAwesomeIcon style={{ fontSize: 15 }} icon={faSave} /> &nbsp;
							&nbsp;
							{t("save")}
						</Button>
					</CardActions>

					{loading && <LinearProgress />}
				</Card>
			</Box>
		</div>
	);
};

NewMenu.propTypes = {};

export default NewMenu;
