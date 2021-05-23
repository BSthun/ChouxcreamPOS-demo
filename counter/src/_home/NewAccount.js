import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	TextField,
	Typography,
} from "@material-ui/core";
import React, { createRef, useContext, useState } from "react";
import ReCaptcha from "react-google-recaptcha";
import { Link, useHistory } from "react-router-dom";
import qs from "qs";

import { FloatingContext } from "../context/FloatingContext";
import axios from "../utils/instance/axios";

const NewAccount = () => {
	const history = useHistory();
	const { openSnackBar } = useContext(FloatingContext);
	const [info, setInfo] = useState({
		name: "",
		email: "",
		invitationCode: "",
		recaptcha: "",
	});
	const [registered, setRegistered] = useState(false);
	const recaptchaRef = createRef();

	const onRecaptchaChange = (value) => {
		if (value) {
			setInfo((info) => ({
				...info,
				recaptcha: value,
			}));
		}
	};

	const onCreateAccount = () => {
		recaptchaRef.current.reset();
		axios
			.post("/account/newaccount", qs.stringify(info))
			.then((response) => {
				if (response.data.success) {
					openSnackBar("Successfully created new account!");
					setRegistered(response.data.gauth);
				} else {
					openSnackBar(response.data.error_code);
				}
			})
			.catch((error) => openSnackBar(error.message));
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
		>
			<Card elevation={2} style={{ width: "400px" }}>
				<CardHeader title="Create new account" />
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								label="Name"
								fullWidth
								onChange={(event) =>
									setInfo((info) => ({
										...info,
										name: event.target.value,
									}))
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Email"
								fullWidth
								onChange={(event) =>
									setInfo((info) => ({
										...info,
										email: event.target.value,
									}))
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Invitation Code"
								fullWidth
								onChange={(event) =>
									setInfo((info) => ({
										...info,
										invitationCode: event.target.value,
									}))
								}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							style={{ display: "flex", justifyContent: "center" }}
						>
							<ReCaptcha
								ref={recaptchaRef}
								sitekey="6LeBJsAaAAAAANvQvqKZaT7Y_3XTg5dujZlXuMJP"
								onChange={onRecaptchaChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button variant="outlined" fullWidth onClick={onCreateAccount}>
								Create account
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="body2" align="center" gutterBottom>
								Already have an account?
								<Link to="/home/login"> Login now</Link>
							</Typography>
							<Typography variant="body2" align="center" color="textSecondary">
								Does not have invitaion code? Don't worry, <br />
								just contact <a href="mailto:co@bsthun.com">co@bsthun.com </a>
								for more details.
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			<Dialog open={registered}>
				<DialogTitle>Account created!</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Your account has been created, please use Google Authenticator app
						to scan this QR code for adding creaditional for further login.
					</DialogContentText>
					<Box display="flex" justifyContent="center" width="100%">
						<img
							src={`https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${encodeURIComponent(
								registered
							)}`}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => history.push("/home/login")} color="primary">
						Login
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default NewAccount;
