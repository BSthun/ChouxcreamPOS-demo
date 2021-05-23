import React, { useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import Nav from "./Nav";
import Login from "./Login";
import Banner from "./Banner";
import NewAccount from "./NewAccount";

const Home = () => {
	const { path, url } = useRouteMatch();

	return (
		<div id={`home`}>
			<Nav />
			<Switch>
				<Route path={`${path}`} exact>
					<Banner />
				</Route>
				<Route path={`${path}/login`} exact>
					<Login />
				</Route>
				<Route path={`${path}/newaccount`} exact>
					<NewAccount />
				</Route>
			</Switch>
		</div>
	);
};

export default Home;
