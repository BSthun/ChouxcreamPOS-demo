import React from "react";
import { ButtonBase, Card, CardContent, Grid } from "@material-ui/core";
import ListingGridItem from "./ListingGridItem";
import {
	faAddressBook,
	faListUl,
	faMoneyBillWaveAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const ListingCard = () => {
	const [t] = useTranslation("counter");

	return (
		<Card elevation={2}>
			<CardContent>
				<Grid container spacing={6}>
					<ListingGridItem
						icon={faListUl}
						title={t("menus")}
						viewmore="/counter/menus"
						number="5"
						describe={`3 ${t("food")}`}
					/>
					<ListingGridItem
						icon={faMoneyBillWaveAlt}
						title={t("orders")}
						viewmore="/counter/orders"
						number="1251"
						describe={`125 ${t("orderstoday")}`}
					/>
					<ListingGridItem
						icon={faAddressBook}
						title={t("staffs")}
						viewmore="/counter/staffs"
						number="12"
						describe={`2 ${t("activenow")}`}
					/>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default ListingCard;
