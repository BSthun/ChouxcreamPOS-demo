import React from "react";
import { Avatar, Box, ButtonBase, Typography } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { useTranslation } from "react-i18next";

import TouchableRipple from "../../components/TouchableRipple";

const RecentOrderItem = ({ orderno, table, paid, foods }) => {
	const [t] = useTranslation("counter");

	return (
		<TouchableRipple>
			<Box display="flex" flexDirection="column">
				<Typography color="textSecondary" align="left">
					{`${t("item")} #${orderno}`}
				</Typography>
				<Box display="flex" justifyContent="space-between">
					<Box display="flex" flexDirection="column" alignItems="flex-start">
						<Typography>{`${t("table")} ${table}`}</Typography>
						<Typography>{`${t("paid")} $${paid}`}</Typography>
					</Box>
					<AvatarGroup max={4}>
						{foods.map((el) => (
							<Avatar
								key={Math.random()}
								alt={el.name}
								src={el.img ? el.img : "broken"}
							/>
						))}
					</AvatarGroup>
				</Box>
			</Box>
		</TouchableRipple>
	);
};

export default RecentOrderItem;
