import * as React from 'react';

// material-ui
import { useTheme, Theme } from '@mui/material/styles';
import {
	Box,
	CardContent,
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
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'store';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {
	ArrangementOrder,
	EnhancedTableHeadProps,
	KeyedObject,
	GetComparator,
	HeadCell,
	EnhancedTableToolbarProps,
} from 'types';
import { raffleApi, deleteRaffle } from 'store/slices/raffle';
import { TGetRaffle } from 'types/raffle';

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
	array: TGetRaffle[],
	comparator: (a: TGetRaffle, b: TGetRaffle) => number
) {
	const stabilizedThis = array.map((el: TGetRaffle, index: number) => [
		el,
		index,
	]);
	stabilizedThis.sort((a, b) => {
		const el = comparator(a[0] as TGetRaffle, b[0] as TGetRaffle);
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
		align: 'left',
	},
	{
		id: 'createdAt',
		numeric: false,
		label: 'Date',
		align: 'left',
	},
	{
		id: 'BookId',
		numeric: true,
		label: 'Book Id',
		align: 'left',
	},
	{
		id: 'UserId',
		numeric: true,
		label: 'User Id',
		align: 'left',
	},
	{
		id: 'prize',
		numeric: true,
		label: 'Voucher',
		align: 'left',
	},
];

// ==============================|| TABLE HEADER ||============================== //

interface OrderListEnhancedTableHeadProps extends EnhancedTableHeadProps {
	theme: Theme;
	selected: number[];
	deleteHandler: () => void;
}

function EnhancedTableHead({
	onSelectAllClick,
	order,
	orderBy,
	numSelected,
	rowCount,
	onRequestSort,
	selected,
	deleteHandler,
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
							'aria-label': 'select all raffles',
						}}
					/>
				</TableCell>
				{numSelected > 0 && (
					<TableCell padding="none" colSpan={8}>
						<EnhancedTableToolbar
							numSelected={selected.length}
							onDeleteClick={deleteHandler}
						/>
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
			</TableRow>
		</TableHead>
	);
}

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({
	numSelected,
	onDeleteClick,
}: EnhancedTableToolbarProps) => (
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
				''
			</Typography>
		)}
		<Box sx={{ flexGrow: 1 }} />
		{numSelected > 0 && (
			<Tooltip title="Delete">
				<IconButton size="large" onClick={() => onDeleteClick?.()}>
					<DeleteIcon fontSize="small" />
				</IconButton>
			</Tooltip>
		)}
	</Toolbar>
);
// ==============================|| ORDER LIST ||============================== //

const RaffleList = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const [order, setOrder] = React.useState<ArrangementOrder>('asc');
	const [orderBy, setOrderBy] = React.useState<string>('id');
	const [selected, setSelected] = React.useState<number[]>([]);
	const [page, setPage] = React.useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
	const [search, setSearch] = React.useState<string>('');
	const [rows, setRows] = React.useState<TGetRaffle[]>([]);
	const { raffles } = useSelector((state) => state.raffle);

	React.useEffect(() => {
		dispatch(raffleApi.getAll());
	}, [dispatch]);
	React.useEffect(() => {
		setRows(raffles);
	}, [raffles]);
	const handleSearch = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
	) => {
		const newString = event?.target.value;
		setSearch(newString || '');

		if (newString) {
			const newRows = rows.filter((row: KeyedObject) => {
				let matches = true;

				const properties = ['id', 'UserId'];
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
			setRows(raffles);
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
				const newSelectedId = rows.map((n) => n.id);
				setSelected(newSelectedId);
			}
			return;
		}
		setSelected([]);
	};

	const handleClick = (
		event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
		id: number
	) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: number[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
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

	const handleDelete = (selectedItemsArray: number[]) => {
		selectedItemsArray.forEach((item) => {
			dispatch(deleteRaffle(item, { sync: true }));
			setSelected([]);
		});
	};

	const isSelected = (id: number) => selected.indexOf(id) !== -1;
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<MainCard title="Raffle List" content={false}>
			<CardContent>
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
							placeholder="Search Raffle"
							value={search}
							size="small"
						/>
					</Grid>
				</Grid>
			</CardContent>

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
						deleteHandler={() => handleDelete(selected)}
					/>
					<TableBody>
						{stableSort(rows, getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								/** Make sure no display bugs if row isn't an OrderData object */
								if (typeof row === 'number') return null;

								const isItemSelected = isSelected(row.id);
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
											onClick={(event) => handleClick(event, row.id)}
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
											onClick={(event) => handleClick(event, row.id)}
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
										<TableCell>
											{' '}
											{new Intl.DateTimeFormat('en-GB', {
												year: 'numeric',
												month: '2-digit',
												day: '2-digit',
												hour: '2-digit',
												minute: '2-digit',
												second: '2-digit',
											}).format(new Date(row.createdAt))}
										</TableCell>
										<TableCell>{row.BookId}</TableCell>
										<TableCell>{row.UserId}</TableCell>
										<TableCell>{row.prize} RON</TableCell>

										<TableCell sx={{ pr: 3 }} align="center"></TableCell>
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
		</MainCard>
	);
};

export default RaffleList;
