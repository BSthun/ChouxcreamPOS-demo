import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	typography: {
		fontFamily: [
			"NotoSans",
			"NotoSansThai",
			"Arial",
			"Roboto",
			'"Helvetica Neue"',
			"sans-serif",
		].join(","),
	},
	shape: {
		borderRadius: 10,
	},
});

export default theme;
