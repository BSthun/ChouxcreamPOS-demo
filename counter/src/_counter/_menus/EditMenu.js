import { useContext, useEffect, useState } from "react";
import { LinearProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { FloatingContext } from "../../context/FloatingContext";
import axios from "../../utils/instance/axios";
import { TitleBar } from "../bars/TitleBar";
import NewMenu from "./NewMenu";

const EditMenu = () => {
	const { id } = useParams();
	const { openSnackBar } = useContext(FloatingContext);
	const [t] = useTranslation("counter");
	const [edit, setEdit] = useState(null);

	useEffect(() => {
		axios
			.get(`/menus/item/${id}`)
			.then((response) => {
				if (response.data.success) {
					setEdit(response.data.menu);
				} else {
					openSnackBar(response.data.error_code);
				}
			})
			.catch((error) => openSnackBar(error.message));
	}, [id]);

	return edit ? (
		<NewMenu edit={edit} />
	) : (
		<div id="menus">
			<TitleBar
				breadcrumbs={[{ title: t("menus"), href: "/counter/menus" }]}
				title={`${t("editmenu")} #${id}`}
			/>
			<LinearProgress />
		</div>
	);
};

export default EditMenu;
