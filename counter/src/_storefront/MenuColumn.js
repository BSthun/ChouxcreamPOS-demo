import React from "react";
import { Box, LinearProgress } from "@material-ui/core";
import MenuFilterBar from "./MenuFilterBar";
import MenuItem from "./MenuItem";

const MenuColumn = ({ menus, setCarts }) => {
	return (
		<Box flex="1" overflow="scroll">
			{menus ? (
				<>
					<MenuFilterBar />
					<Box className="listmenus">
						{menus.map((el) => (
							<MenuItem key={el.id} {...el} setCarts={setCarts} />
						))}
					</Box>
				</>
			) : (
				<LinearProgress />
			)}
		</Box>
	);
};

export default MenuColumn;
