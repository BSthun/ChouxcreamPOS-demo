import { useState, useEffect } from "react";
import { ButtonBase } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

import DelayLink from "../utils/routing/DelayLink";

import Logo from "../images/logo.svg";

const Nav = () => {
	const [scrolled, setScrolled] = useState(false);

	const onScroll = () => {
		if (window.pageYOffset > 100) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	});

	return (
		<nav className={`${scrolled && "scrolled"}`}>
			<div>
				<div>
					<div className={`logo`} />
					<h1 className={`title`}>Chouxcream POS</h1>
				</div>
				<div>
					<DelayLink to="/home/login">
						<ButtonBase className={`btn-login`}>
							<FontAwesomeIcon icon={faSignInAlt} /> Login
						</ButtonBase>
					</DelayLink>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
