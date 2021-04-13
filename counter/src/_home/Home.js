import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import Nav from "./Nav";
import Login from "./Login";
import Banner from "./Banner";

const Home = () => {
	const { path, url } = useRouteMatch();
	const { state, setState } = useState(0);

	return (
		<div id={`home`}>
			<Nav />
			<Switch>
				<Route path={`${path}`} exact>
					<Banner />
				</Route>
				<Route path={`${path}/login`} exact component={Login} />
			</Switch>
		</div>
	);
};

export default Home;
