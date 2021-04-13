import React from "react";
import { Box, Button, Grid, IconButton, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import DelayLink from "../../utils/routing/DelayLink";

const ListingGridItem = ({ icon, title, viewmore, number, describe }) => {
	const [t] = useTranslation("counter");

	return (
		<Grid
			item
			xs={4}
			style={{ padding: "24px 36px" }}
			className="listing-griditem"
		>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography variant="body1">
					<FontAwesomeIcon icon={icon} />
					&nbsp; {title}
				</Typography>
				<DelayLink to={viewmore}>
					<Button variant="text">
						{t("viewmore")} &nbsp;
						<FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 12 }} />
					</Button>
				</DelayLink>
			</Box>
			<Typography variant="h4" color="textSecondary">
				{number}
			</Typography>
			<Typography variant="h6" color="textSecondary">
				{describe}
			</Typography>
		</Grid>
	);
};

export default ListingGridItem;
