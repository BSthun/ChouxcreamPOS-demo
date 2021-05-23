import React from "react";
import { Avatar, Box, ButtonBase, Typography } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
import moment from "moment";

import TouchableRipple from "../../components/TouchableRipple";
import axios from "../../utils/instance/axios";

const RecentOrderItem = ({ id, menus, total, timestamp, biller }) => {
	const [t] = useTranslation("counter");

	return (
		<TouchableRipple>
			<Box display="flex" flexDirection="column">
				<Typography color="textSecondary" align="left">
					{`${t("item")} #${id}`}
				</Typography>
				<Box display="flex" justifyContent="space-between">
					<Box display="flex" flexDirection="column" alignItems="flex-start">
						<Typography>{new moment(timestamp).format("LLL")}</Typography>
						<Typography>{`${t("paid")} $${total} by ${biller}`} </Typography>
					</Box>
					<AvatarGroup max={4}>
						{menus.split(",").map((el) => (
							<Avatar src={`${axios.baseURL}/menus/image/${el}`} />
						))}
					</AvatarGroup>
				</Box>
			</Box>
		</TouchableRipple>
	);
};

export default RecentOrderItem;
