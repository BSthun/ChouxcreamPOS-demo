import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Avatar,
	Box,
	Button,
	Card,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import React from "react";
import { useTranslation } from "react-i18next";
import DelayLink from "../../utils/routing/DelayLink";
import { TitleBar } from "../bars/TitleBar";

const columns = [
	{
		label: "Order ID",
		id: "orderid",
		align: "right",
		minWidth: 20,
	},
	{
		id: "time",
		label: "Time",
		align: "right",
		minWidth: 30,
	},
	{
		id: "paid",
		label: "Paid",
		align: "right",
		minWidth: 50,
	},
	{
		id: "menus",
		label: "Menus",
		align: "left",
		minWidth: 100,
	},
	{
		id: "staff",
		label: "Staff",
		align: "left",
		minWidth: 30,
	},
];

const rows = [
	{
		orderid: 10020,
		time: "24 Jan 2021",
		paid: "$24",
		menus: (
			<AvatarGroup max={4}>
				<Avatar alt="A" src="broken" />
				<Avatar alt="A" src="broken" />
				<Avatar alt="A" src="broken" />
				<Avatar alt="A" src="broken" />
			</AvatarGroup>
		),
		staff: <Avatar alt="A" src="broken" />,
	},
	{
		orderid: 10019,
		time: "24 Jan 2021",
		paid: "$26",
		menus: (
			<AvatarGroup max={4}>
				<Avatar alt="A" src="broken" />
				<Avatar alt="A" src="broken" />
			</AvatarGroup>
		),
		staff: <Avatar alt="A" src="broken" />,
	},
	{
		orderid: 10018,
		time: "24 Jan 2021",
		paid: "$32",
		paid: 32,
		menus: (
			<AvatarGroup max={4}>
				<Avatar alt="A" src="broken" />
			</AvatarGroup>
		),
		staff: <Avatar alt="A" src="broken" />,
	},
	{
		orderid: 10017,
		time: "24 Jan 2021",
		paid: "$42",
		menus: (
			<AvatarGroup max={4}>
				<Avatar alt="A" src="broken" />
				<Avatar alt="A" src="broken" />
				<Avatar alt="A" src="broken" />
				<Avatar alt="A" src="broken" />
				<Avatar alt="A" src="broken" />
				<Avatar alt="A" src="broken" />
			</AvatarGroup>
		),
		staff: <Avatar alt="A" src="broken" />,
	},
];

const Orders = () => {
	const [t] = useTranslation("counter");

	return (
		<Box id="orders">
			<TitleBar breadcrumbs={[]} title={t("orders")} />

			<Box margin="24px auto" maxWidth="1024px">
				<Card elevation={2}>
					<TableContainer>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									{columns.map((el) => (
										<TableCell
											key={Math.random()}
											align={el.align}
											style={{ minWidth: el.minWidth }}
										>
											{el.label}
										</TableCell>
									))}
									<TableCell
										align="right"
										style={{ width: "110px" }}
									></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => {
									return (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={row.orderid}
										>
											{columns.map((column) => {
												return (
													<TableCell key={column.id} align={column.align}>
														{row[column.id]}
													</TableCell>
												);
											})}
											<TableCell align="right">
												<DelayLink to={`/counter/orders/order/${row.orderid}`}>
													<Button>
														{t("viewmore")} &nbsp;
														<FontAwesomeIcon
															style={{ fontSize: 12 }}
															icon={faChevronRight}
														/>
													</Button>
												</DelayLink>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Card>
			</Box>
		</Box>
	);
};

export default Orders;
