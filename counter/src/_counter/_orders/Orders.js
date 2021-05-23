import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Avatar,
	Box,
	Button,
	Card,
	LinearProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FloatingContext } from "../../context/FloatingContext";
import axios from "../../utils/instance/axios";
import DelayLink from "../../utils/routing/DelayLink";
import { TitleBar } from "../bars/TitleBar";
import moment from "moment";

const Orders = () => {
	const [t] = useTranslation("counter");
	const { openSnackBar } = useContext(FloatingContext);
	const [orders, setOrders] = useState(false);

	useEffect(() => {
		axios
			.get("/orders/list")
			.then((response) => {
				if (response.data.success) {
					setOrders(response.data.orders);
				} else {
					openSnackBar(response.data.error_code);
				}
			})
			.catch((error) => openSnackBar(error.message));
	}, []);

	return (
		<Box id="orders">
			<TitleBar breadcrumbs={[]} title={t("orders")} />

			{orders ? (
				<Box margin="24px auto" maxWidth="1024px">
					<Card elevation={2}>
						<TableContainer>
							<Table stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
										<TableCell>ID</TableCell>
										<TableCell>Menus</TableCell>
										<TableCell align="right">Total</TableCell>
										<TableCell align="right">Timestamp</TableCell>
										<TableCell align="right">Biller</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{orders.map((el) => (
										<TableRow hover role="checkbox" tabIndex={-1}>
											<TableCell>{el.id}</TableCell>
											<TableCell>
												<AvatarGroup max={4}>
													{el.menus.split(",").map((menuEl) => (
														<Avatar
															src={`${axios.baseURL}/menus/image/${menuEl}`}
														/>
													))}
												</AvatarGroup>
											</TableCell>
											<TableCell align="right">${el.total}</TableCell>
											<TableCell align="right">
												{new moment(el.timestamp).format("LLL")}
											</TableCell>
											<TableCell align="right">{el.biller}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Card>
				</Box>
			) : (
				<LinearProgress />
			)}
		</Box>
	);
};

export default Orders;
