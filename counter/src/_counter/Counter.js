import { Route, Switch, useRouteMatch } from "react-router-dom";

import Sidebar from "./bars/Sidebar";
import Dashboard from "./_dashboard/Dashboard";
import Home from "./_home/Home";
import Menus from "./_menus/Menus";
import NewMenu from "./_menus/NewMenu";
import OrderDetail from "./_orders/OrderDetail";
import Orders from "./_orders/Orders";
import Staffs from "./_staffs/Staffs";

const Counter = (props) => {
	const { path, url } = useRouteMatch();

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
						<Route path={`${path}/orders`} exact component={Orders} />
						<Route
							path={`${path}/orders/order/:id`}
							exact
							component={OrderDetail}
						/>
						<Route path={`${path}/staffs`} exact component={Staffs} />
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default Counter;
