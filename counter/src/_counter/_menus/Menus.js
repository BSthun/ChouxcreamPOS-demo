import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Fab, LinearProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { TitleBar } from "../bars/TitleBar";
import DelayLink from "../../utils/routing/DelayLink";
import FoodItemMedium from "../fooditems/FoodItemMedium";
import MenuFilterBar from "./MenuFilterBar";

const Menus = () => {
	const [t] = useTranslation("counter");

	const [menus, setMenus] = useState(false);

	useEffect(() => {
		axios
			.get("https://dp-chxpos-mockapi.bsthun.com/counter/menus/lists.json")
			.then((res) => {
				setMenus(res);
			})
			.catch((err) => {
				alert(`Unable to load menu data, please try again later.\n${err}`);
			});
	}, []);

	return (
		<div id="menus">
			<TitleBar breadcrumbs={[]} title={t("menus")} />
			<div className="content">
				{menus ? (
					<>
						<MenuFilterBar />
						<div className="fooditems">
							{menus.data.map((el) => (
								<FoodItemMedium
									key={el.id}
									title={el.title}
									img={el.images.banner}
									price={`$${el.meta.price}`}
									today={el.meta.today}
									stock={el.meta.stock}
									rating={el.meta.rating}
									edit={void 0}
								/>
							))}
						</div>
					</>
				) : (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						margin="48px 0 0 0"
					>
						<Box width="500px">
							<LinearProgress />
						</Box>
					</Box>
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
