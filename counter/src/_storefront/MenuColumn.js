import React from "react";
import { Box } from "@material-ui/core";
import MenuFilterBar from "./MenuFilterBar";
import MenuItem from "./MenuItem";

const MenuColumn = ({ menus, setCarts }) => {
	return (
		<Box flex="1" overflow="scroll">
			<MenuFilterBar />
			<Box className="listmenus">
				{menus.map((el) => (
					<MenuItem {...el} setCarts={setCarts} />
				))}
			</Box>
		</Box>
	);
};

export default MenuColumn;
