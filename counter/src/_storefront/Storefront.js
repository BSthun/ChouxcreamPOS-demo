import { useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Cookies from "js-cookie";
import { FloatingContext } from "../context/FloatingContext";
import { ProfileContext } from "../context/ProfileContext";
import Nav from "../_home/Nav";
import { Box } from "@material-ui/core";
import MenuColumn from "./MenuColumn";
import SummaryColumn from "./SummaryColumn";
import axios from "../utils/instance/axios";

const Storefront = (props) => {
	const history = useHistory();
	const { openSnackBar } = useContext(FloatingContext);
	const { profile } = useContext(ProfileContext);
	const [menus, setMenus] = useState([]);
	const [carts, setCarts] = useState([]);

	const fetchMenus = () => {
		axios
			.get("/menus/list")
			.then((response) => {
				if (response.data.success) {
					setMenus(response.data.menus);
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
				<SummaryColumn carts={carts} setCarts={setCarts} />
			</Box>
		</div>
	);
};

export default Storefront;
