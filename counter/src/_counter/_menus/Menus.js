import { useContext, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Fab, LinearProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import axios from "../../utils/instance/axios";

import { TitleBar } from "../bars/TitleBar";
import DelayLink from "../../utils/routing/DelayLink";
import FoodItemMedium from "../fooditems/FoodItemMedium";
import MenuFilterBar from "../../_storefront/MenuFilterBar";
import { FloatingContext } from "../../context/FloatingContext";

const Menus = () => {
	const [t] = useTranslation("counter");
	const { openSnackBar } = useContext(FloatingContext);

	const [menus, setMenus] = useState(false);

	useEffect(() => {
		axios
			.get("/menus/list")
			.then((response) => {
				if (response.data.success) {
					setMenus(response.data.menus);
				} else {
					openSnackBar(response.data.error_code);
				}
			})
			.catch((error) => openSnackBar(error.message));
	}, []);

	return (
		<div id="menus">
			<TitleBar breadcrumbs={[]} title={t("menus")} />
			<div className="content">
				{menus ? (
					<div className="fooditems">
						{menus.map((el) => (
							<FoodItemMedium
								key={el.id}
								id={el.id}
								name={el.name}
								price={`$${el.price}`}
								today={`1`}
								stock={el.stock}
								category={el.category}
							/>
						))}
					</div>
				) : (
					<LinearProgress />
				)}
			</div>
			<DelayLink to="/counter/menus/new">
				<Fab variant="extended">
					<FontAwesomeIcon icon={faPlus} />
					{t("newmenu")}
				</Fab>
			</DelayLink>
		</div>
	);
};

export default Menus;
