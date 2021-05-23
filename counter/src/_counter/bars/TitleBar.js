import { Box, Breadcrumbs, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const TitleBar = ({ breadcrumbs, title, children }) => {
	const [t] = useTranslation("counter");

	return (
		<Box height="64px">
			<div className="c-counter-titlebar">
				<Breadcrumbs aria-label="breadcrumb">
					{[
						{ title: t("frontpage"), href: "/" },
						{ title: t("counter"), href: "/counter" },
						...breadcrumbs,
					].map((el) => (
						<Link to={el.href} key={el.href}>
							{el.title}
						</Link>
					))}
					<Typography color="textPrimary" component="h1">
						{title}
					</Typography>
				</Breadcrumbs>
				<div className="items">{children}</div>
			</div>
		</Box>
	);
};

const TitleBarItem = ({ children }) => {
	return <div className="c-counter-appbar--item">{children}</div>;
};

export { TitleBar, TitleBarItem };
