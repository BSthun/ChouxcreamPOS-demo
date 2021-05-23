import { useContext, useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Cookies from "js-cookie";

import Sidebar from "./bars/Sidebar";
import Dashboard from "./_dashboard/Dashboard";
import Home from "./_home/Home";
import Menus from "./_menus/Menus";
import NewMenu from "./_menus/NewMenu";
import EditMenu from "./_menus/EditMenu";
import OrderDetail from "./_orders/OrderDetail";
import Orders from "./_orders/Orders";
import Users from "./_users/Users";
import { FloatingContext } from "../context/FloatingContext";
import { ProfileContext } from "../context/ProfileContext";

const Counter = (props) => {
	const history = useHistory();
	const { path, url } = useRouteMatch();
	const { openSnackBar } = useContext(FloatingContext);
	const { profile } = useContext(ProfileContext);

	useEffect(() => {
		if (profile.permission < 1) {
			history.push("/home/login");
			openSnackBar("Please login first!");
		} else if (profile.permission < 2) {
			history.push("/storefront");
			openSnackBar("You have insufficient permission to view admin page.");
		}
	}, []);

	return (
		<div id={`counter`}>
			<Sidebar />

			<div className="container-wrapper">
				<div className="container">
					<Switch>
						<Route path={`${path}`} exact component={Home} />
						<Route path={`${path}/dashboard`} exact component={Dashboard} />
						<Route path={`${path}/menus`} exact component={Menus} />
						<Route path={`${path}/menus/new`} exact component={NewMenu} />
						<Route path={`${path}/menus/edit/:id`} exact component={EditMenu} />
						<Route path={`${path}/orders`} exact component={Orders} />
						<Route
							path={`${path}/orders/order/:id`}
							exact
							component={OrderDetail}
						/>
						<Route path={`${path}/users`} exact component={Users} />
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default Counter;
