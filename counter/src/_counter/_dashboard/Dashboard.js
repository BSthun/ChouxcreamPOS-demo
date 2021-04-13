import React from "react";
import { useTranslation } from "react-i18next";
import { TitleBar } from "../bars/TitleBar";

const Dashboard = () => {
	const [t, i18n] = useTranslation("counter");

	return (
		<div>
			<TitleBar breadcrumbs={[]} title={t("dashboard")} />
		</div>
	);
};

export default Dashboard;
