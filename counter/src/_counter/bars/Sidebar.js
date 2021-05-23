import { useContext, useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
	Avatar,
	Button,
	ButtonBase,
	IconButton,
	Menu,
	MenuItem,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCaretDown,
	faChevronLeft,
	faClone,
	faGlobe,
	faHome,
	faListUl,
	faMoneyBillWaveAlt,
	faPlus,
	faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

import DelayLink from "../../utils/routing/DelayLink";
import { ProfileContext } from "../../context/ProfileContext";
import { FloatingContext } from "../../context/FloatingContext";

const pages = ["menus", "orders", "users"];
const pages_colors = ["dodgerblue", "seagreen", "slateblue", "goldenrod"];

const Sidebar = ({ history }) => {
	const historyHook = useHistory();
	const { profile, reload } = useContext(ProfileContext);
	const { openSnackBar } = useContext(FloatingContext);
	const [path, setPath] = useState(
		pages.indexOf(history.location.pathname.split("/")[2]) + 1
	);
	const [userSwitchAnchor, setUserSwitchAnchor] = useState(null);

	const [t, i18n] = useTranslation("counter");

	useEffect(() => {
		// Bind path change event
		const historyListener = history.listen((location, action) => {
			setPath(pages.indexOf(location.pathname.split("/")[2]) + 1);
		});

		return () => {
			// Clear path change event binding
			historyListener();
		};
	});

	const logout = () => {
		Cookies.remove("token");
		reload();
		historyHook.push("/home");
		openSnackBar("Logged out successfully!");
	};

	return (
		<div className="sidebar">
			{/*
			<div className="clock">
				<h1>09:41</h1>
				<h2>Sep 7, 2021</h2>
			</div>
			<div className="bread">
				<FontAwesomeIcon icon={faStore} />
				<h1>Eat &amp; Sleep</h1>
			</div>
			<div className="bread">
				<FontAwesomeIcon icon={faMapMarkerAlt} />
				<h1>Thrung Khru</h1>
			</div>
			*/}

			<div className="header">
				<div className="user">
					<Avatar alt={profile.name} src={profile.avatar} />
					<IconButton
						aria-label="switch"
						size="small"
						onClick={(event) => setUserSwitchAnchor(event.currentTarget)}
					>
						<FontAwesomeIcon icon={faCaretDown} />
					</IconButton>
					<Menu
						anchorEl={userSwitchAnchor}
						open={Boolean(userSwitchAnchor)}
						onClose={setUserSwitchAnchor.bind(this, null)}
						keepMounted
						PaperProps={{
							style: {
								minWidth: 150,
							},
						}}
					>
						<MenuItem onClick={setUserSwitchAnchor.bind(this, null)}>
							{profile.name}
						</MenuItem>
						<MenuItem onClick={logout}>Logout</MenuItem>
					</Menu>
				</div>

				<div className="new">
					<DelayLink to="/storefront">
						<ButtonBase style={{ backgroundColor: pages_colors[path] }}>
							<FontAwesomeIcon icon={faPlus} /> &nbsp; {t("neworder")}
						</ButtonBase>
					</DelayLink>
				</div>

				<div className="menu">
					<div
						style={{
							transform: `translateY(${path * 64 + 16}px)`,
							backgroundColor: pages_colors[path],
						}}
					/>
					<Link to={`/counter`} className={path === 0 ? "active" : ""}>
						<div></div>
						<FontAwesomeIcon
							icon={faHome}
							style={{ color: path === 0 ? pages_colors[path] : "unset" }}
						/>
						{t("home")}
					</Link>
					{/* <Link
						to={`/counter/dashboard`}
						className={path === 1 ? "active" : ""}
					>
						<div></div>
						<FontAwesomeIcon
							icon={faClone}
							style={{ color: path === 1 ? pages_colors[path] : "unset" }}
						/>
						{t("dashboard")}
					</Link> */}
					<Link to={`/counter/menus`} className={path === 1 ? "active" : ""}>
						<div></div>
						<FontAwesomeIcon
							icon={faListUl}
							style={{ color: path === 1 ? pages_colors[path] : "unset" }}
						/>
						{t("menus")}
					</Link>
					<Link to={`/counter/orders`} className={path === 2 ? "active" : ""}>
						<div></div>
						<FontAwesomeIcon
							icon={faMoneyBillWaveAlt}
							style={{ color: path === 2 ? pages_colors[path] : "unset" }}
						/>
						{t("orders")}
					</Link>
					<Link to={`/counter/users`} className={path === 3 ? "active" : ""}>
						<div></div>
						<FontAwesomeIcon
							icon={faUserFriends}
							style={{ color: path === 3 ? pages_colors[path] : "unset" }}
						/>
						{t("users")}
					</Link>
				</div>
			</div>

			<div className="footer">
				<Button
					variant="outlined"
					onClick={() =>
						i18n.changeLanguage(i18n.language === "en" ? "th" : "en")
					}
				>
					<FontAwesomeIcon icon={faGlobe} /> {t("locale")}
				</Button>

				<p>Developed by Bhumjate S.</p>
			</div>
		</div>
	);
};

export default withRouter(Sidebar);
