import { useState, useEffect } from "react";
import { ButtonBase } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

import DelayLink from "../utils/routing/DelayLink";

import Logo from "../images/logo.svg";
import { withRouter } from "react-router";

const Nav = ({ history }) => {
	const [scrolled, setScrolled] = useState(false);
	const [showLogin, setShowLogin] = useState(false);

	const onScroll = () => {
		if (window.pageYOffset > 100) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	const onPathChange = (location) => {
		setShowLogin(location.pathname == "/home");
	};

	useEffect(() => {
		// Bind path scroll event
		window.addEventListener("scroll", onScroll);

		// Bind path change event
		onPathChange(history.location);
		const historyListener = history.listen(onPathChange);

		return () => {
			// Clear scroll event binding
			window.removeEventListener("scroll", onScroll);

			// Clear path change event binding
			historyListener();
		};
	});

	return (
		<nav className={`${(scrolled || !showLogin) && "scrolled"}`}>
			<div>
				<div>
					<div className={`logo`} />
					<h1 className={`title`}>Chouxcream POS</h1>
				</div>
				{showLogin && (
					<div>
						<DelayLink to="/home/login">
							<ButtonBase className={`btn-login`}>
								<FontAwesomeIcon icon={faSignInAlt} /> Login
							</ButtonBase>
						</DelayLink>
					</div>
				)}
			</div>
		</nav>
	);
};

export default withRouter(Nav);
