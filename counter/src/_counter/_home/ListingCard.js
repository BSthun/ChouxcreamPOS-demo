import React, { useContext, useEffect, useState } from "react";
import { ButtonBase, Card, CardContent, Grid } from "@material-ui/core";
import ListingGridItem from "./ListingGridItem";
import {
	faAddressBook,
	faListUl,
	faMoneyBillWaveAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import axios from "../../utils/instance/axios";
import { FloatingContext } from "../../context/FloatingContext";

const ListingCard = ({ listings }) => {
	const [t] = useTranslation("counter");

	return (
		<Card elevation={2}>
			<CardContent>
				<Grid container spacing={6}>
					<ListingGridItem
						icon={faListUl}
						title={t("menus")}
						viewmore="/counter/menus"
						number={listings.menus_total}
						describe={`${listings.menus_food} ${t("foods")}`}
					/>
					<ListingGridItem
						icon={faMoneyBillWaveAlt}
						title={t("orders")}
						viewmore="/counter/orders"
						number={listings.orders_total}
						describe={`${listings.orders_today} ${t("orderstoday")}`}
					/>
					<ListingGridItem
						icon={faAddressBook}
						title={t("users")}
						viewmore="/counter/users"
						number={listings.users_total}
						describe={`${listings.users_admin} ${t("admins")}`}
					/>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default ListingCard;
