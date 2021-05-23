import React from "react";
import { Box, ButtonBase, makeStyles } from "@material-ui/core";

const TouchableRipple = ({ outerProps, innerProps, children, rounded }) => {
	const classes = useStyles();
	return (
		<Box className={rounded ? classes.rounded : ""} {...outerProps}>
			<ButtonBase className={classes.inner} {...innerProps}>
				{children}
			</ButtonBase>
		</Box>
	);
};

const useStyles = makeStyles((theme) => ({
	rounded: {
		borderRadius: 10,
		overflow: "hidden",
	},
	inner: {
		padding: theme.spacing(2),
		width: "100%",
		flexDirection: "column",
		alignItems: "stretch",
		"& .MuiTouchRipple-root": {
			zIndex: 200,
		},
	},
}));

export default TouchableRipple;
