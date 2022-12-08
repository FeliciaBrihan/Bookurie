import * as React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme, Theme } from '@mui/material/styles';
import {
	CardContent,
	Checkbox,
	Fab,
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

// third-party
// import { format } from 'date-fns';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Avatar from 'ui-component/extended/Avatar';
import Chip from 'ui-component/extended/Chip';
import { TGetBook } from 'types/book';
import {
	ArrangementOrder,
	GetComparator,
	HeadCell,
	EnhancedTableHeadProps,
	EnhancedTableToolbarProps,
	KeyedObject,
} from 'types';
import { useDispatch, useSelector } from 'store';
import BookAdd from './BookAdd';
import BookDetails from './BookDetails';
import BookEdit from './BookEdit';
import { bookApi } from 'store/slices/book';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
// import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

const prodImage = require.context('assets/images/e-commerce', true);

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
	array: TGetBook[],
	comparator: (a: TGetBook, b: TGetBook) => number
) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0] as TGetBook, b[0] as TGetBook);
		if (order !== 0) return order;
		return (a[1] as number) - (b[1] as number);
	});
	return stabilizedThis.map((el) => el[0]);
}

// table header options
const headCells: HeadCell[] = [
	{
		id: 'id',
		numeric: true,
		label: '#',
		align: 'center',
	},
	{
		id: 'title',
		numeric: false,
		label: 'Title',
		align: 'left',
	},
	{
		id: 'author',
		numeric: false,
		label: 'Author',
		align: 'left',
	},
	{
		id: 'price',
		numeric: true,
		label: 'Price',
		align: 'left',
	},
	{
		id: 'stock',
		numeric: true,
		label: 'Status',
		align: 'center',
	},
];

// ==============================|| TABLE HEADER ||============================== //

interface ProEnhancedTableHeadProps extends EnhancedTableHeadProps {
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
}: ProEnhancedTableHeadProps) {
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
							'aria-label': 'select all books',
						}}
					/>
				</TableCell>
				{numSelected > 0 && (
					<TableCell padding="none" colSpan={7}>
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
									<Typography component="span" sx={{ display: 'none' }}>
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Typography>
								) : null}
							</TableSortLabel>
						</TableCell>
					))}
				{numSelected <= 0 && (
					<TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
						<Typography
							variant="subtitle1"
							sx={{
								color:
									theme.palette.mode === 'dark'
										? theme.palette.grey[600]
										: 'grey.900',
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
			pl: 2,
			pr: 1,
			color: numSelected > 0 ? 'secondary.main' : 'inherit',
		}}
	>
		{numSelected > 0 ? (
			<Typography
				sx={{ flex: '1 1 100%' }}
				color="inherit"
				variant="h4"
				component="div"
			>
				{numSelected} Selected
			</Typography>
		) : (
			<Typography
				sx={{ flex: '1 1 100%' }}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				Nutrition
			</Typography>
		)}

		{numSelected > 0 && (
			<Tooltip title="Delete">
				<IconButton size="large">
					<DeleteIcon fontSize="small" />
				</IconButton>
			</Tooltip>
		)}
	</Toolbar>
);

// ==============================|| PRODUCT LIST ||============================== //

const ProductList = () => {
	const theme = useTheme();
	const dispatch = useDispatch();

	const [order, setOrder] = React.useState<ArrangementOrder>('asc');
	const [orderBy, setOrderBy] = React.useState<string>('id');
	const [selected, setSelected] = React.useState<string[]>([]);
	const [page, setPage] = React.useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
	const [search, setSearch] = React.useState<string>('');
	const [rows, setRows] = React.useState<TGetBook[]>([]);
	const [openCreate, setOpenCreate] = React.useState(false);
	const [openDetails, setOpenDetails] = React.useState(false);
	const [openEdit, setOpenEdit] = React.useState(false);
	const [rowData, setRowData] = React.useState<TGetBook | undefined>(undefined);
	const { books } = useSelector((state) => state.book);

	React.useEffect(() => {
		dispatch(bookApi.getAll());
	}, []);

	React.useEffect(() => {
		setRows(books);
	}, [books]);

	const handleSearch = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
	) => {
		const newString = event?.target.value;
		setSearch(newString || '');

		if (newString) {
			const newRows = rows?.filter((row: KeyedObject) => {
				let matches = true;

				const properties = ['title', 'author'];
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
			setRows(books);
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
			const newSelectedId = rows?.map((n) => n.title);
			setSelected(newSelectedId!);
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

	const handleOpenDetails = (row: TGetBook) => () => {
		setRowData(row);
		setOpenDetails(true);
	};

	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const handleOpenEdit = (row: TGetBook) => () => {
		setRowData(row);
		setOpenEdit(true);
	};

	const isSelected = (name: string) => selected.indexOf(name) !== -1;
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<MainCard title="Book List" content={false}>
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
							placeholder="Search Book"
							value={search}
							size="small"
						/>
					</Grid>
					<Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
						{/* product add & dialog */}
						<Tooltip title="Add Book">
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
					/>
					<TableBody>
						{stableSort(rows, getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
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
											align="center"
											component="th"
											id={labelId}
											scope="row"
											onClick={(event) => handleClick(event, row.title)}
											sx={{ cursor: 'pointer' }}
										>
											<Avatar
												src={row.coverImage && prodImage(`./${row.coverImage}`)}
												size="md"
												variant="rounded"
											/>
										</TableCell>
										<TableCell
											component="th"
											id={labelId}
											scope="row"
											sx={{ cursor: 'pointer' }}
										>
											<Typography
												component={Link}
												to={`/books/${row.id}`}
												variant="subtitle1"
												sx={{
													color:
														theme.palette.mode === 'dark'
															? theme.palette.grey[600]
															: 'grey.900',
													textDecoration: 'none',
												}}
											>
												{row.title}
											</Typography>
										</TableCell>
										<TableCell align="left">{row.author}</TableCell>
										<TableCell align="left">{row.price} RON</TableCell>
										<TableCell align="center">
											{row.typeFormat === 'printed' ? (
												<Chip
													size="small"
													label={
														row.stock ? `In Stock ${row.stock}` : 'Out of Stock'
													}
													chipcolor={row.stock ? 'success' : 'error'}
													sx={{
														borderRadius: '4px',
														textTransform: 'capitalize',
													}}
												/>
											) : (
												<Chip
													size="small"
													label={`In Stock`}
													chipcolor={'success'}
													sx={{
														borderRadius: '4px',
														textTransform: 'capitalize',
													}}
												/>
											)}
										</TableCell>
										<TableCell sx={{ pr: 3 }} align="center">
											<IconButton
												color="primary"
												size="large"
												onClick={handleOpenDetails(row)}
											>
												<VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
											</IconButton>
											<IconButton
												color="secondary"
												size="large"
												onClick={handleOpenEdit(row)}
											>
												<EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
											</IconButton>
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
					<BookDetails handleCloseDialog={handleCloseDetails} data={rowData!} />
				)}
				{openEdit && (
					<BookEdit handleCloseDialog={handleCloseEdit} data={rowData!} />
				)}
				{openCreate && (
					<BookAdd open={true} handleCloseDialog={handleCloseDialog} />
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
		</MainCard>
	);
};

export default ProductList;
