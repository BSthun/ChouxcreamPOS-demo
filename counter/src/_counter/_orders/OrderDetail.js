import { Box } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { TitleBar } from "../bars/TitleBar";

const OrderDetail = () => {
	const [t] = useTranslation("counter");
	const { id } = useParams();

	return (
		<Box id="orders">
			<TitleBar
				breadcrumbs={[{ title: t("orders"), href: "/counter/orders" }]}
				title={`${t("orderdetail")} #${id}`}
			/>
		</Box>
	);
};

export default OrderDetail;
