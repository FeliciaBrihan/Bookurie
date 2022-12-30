import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { dispatch } from 'store';
import {
	Button,
	ButtonGroup,
	Grid,
	IconButton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	useMediaQuery,
} from '@mui/material';

// third-party
import { sum } from 'lodash';

// project imports
import OrderSummary from './OrderSummary';
import { CartCheckoutStateProps, CartProductStateProps } from 'types/cart';
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// assets
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { openSnackbar } from 'store/slices/snackbar';

const prodImage = require.context('assets/images/e-commerce', true);

// ==============================|| CART - INCREMENT QUANTITY ||============================== //

interface IncrementProps {
	stock: number;
	typeFormat: string;
	itemId: string | number | undefined;
	quantity: number;
	updateQuantity: (id: string | number | undefined, quantity: number) => void;
}

const Increment = ({
	itemId,
	quantity,
	updateQuantity,
	stock,
	typeFormat,
}: IncrementProps) => {
	console.log(typeFormat);
	const [value, setValue] = useState(quantity);

	const incrementHandler = () => {
		setValue(value - 1);
		updateQuantity(itemId, value - 1);
	};

	const decrementHandler = () => {
		if (typeFormat === 'online') {
			dispatch(
				openSnackbar({
					open: true,
					message: 'Online Book! You can only buy one.',
					variant: 'alert',
					alert: {
						color: 'error',
					},
					close: true,
				})
			);
		} else {
			if (stock < value + 1) {
				dispatch(
					openSnackbar({
						open: true,
						message: 'No more stock',
						variant: 'alert',
						alert: {
							color: 'error',
						},
						close: true,
					})
				);
			} else {
				setValue(value + 1);
				updateQuantity(itemId, value + 1);
			}
		}
	};

	return (
		<ButtonGroup
			size="large"
			variant="text"
			color="inherit"
			sx={{ border: '1px solid', borderColor: 'grey.400' }}
		>
			<Button
				key="three"
				disabled={value <= 1}
				onClick={incrementHandler}
				sx={{ pr: 0.75, pl: 0.75, minWidth: '0px !important' }}
			>
				<RemoveIcon fontSize="inherit" />
			</Button>
			<Button key="two" sx={{ pl: 0.5, pr: 0.5 }}>
				{value}
			</Button>
			<Button
				key="one"
				onClick={decrementHandler}
				sx={{ pl: 0.75, pr: 0.75, minWidth: '0px !important' }}
			>
				<AddIcon fontSize="inherit" />
			</Button>
		</ButtonGroup>
	);
};

// ==============================|| CART - MAIN ||============================== //

interface CartProps {
	checkout: CartCheckoutStateProps;
	onNext: () => void;
	removeProduct: (id: string | number | undefined) => void;
	updateQuantity: (id: string | number | undefined, quantity: number) => void;
}

const Cart = ({
	checkout,
	onNext,
	removeProduct,
	updateQuantity,
}: CartProps) => {
	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
	const totalQuantity = sum(checkout.products.map((item) => item.quantity));
	const [rows, setRows] = useState(checkout.products);

	useEffect(() => {
		setRows(checkout.products);
	}, [checkout.products]);

	return (
		<Grid container spacing={gridSpacing}>
			<Grid item xs={12}>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Typography variant="subtitle1">Cart Item</Typography>
					<Typography variant="caption" sx={{ fontSize: '0.875rem' }}>
						({totalQuantity})
					</Typography>
				</Stack>
			</Grid>
			<Grid item xs={12}>
				<TableContainer>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead
							sx={{
								borderTop: '1px solid',
								color:
									theme.palette.mode === 'dark'
										? theme.palette.dark.light + 15
										: 'grey.200',
							}}
						>
							<TableRow>
								<TableCell>Book</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="center">Quantity</TableCell>
								<TableCell align="right">Total</TableCell>
								<TableCell align="right" />
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row: CartProductStateProps, index: number) => {
								console.log(row);
								return (
									<TableRow
										key={index}
										sx={{
											'&:last-of-type td, &:last-of-type th': { border: 0 },
										}}
									>
										<TableCell component="th" scope="row">
											<Grid container alignItems="center" spacing={2}>
												<Grid item>
													<Avatar
														size="md"
														variant="rounded"
														src={row.image ? prodImage(`./${row.image}`) : ''}
													/>
												</Grid>
												<Grid item>
													<Stack spacing={0}>
														<Typography variant="subtitle1">
															{row.title}
														</Typography>
														<Stack
															direction="row"
															alignItems="center"
															spacing={1}
														>
															<Typography
																variant="caption"
																sx={{ fontSize: '1rem' }}
															></Typography>
														</Stack>
													</Stack>
												</Grid>
											</Grid>
										</TableCell>
										<TableCell align="right">
											<Stack>
												<Typography variant="subtitle1">
													{row.price} RON
												</Typography>
											</Stack>
										</TableCell>
										<TableCell align="center">
											<Increment
												stock={row.stock}
												typeFormat={row.typeFormat}
												quantity={row.quantity}
												itemId={row.itemId}
												updateQuantity={updateQuantity}
											/>
										</TableCell>
										<TableCell align="right">
											{row.quantity && (
												<Typography variant="subtitle1">
													{row.price * row.quantity} RON
												</Typography>
											)}
										</TableCell>
										<TableCell align="right">
											<IconButton
												onClick={() => removeProduct(row.itemId)}
												size="large"
											>
												<DeleteTwoToneIcon sx={{ color: 'grey.500' }} />
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			<Grid item xs={12}>
				<OrderSummary checkout={checkout} />
			</Grid>
			<Grid item xs={12}>
				<Grid
					direction={matchDownMD ? 'column-reverse' : 'row'}
					container
					spacing={3}
					alignItems={matchDownMD ? '' : 'center'}
				>
					<Grid item xs={12} md={7} lg={8}>
						<Button
							component={Link}
							to="/dashboard"
							variant="text"
							startIcon={<KeyboardBackspaceIcon />}
						>
							Continue Shopping
						</Button>
					</Grid>
					<Grid item xs={12} md={5} lg={4}>
						<Stack spacing={gridSpacing}>
							<Button variant="contained" fullWidth onClick={onNext}>
								Check Out
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Cart;
