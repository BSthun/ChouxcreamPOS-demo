import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import Home from "../_home/Home";
import Counter from "../_counter/Counter";
import InnerRoute from "../utils/routing/InnerRoute";
import ScreenWidth from "../utils/routing/ScreenWidth";

import theme from "../themes/default";
import "../locales/locales";

import "../styles/index.css";

const App = () => {
	const [signedIn, setSignedIn] = useState(false);

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<Redirect to={{ pathname: "/home" }} />
					</Route>
					<Route path="/home">
						<Home />
					</Route>
					<Route path="/customer"></Route>
					<Route path="/counter">
						<InnerRoute>
							<ScreenWidth>
								<Counter />
							</ScreenWidth>
						</InnerRoute>
					</Route>
					<Route path="/cashier">
						<InnerRoute>
							<ScreenWidth>
								<div></div>
							</ScreenWidth>
						</InnerRoute>
					</Route>
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
