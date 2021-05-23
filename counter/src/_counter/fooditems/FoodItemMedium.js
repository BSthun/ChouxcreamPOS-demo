import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	Card,
	CardContent,
	CardMedia,
	IconButton,
	makeStyles,
	Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronDown,
	faCubes,
	faHandHoldingUsd,
	faMoneyBill,
	faPen,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import axios from "../../utils/instance/axios";
import DelayLink from "../../utils/routing/DelayLink";

const FoodItemMedium = ({ id, name, price, today, stock, category }) => {
	const styles = useStyles();
	const [t] = useTranslation("counter");
	const [expanded, setExpanded] = useState(false);

	return (
		<div className={styles.root} onMouseLeave={setExpanded.bind(this, false)}>
			<Card className={`${styles.card} ${expanded && "expanded"}`}>
				<CardMedia
					className={styles.media}
					image={`${axios.baseURL}/menus/image/${id}`}
				/>
				<CardContent>
					<div className={styles.title}>
						<Typography variant="h5" component="h2">
							{name}
						</Typography>
						<div>
							<DelayLink to={`/counter/menus/edit/${id}`}>
								<IconButton>
									<FontAwesomeIcon icon={faPen} />
								</IconButton>
							</DelayLink>
							<IconButton
								onClick={setExpanded.bind(this, !expanded)}
								className={`${styles.toggleExpand} ${expanded && "expanded"}`}
							>
								<FontAwesomeIcon icon={faChevronDown} />
							</IconButton>
						</div>
					</div>
					<div className={styles.items}>
						<div className={`item ${styles.item}`}>
							<FontAwesomeIcon icon={faMoneyBill} />
							<h6>{t("price")}</h6>
							<p>{price}</p>
						</div>
						<div className={`item ${styles.item}`}>
							<FontAwesomeIcon icon={faHandHoldingUsd} />
							<h6>{t("selltoday")}</h6>
							<p>{today}</p>
						</div>
						<div className={`item ${styles.item}`}>
							<FontAwesomeIcon icon={faCubes} />
							<h6>{t("instock")}</h6>
							<p>{stock}</p>
						</div>
						<div className={`item ${styles.item}`}>
							<FontAwesomeIcon icon={faStar} />
							<h6>{t("category")}</h6>
							<p>{category.substring(0, 1).toUpperCase()}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

const useStyles = makeStyles({
	root: {
		position: "relative",
		width: 300,
		height: 204 + 24 + 16 + 32,
	},

	card: {
		position: "absolute",
		width: "100%",
		height: 204 + 24 + 16 + 32,

		zIndex: 1,
		transition:
			"height .5s cubic-bezier(0, 0, 0.2, 1), z-index .5s step-end, box-shadow .5s cubic-bezier(0, 0, 0.2, 1)",
		"&:hover": {
			boxShadow:
				"0px 6px 12px -3px rgb(0 0 0 / 20%), 0px 10px 28px 1px rgb(0 0 0 / 14%), 0px 4px 36px 3px rgb(0 0 0 / 12%)",
		},
		"&.expanded": {
			height: 316 + 32,
			zIndex: 100,
			transition:
				"height .5s cubic-bezier(0, 0, 0.2, 1), z-index .5s step-start",
			"& .item": {
				left: "0 !important",
				width: "100%",
				backgroundColor: "#ffffff",
				"& h6": {
					opacity: 100,
				},
			},
		},
		"&:not(.expanded)": {
			"& .item": {
				top: "0 !important",
			},
		},
	},

	media: {
		height: 140,
	},

	title: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		height: "72px",
		"& div": {
			display: "flex",
		},
		"& svg": {
			fontSize: 14,
			width: "1em",
			height: "1em",
		},
	},

	toggleExpand: {
		"& svg": {
			transition: "all .5s cubic-bezier(0, 0, 0.2, 1)",
			transform: "rotate(0deg)",
		},
		"&.expanded svg": {
			transform: "rotate(180deg)",
		},
	},

	items: {
		position: "relative",
		backgroundColor: "#edeeef",
		color: "#313233",
		margin: "6px 0 0 0",
	},

	item: {
		transition: "all .5s cubic-bezier(0, 0, 0.2, 1), z-index .5s step-start",
		position: "absolute",
		display: "flex",
		width: 65,
		height: 20,
		fontSize: 14,
		color: "rgba(0, 0, 0, 0.54)",
		backgroundColor: "#edeeef",
		borderRadius: 10,
		"&:nth-child(1)": {
			top: 0,
			left: 0,
		},
		"&:nth-child(2)": {
			top: 24,
			left: 68,
		},
		"&:nth-child(3)": {
			top: 48,
			left: 135,
		},
		"&:nth-child(4)": {
			top: 72,
			left: 202,
		},
		"& svg": {
			position: "absolute",
			top: 3,
			left: 8,
		},
		"& h6": {
			position: "absolute",
			opacity: 0,
			top: 3,
			left: 30,
			transition: "all .5s cubic-bezier(0, 0, 0.2, 1), z-index .5s step-start",
		},
		"& p": {
			position: "absolute",
			top: 3,
			right: 8,
			padding: "0 0 0 4px",
		},
	},
});

FoodItemMedium.propTypes = {
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	edit: PropTypes.func,
	price: PropTypes.string.isRequired,
	today: PropTypes.string.isRequired,
	stock: PropTypes.string.isRequired,
	rating: PropTypes.string.isRequired,
};

export default FoodItemMedium;
