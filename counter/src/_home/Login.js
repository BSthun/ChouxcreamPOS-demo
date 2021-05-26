import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	LinearProgress,
	TextField,
	Typography,
} from "@material-ui/core";
import { useContext, useState } from "react";
import ReCaptcha from "react-google-recaptcha";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import qs from "qs";

import axios from "../utils/instance/axios";
import { FloatingContext } from "../context/FloatingContext";
import { ProfileContext } from "../context/ProfileContext";
import { createRef } from "react";

const Login = () => {
	const history = useHistory();
	const { openSnackBar } = useContext(FloatingContext);
	const { reload } = useContext(ProfileContext);

	const [info, setInfo] = useState({
		email: "",
		password: "",
		recaptcha: "",
	});
	const [loading, setLoading] = useState(false);

	const recaptchaRef = createRef();

	const onRecaptchaChange = (value) => {
		if (value) {
			setInfo((info) => ({
				...info,
				recaptcha: value,
			}));
		}
	};

	const onLogin = () => {
		setLoading(true);
		recaptchaRef.current.reset();
		axios
			.post("/account/login", qs.stringify(info))
			.then((response) => {
				if (response.data.success) {
					openSnackBar("Logged in!");
					Cookies.set("token", response.data.token);
					reload();
					history.push("/counter");
				} else {
					openSnackBar(response.data.error_code);
				}
			})
			.catch((error) => openSnackBar(error.message))
			.finally(() => setLoading(false));
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
		>
			<Card elevation={2} style={{ width: "400px" }}>
				<CardHeader title="Login" />
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
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
								label="OTP Code"
								fullWidth
								onChange={(event) =>
									setInfo((info) => ({
										...info,
										password: event.target.value,
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
							<Button
								variant="outlined"
								fullWidth
								onClick={onLogin}
								disabled={loading}
							>
								Login
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="body2" align="center">
								Have an inviation code?
								<Link to="/home/newaccount"> Claim your account now</Link>
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
				{loading && <LinearProgress />}
			</Card>
		</Box>
	);
};

export default Login;
