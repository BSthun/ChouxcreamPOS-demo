import { useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Cookies from "js-cookie";
import { FloatingContext } from "../context/FloatingContext";
import { ProfileContext } from "../context/ProfileContext";
import Nav from "../_home/Nav";
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	LinearProgress,
	Typography,
} from "@material-ui/core";
import MenuColumn from "./MenuColumn";
import SummaryColumn from "./SummaryColumn";
import axios from "../utils/instance/axios";
import qs from "qs";

const Storefront = (props) => {
	const history = useHistory();
	const { openSnackBar } = useContext(FloatingContext);
	const { profile } = useContext(ProfileContext);
	const [menus, setMenus] = useState(false);
	const [carts, setCarts] = useState([]);
	const [dialog, setDialog] = useState(false);

	const place = () => {
		setDialog(true);

		const menus = carts.filter((el) => el.quantity != 0).map((el) => el.id);
		const quantities = carts
			.filter((el) => el.quantity != 0)
			.map((el) => el.quantity);

		const total = carts.reduce((a, b) => a + b.quantity * b.price, 0);

		axios
			.post(
				"/orders/commit",
				qs.stringify({
					menus: menus.join(","),
					quantities: quantities.join(","),
					total,
				})
			)
			.then((response) => {
				if (response.data.success) {
					openSnackBar("Prder placed successfully!");
					setDialog(response.data.qr);
					fetchMenus();
				} else {
					openSnackBar(response.data.error_code);
					setDialog(false);
				}
			})
			.catch((error) => openSnackBar(error.message) & setDialog(false));
	};

	const fetchMenus = () => {
		axios
			.get("/menus/list")
			.then((response) => {
				if (response.data.success) {
					setMenus(response.data.menus);
					setCarts(response.data.menus.map((el) => ({ ...el, quantity: 0 })));
				} else {
					openSnackBar(response.data.error_code);
				}
			})
			.catch((error) => openSnackBar(error.message));
	};

	useEffect(() => {
		if (profile.permission < 1) {
			history.push("/home/login");
			openSnackBar("Please login first!");
		}

		fetchMenus();
	}, []);

	return (
		<div id="storefront">
			<Nav />
			<Box height="calc(100vh - 64px)" margin="64px 0 0 0" display="flex">
				<MenuColumn menus={menus} setCarts={setCarts} />
				<SummaryColumn carts={carts} setCarts={setCarts} place={place} />
			</Box>
			<Dialog style={{ minWidth: "400px" }} open={dialog}>
				<DialogTitle
					id="customized-dialog-title"
					onClose={() => setDialog(false)}
				>
					Place order
				</DialogTitle>
				<DialogContent dividers>
					{dialog == 1 ? (
						<Box display="flex" alignItems="center" justifyContent="center">
							<CircularProgress />
							&nbsp; &nbsp;
							<Typography variant="body1">Placing your order</Typography>
						</Box>
					) : (
						<Box
							display="flex"
							alignItems="center"
							justifyContent="center"
							flexDirection="column"
						>
							<DialogContentText>
								Your order has been placed. Let customer scan this QR code
								<br /> to pay using Thai PromptPay service.
							</DialogContentText>
							<img
								src={`https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${dialog}`}
							/>
						</Box>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDialog(false)}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Storefront;
