import React from "react";
import PropTypes from "prop-types";
import { Chip, Fab, TextField } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MenuFilterBar = (props) => {
	const [t] = useTranslation("counter");

	return (
		<div className="c-counter-menu-filterbar">
			<div>
				<FontAwesomeIcon icon={faFilter} />
				<Chip label={t("food")} />
				<Chip label={t("drink")} />
				<Chip label={t("snack")} />
			</div>
			<div>
				<FontAwesomeIcon icon={faSearch} />
				<TextField
					id="standard-basic"
					label="Search"
					margin="dense"
					variant="outlined"
				/>
			</div>
		</div>
	);
};

MenuFilterBar.propTypes = {};

export default MenuFilterBar;
