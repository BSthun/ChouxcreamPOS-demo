import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import Home from "../_home/Home";
import Counter from "../_counter/Counter";
import { FloatingContextProvider } from "../context/FloatingContext";
import InnerRoute from "../utils/routing/InnerRoute";
import ScreenWidth from "../utils/routing/ScreenWidth";

import theme from "../themes/default";

import "../locales";
import "../utils/firebase";

import "../styles/index.css";
import { ProfileContextProvider } from "../context/ProfileContext";
import Storefront from "../_storefront/Storefront";

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<FloatingContextProvider>
				<ProfileContextProvider>
					<BrowserRouter>
						<Switch>
							<Route exact path="/">
								<Redirect to={{ pathname: "/home" }} />
							</Route>
							<Route path="/home">
								<Home />
							</Route>
							<Route path="/counter">
								<InnerRoute>
									<ScreenWidth>
										<Counter />
									</ScreenWidth>
								</InnerRoute>
							</Route>
							<Route path="/storefront">
								<InnerRoute>
									<ScreenWidth>
										<Storefront />
									</ScreenWidth>
								</InnerRoute>
							</Route>
						</Switch>
					</BrowserRouter>
				</ProfileContextProvider>
			</FloatingContextProvider>
		</ThemeProvider>
	);
};

export default App;
