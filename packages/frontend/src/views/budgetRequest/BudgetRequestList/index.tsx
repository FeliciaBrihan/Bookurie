import * as React from 'react';

// material-ui
import { useTheme, Theme } from '@mui/material/styles';
import {
	Box,
	Checkbox,
	Grid,
	IconButton,
	InputAdornment,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	TextField,
	Toolbar,
	Tooltip,
	Typography,
	Fab,
	Button,
	Popover,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import AddIcon from '@mui/icons-material/AddTwoTone';

// project imports
import Chip from 'ui-component/extended/Chip';
import { useDispatch, useSelector } from 'store';
import { budgetRequestApi } from 'store/slices/budgetRequest';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
	ArrangementOrder,
	EnhancedTableHeadProps,
	KeyedObject,
	GetComparator,
	HeadCell,
	EnhancedTableToolbarProps,
} from 'types';
import { TGetBudgetRequest } from 'types/budgetRequest';
import BudgetRequestAdd from './BudgetRequestAdd';
import BudgetRequestDetails from './BudgetRequestDetails';
import BudgetRequestEdit from './BudgetRequestEdit';
import BudgetRequestSetApprovals from './BudgetRequestSetApprovals';
import {
	TEnumBudgetRequestStatus as Status,
	TEnumBudgetRequestStatus as TStatus,
} from 'types/budgetRequestStatus';
import AnimateButton from 'ui-component/extended/AnimateButton';

// table sort
function descendingComparator(a: KeyedObject, b: KeyedObject, orderBy: string) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}
const getComparator: GetComparator = (order, orderBy) =>
	order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(
	array: TGetBudgetRequest[],
	comparator: (a: TGetBudgetRequest, b: TGetBudgetRequest) => number
) {
	const stabilizedThis = array.map((el: TGetBudgetRequest, index: number) => [
		el,
		index,
	]);
	stabilizedThis.sort((a, b) => {
		const el = comparator(a[0] as TGetBudgetRequest, b[0] as TGetBudgetRequest);
		if (el !== 0) return el;
		return (a[1] as number) - (b[1] as number);
	});
	return stabilizedThis.map((el) => el[0]);
}

// table header options

const headCells: HeadCell[] = [
	{
		id: 'id',
		numeric: true,
		label: 'ID',
		align: 'center',
	},
	{
		id: 'title',
		numeric: false,
		label: 'Title',
		align: 'left',
	},
	{
		id: 'details',
		numeric: false,
		label: 'Details',
		align: 'left',
	},
	{
		id: 'type',
		numeric: false,
		label: 'Payment Type',
		align: 'left',
	},
	{
		id: 'price',
		numeric: true,
		label: 'Amount',
		align: 'left',
	},
	{
		id: 'currency',
		numeric: false,
		label: 'Currency',
		align: 'left',
	},
	{
		id: 'status',
		numeric: false,
		label: 'Status',
		align: 'left',
	},
	// {
	// 	id: 'approval',
	// 	numeric: false,
	// 	label: 'Approval',
	// 	align: 'left',
	// },
];

// ==============================|| TABLE HEADER ||============================== //

interface OrderListEnhancedTableHeadProps extends EnhancedTableHeadProps {
	theme: Theme;
	selected: string[];
}

function EnhancedTableHead({
	onSelectAllClick,
	order,
	orderBy,
	numSelected,
	rowCount,
	onRequestSort,
	theme,
	selected,
}: OrderListEnhancedTableHeadProps) {
	const createSortHandler =
		(property: string) => (event: React.SyntheticEvent<Element, Event>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox" sx={{ pl: 3 }}>
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts',
						}}
					/>
				</TableCell>
				{numSelected > 0 && (
					<TableCell padding="none" colSpan={8}>
						<EnhancedTableToolbar numSelected={selected.length} />
					</TableCell>
				)}
				{numSelected <= 0 &&
					headCells.map((headCell) => (
						<TableCell
							key={headCell.id}
							align={headCell.align}
							padding={headCell.disablePadding ? 'none' : 'normal'}
							sortDirection={orderBy === headCell.id ? order : false}
						>
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
							>
								{headCell.label}
								{orderBy === headCell.id ? (
									<Box component="span" sx={visuallyHidden}>
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						</TableCell>
					))}
				{numSelected <= 0 && (
					<TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
						<Typography
							variant="subtitle1"
							sx={{
								color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
							}}
						>
							Action
						</Typography>
					</TableCell>
				)}
			</TableRow>
		</TableHead>
	);
}

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }: EnhancedTableToolbarProps) => (
	<Toolbar
		sx={{
			p: 0,
			pl: 1,
			pr: 1,
			...(numSelected > 0 && {
				color: (theme) => theme.palette.secondary.main,
			}),
		}}
	>
		{numSelected > 0 ? (
			<Typography color="inherit" variant="h4">
				{numSelected} Selected
			</Typography>
		) : (
			<Typography variant="h6" id="tableTitle">
				Nutrition
			</Typography>
		)}
		<Box sx={{ flexGrow: 1 }} />
		{numSelected > 0 && (
			<Tooltip title="Delete">
				<IconButton size="large">
					<DeleteIcon fontSize="small" />
				</IconButton>
			</Tooltip>
		)}
	</Toolbar>
);

interface ButtonConfirmProps {
	id: number;
	color: 'success' | 'error' | 'warning';
	label: string;
	callback: () => {};
}
const ButtonConfirm = (props: ButtonConfirmProps) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null
	);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleConfirm = () => {
		setAnchorEl(null);
		props.callback();
	};

	return (
		<AnimateButton>
			<Button
				variant="outlined"
				color={props.color}
				onClick={handleClick}
				aria-describedby={`action-${props.id}`}
				size="small"
			>
				{props.label}
			</Button>
			<Popover
				id={`action-${props.id}`}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
			>
				<Button variant="contained" color="primary" onClick={handleConfirm}>
					Confirm
				</Button>
			</Popover>
		</AnimateButton>
	);
};

const statusColor: { [x: number]: string } = {
	[TStatus.Pending]: 'primary',
	[TStatus.InProgress]: 'warning',
	[TStatus.OnHold]: 'warning',
	[TStatus.Approved]: 'success',
	[TStatus.Rejected]: 'error',
};

// ==============================|| ORDER LIST ||============================== //

const BudgetRequestList = ({
	params,
	title,
}: {
	params?: { include: 'own' } | { type: 'approval' };
	title: string;
}) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const [order, setOrder] = React.useState<ArrangementOrder>('asc');
	const [orderBy, setOrderBy] = React.useState<string>('calories');
	const [selected, setSelected] = React.useState<string[]>([]);
	const [page, setPage] = React.useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
	const [search, setSearch] = React.useState<string>('');
	const [rows, setRows] = React.useState<TGetBudgetRequest[]>([]);
	const [rowData, setRowData] = React.useState<TGetBudgetRequest | undefined>(
		undefined
	);
	const [openCreate, setOpenCreate] = React.useState(false);
	const [openDetails, setOpenDetails] = React.useState(false);
	const [openEdit, setOpenEdit] = React.useState(false);
	const [openSetApproval, setOpenSetApproval] = React.useState(false);
	const { requests } = useSelector((state) => state.budgetRequest);

	React.useEffect(() => {
		dispatch(budgetRequestApi.getAll(params));
	}, [dispatch]);
	React.useEffect(() => {
		setRows(requests);
	}, [requests]);

	const handleSave = (id: number, data: { statusId: Status }) => async () => {
		await budgetRequestApi.approve(id, data, {
			sync: true,
			params,
		});
		handleCloseDialog();
	};

	const handleSearch = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
	) => {
		const newString = event?.target.value;
		setSearch(newString || '');

		if (newString) {
			const newRows = rows.filter((row: KeyedObject) => {
				let matches = true;

				const properties = ['name', 'company', 'type', 'qty', 'id'];
				let containsQuery = false;

				properties.forEach((property) => {
					if (
						row[property]
							.toString()
							.toLowerCase()
							.includes(newString.toString().toLowerCase())
					) {
						containsQuery = true;
					}
				});

				if (!containsQuery) {
					matches = false;
				}
				return matches;
			});
			setRows(newRows);
		} else {
			setRows(requests);
		}
	};

	const handleRequestSort = (
		event: React.SyntheticEvent<Element, Event>,
		property: string
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			if (selected.length > 0) {
				setSelected([]);
			} else {
				const newSelectedId = rows.map((n) => n.title);
				setSelected(newSelectedId);
			}
			return;
		}
		setSelected([]);
	};

	const handleClick = (
		event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
		name: string
	) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
	) => {
		event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
		setPage(0);
	};

	const handleCloseDialog = () => {
		setOpenCreate(false);
	};

	const handleClickOpenDialog = () => {
		setOpenCreate(true);
	};

	const handleCloseDetails = () => {
		setOpenDetails(false);
	};

	const handleOpenDetails = (row: TGetBudgetRequest) => () => {
		setRowData(row);
		setOpenDetails(true);
	};

	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const handleOpenEdit = (row: TGetBudgetRequest) => () => {
		setRowData(row);
		setOpenEdit(true);
	};

	const handleCloseSetApproval = () => {
		setOpenSetApproval(false);
	};

	const handleOpenSetApproval = (row: TGetBudgetRequest) => () => {
		setRowData(row);
		setOpenSetApproval(true);
	};

	const isSelected = (name: string) => selected.indexOf(name) !== -1;
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box>
			<Typography
				variant="subtitle1"
				sx={{ marginBottom: '20px', fontSize: '1.125rem' }}
			>{`${title} (${requests.length})`}</Typography>
			<Grid
				container
				justifyContent="space-between"
				alignItems="center"
				spacing={2}
			>
				<Grid item xs={12} sm={6}>
					<TextField
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon fontSize="small" />
								</InputAdornment>
							),
						}}
						onChange={handleSearch}
						placeholder="Search Order"
						value={search}
						size="small"
					/>
				</Grid>
				<Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
					<Tooltip title="Add Product">
						<Fab
							color="primary"
							size="small"
							onClick={handleClickOpenDialog}
							sx={{
								boxShadow: 'none',
								ml: 1,
								width: 32,
								height: 32,
								minHeight: 32,
							}}
						>
							<AddIcon fontSize="small" />
						</Fab>
					</Tooltip>
				</Grid>
			</Grid>

			{/* table */}
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
					<EnhancedTableHead
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={rows.length}
						theme={theme}
						selected={selected}
					/>
					<TableBody>
						{stableSort(rows, getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								/** Make sure no display bugs if row isn't an OrderData object */
								if (typeof row === 'number') return null;

								const isItemSelected = isSelected(row.title);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={index}
										selected={isItemSelected}
									>
										<TableCell
											padding="checkbox"
											sx={{ pl: 3 }}
											onClick={(event) => handleClick(event, row.title)}
										>
											<Checkbox
												color="primary"
												checked={isItemSelected}
												inputProps={{
													'aria-labelledby': labelId,
												}}
											/>
										</TableCell>
										<TableCell
											component="th"
											id={labelId}
											scope="row"
											onClick={(event) => handleClick(event, row.title)}
											sx={{ cursor: 'pointer' }}
										>
											<Typography
												variant="subtitle1"
												sx={{
													color:
														theme.palette.mode === 'dark'
															? 'grey.600'
															: 'grey.900',
												}}
											>
												#{row.id}
											</Typography>
										</TableCell>
										<TableCell
											component="th"
											id={labelId}
											scope="row"
											onClick={(event) => handleClick(event, row.title)}
											sx={{ cursor: 'pointer' }}
										>
											<Typography
												variant="subtitle1"
												sx={{
													color:
														theme.palette.mode === 'dark'
															? 'grey.600'
															: 'grey.900',
												}}
											>
												{row.title}
											</Typography>
										</TableCell>
										<TableCell>{row.details}</TableCell>
										<TableCell>{row.PaymentType.name}</TableCell>
										<TableCell align="right">{row.price}</TableCell>
										<TableCell>{row.Currency.name}</TableCell>
										<TableCell>
											<Chip
												label={row.BudgetRequestStatus.name}
												size="small"
												chipcolor={statusColor[row.BudgetRequestStatus.id]}
											/>
										</TableCell>
										<TableCell align="center" sx={{ pr: 3 }}>
											<Box
												display="flex"
												flexDirection="row"
												flexWrap="nowrap"
												alignItems="center"
												justifyContent="center"
											>
												<IconButton
													color="primary"
													size="large"
													onClick={handleOpenDetails(row)}
												>
													<VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
												</IconButton>
												{row.RequestByUser.email ===
													localStorage.getItem('email') &&
													row.BudgetRequestStatus.id === Status.Pending && (
														<IconButton
															color="secondary"
															size="large"
															onClick={handleOpenEdit(row)}
														>
															<EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
														</IconButton>
													)}
												{![TStatus.Approved, TStatus.Rejected].includes(
													row.BudgetRequestStatus.id
												) && (
													<IconButton
														color="secondary"
														size="large"
														onClick={handleOpenSetApproval(row)}
													>
														<SupervisorAccountIcon
															sx={{ fontSize: '1.3rem' }}
														/>
													</IconButton>
												)}
												{window.location.hash.includes('#my-approvals') && (
													<>
														<ButtonConfirm
															id={row.id}
															label="Accept"
															color="success"
															callback={handleSave(row.id, {
																statusId: TStatus.Approved,
															})}
														/>
														<ButtonConfirm
															id={row.id}
															label="Reject"
															color="error"
															callback={handleSave(row.id, {
																statusId: TStatus.Rejected,
															})}
														/>
														<ButtonConfirm
															id={row.id}
															label="On Hold"
															color="warning"
															callback={handleSave(row.id, {
																statusId: TStatus.OnHold,
															})}
														/>
													</>
												)}
											</Box>
										</TableCell>
									</TableRow>
								);
							})}
						{emptyRows > 0 && (
							<TableRow
								style={{
									height: 53 * emptyRows,
								}}
							>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
				{openDetails && (
					<BudgetRequestDetails
						handleCloseDialog={handleCloseDetails}
						budgetRequestId={rowData?.id!}
						params={params}
					/>
				)}
				{openEdit && (
					<BudgetRequestEdit
						handleCloseDialog={handleCloseEdit}
						budgetRequestId={rowData?.id!}
						params={params}
					/>
				)}
				{openCreate && (
					<BudgetRequestAdd
						handleCloseDialog={handleCloseDialog}
						params={params}
					/>
				)}
				{openSetApproval && (
					<BudgetRequestSetApprovals
						budgetRequestId={rowData?.id!}
						params={params}
						handleCloseDialog={handleCloseSetApproval}
					/>
				)}
			</TableContainer>

			{/* table pagination */}
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	);
};

export default BudgetRequestList;
