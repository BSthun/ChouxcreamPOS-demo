import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
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

import DelayLink from "../../utils/routing/DelayLink";

const pages = ["dashboard", "menus", "orders", "staffs"];
const pages_colors = [
	"dodgerblue",
	"indianred",
	"seagreen",
	"slateblue",
	"goldenrod",
];

const Sidebar = ({ history }) => {
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
					<Avatar>B</Avatar>
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
					>
						<MenuItem onClick={setUserSwitchAnchor.bind(this, null)}>
							BSthun
						</MenuItem>
						<MenuItem onClick={setUserSwitchAnchor.bind(this, null)}>
							Posit10n
						</MenuItem>
						<MenuItem onClick={setUserSwitchAnchor.bind(this, null)}>
							Admin
						</MenuItem>
					</Menu>
				</div>

				<div className="new">
					<ButtonBase style={{ backgroundColor: pages_colors[path] }}>
						<FontAwesomeIcon icon={faPlus} /> &nbsp; {t("neworder")}
					</ButtonBase>
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
					<Link
						to={`/counter/dashboard`}
						className={path === 1 ? "active" : ""}
					>
						<div></div>
						<FontAwesomeIcon
							icon={faClone}
							style={{ color: path === 1 ? pages_colors[path] : "unset" }}
						/>
						{t("dashboard")}
					</Link>
					<Link to={`/counter/menus`} className={path === 2 ? "active" : ""}>
						<div></div>
						<FontAwesomeIcon
							icon={faListUl}
							style={{ color: path === 2 ? pages_colors[path] : "unset" }}
						/>
						{t("menus")}
					</Link>
					<Link to={`/counter/orders`} className={path === 3 ? "active" : ""}>
						<div></div>
						<FontAwesomeIcon
							icon={faMoneyBillWaveAlt}
							style={{ color: path === 3 ? pages_colors[path] : "unset" }}
						/>
						{t("orders")}
					</Link>
					<Link to={`/counter/staffs`} className={path === 4 ? "active" : ""}>
						<div></div>
						<FontAwesomeIcon
							icon={faUserFriends}
							style={{ color: path === 4 ? pages_colors[path] : "unset" }}
						/>
						{t("staffs")}
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
				{/*<p>Co-designed by Chutikarn P.</p>*/}
			</div>
		</div>
	);
};

export default withRouter(Sidebar);
