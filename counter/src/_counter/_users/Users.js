import { LinearProgress } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FloatingContext } from "../../context/FloatingContext";
import axios from "../../utils/instance/axios";

import { TitleBar } from "../bars/TitleBar";
import UserItemMedium from "./UserItemMedium";

const Staffs = () => {
	const [t] = useTranslation("counter");
	const { openSnackBar } = useContext(FloatingContext);
	const [users, setUsers] = useState(false);

	useEffect(() => {
		axios
			.get("/users/list")
			.then((response) => {
				if (response.data.success) {
					setUsers(response.data.users);
				} else {
					openSnackBar(response.data.error_code);
				}
			})
			.catch((error) => openSnackBar(error.message));
	}, []);

	return (
		<div id="menus">
			<TitleBar breadcrumbs={[]} title={t("users")} />
			<div className="content">
				{users ? (
					<div
						className="fooditems"
						style={{
							gridTemplateColumns: "repeat(auto-fill, 416px)",
						}}
					>
						{users.map((el) => (
							<UserItemMedium key={el.id} {...el} />
						))}
					</div>
				) : (
					<LinearProgress />
				)}
			</div>
		</div>
	);
};

export default Staffs;
