import { useNavigate } from 'react-router-dom';

// material-ui
import {
	Button,
	// ButtonGroup,
	Divider,
	Grid,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material';

// third-party
import {
	useFormik,
	Form,
	FormikProvider,
	// useField,
	// FieldHookConfig,
} from 'formik';
import * as yup from 'yup';

// project imports
import Chip from 'ui-component/extended/Chip';
import { TGetBook } from 'types/book';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch, useSelector } from 'store';
import { addProduct } from 'store/slices/cart';
import { create, getUserLoans } from 'store/slices/loan';
// import { getProduct } from 'store/slices/book';

// assets
('@mui/icons-material/StarBorderTwoTone');
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { LOAN_DISCOUNT } from 'constant';
import { useEffect, useState } from 'react';
import { TGetPurchase } from 'types/purchase';
import { getUserPurchases } from 'store/slices/purchase';
import { TGetLoan } from 'types/loan';

const validationSchema = yup.object({
	color: yup.string().required('Color selection is required'),
	size: yup.number().required('Size selection is required.'),
});

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ product }: { product: TGetBook }) => {
	const dispatch = useDispatch();
	const history = useNavigate();

	const createLoan = async () => {
		await dispatch(create(product.id));
	};

	const cart = useSelector((state) => state.cart);
	const { subscription } = useSelector((state) => state.subscription);
	const [purchases, setPurchases] = useState<TGetPurchase[]>([]);
	const purchasesState = useSelector((state) => state.purchase);
	const [loans, setLoans] = useState<TGetLoan[]>([]);
	const loansState = useSelector((state) => state.loan);
	const [wasBorrowed, setWasBorrowed] = useState<boolean>(false);

	useEffect(() => {
		dispatch(getUserPurchases());
		dispatch(getUserLoans());
	}, []);

	useEffect(() => {
		setPurchases(purchasesState.userPurchases);
	}, [purchasesState]);

	useEffect(() => {
		setLoans(loansState.userLoans);
	}, [loansState]);

	useEffect(() => {
		const bookWasBorrowed: boolean = loans
			? loans.filter((loan) => loan.BookId === product.id).length > 0
			: false;
		setWasBorrowed(bookWasBorrowed);
	}, [loans]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			id: product.id,
			title: product.title,
			author: product.author,
			image: product.coverImage,
			price: product.price,
			pricePromo: product.pricePromo,
			stock: product.stock,
			typeFormat: product.typeFormat,
			quantity: 1,
		},
		validationSchema,
		onSubmit: (values) => {
			dispatch(addProduct(values, cart.checkout.products));
			dispatch(
				openSnackbar({
					open: true,
					message: 'Submit Success',
					variant: 'alert',
					alert: {
						color: 'success',
					},
					close: false,
				})
			);

			history('/e-commerce/checkout');
		},
	});
	const bookInCart =
		cart.checkout.products.filter((prod) => prod.id === product.id).length > 0;

	const { values, handleSubmit } = formik;

	const addCart = () => {
		const filteredProducts = cart.checkout.products.filter(
			(prod) => prod.id === product.id
		);
		const filteredOnlinePurchases = purchases
			? purchases.filter((purchase) => {
					if (product.typeFormat === 'online')
						return purchase.BookId === product.id;
			  })
			: [];

		if (filteredProducts.length === 0 && filteredOnlinePurchases.length === 0) {
			dispatch(addProduct(values, cart.checkout.products));
			dispatch(
				openSnackbar({
					open: true,
					message: 'Add To Cart Success',
					variant: 'alert',
					alert: {
						color: 'success',
					},
					close: true,
				})
			);
		} else {
			dispatch(
				openSnackbar({
					open: true,
					message:
						filteredOnlinePurchases.length > 0
							? 'Online Book Already Bought!'
							: 'Book Already In Cart',
					variant: 'alert',
					alert: {
						color: 'warning',
					},
					close: true,
				})
			);
		}
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							{product.typeFormat === 'printed' ? (
								<Chip
									size="small"
									label={product.stock ? 'In Stock' : 'Out of Stock'}
									chipcolor={product.stock ? 'success' : 'error'}
									sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
								/>
							) : (
								<Chip
									size="small"
									label="In Stock"
									chipcolor="success"
									sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
								/>
							)}
						</Grid>
						<Grid item xs={12}>
							<Stack direction="row" alignItems="center" spacing={1}>
								<Typography variant="h3">{product.title}</Typography>
								{product.typeFormat === 'online' && (
									<Chip
										size="small"
										label="online"
										chipcolor="primary"
										variant="outlined"
									/>
								)}
							</Stack>
						</Grid>
					</Grid>
				</Stack>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="body2"> by {product.author}</Typography>
			</Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Typography variant="body1">Buy for</Typography>
					<Typography variant="h3" color="primary">
						{subscription ? product.pricePromo : product.price} RON
					</Typography>
					{subscription && (
						<Typography variant="body1" sx={{ textDecoration: 'line-through' }}>
							{product.price} RON
						</Typography>
					)}
				</Stack>
				{product.typeFormat === 'printed' && (
					<Stack
						direction="row"
						alignItems="center"
						spacing={1}
						sx={{ marginTop: '50px' }}
					>
						{subscription ? (
							<Typography variant="h5" color="secondary">
								* Loan for free
							</Typography>
						) : (
							<Typography variant="h5" color="secondary">
								* Loan for{' '}
								{Math.round(product.price - product.price * LOAN_DISCOUNT)} RON
							</Typography>
						)}
					</Stack>
				)}
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
			<Grid item xs={12}>
				<FormikProvider value={formik}>
					<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
						{(product.typeFormat === 'printed' && product.stock) ||
						product.typeFormat === 'online' ? (
							<Grid container spacing={2}>
								<Grid item xs={12} lg={10}>
									<Table>
										<TableBody
											sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } }}
										>
											<TableRow>
												<TableCell></TableCell>
											</TableRow>
											<TableRow>
												<TableCell></TableCell>
											</TableRow>
											<TableRow>
												<TableCell></TableCell>
											</TableRow>
											<TableRow>
												<TableCell></TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</Grid>
								<Divider />
								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={6}>
											<Button
												disabled={bookInCart ? true : false}
												fullWidth
												color="primary"
												variant="contained"
												size="large"
												startIcon={<ShoppingCartTwoToneIcon />}
												onClick={addCart}
											>
												{bookInCart ? 'Book In Cart' : 'Add To Cart'}
											</Button>
										</Grid>
										{product.typeFormat === 'printed' ? (
											<Grid item xs={6}>
												<Button
													disabled={wasBorrowed ? true : false}
													type="submit"
													fullWidth
													color="secondary"
													variant="contained"
													size="large"
													onClick={createLoan}
												>
													Loan
												</Button>
											</Grid>
										) : (
											''
										)}
									</Grid>
								</Grid>
							</Grid>
						) : (
							''
						)}
					</Form>
				</FormikProvider>
			</Grid>
		</Grid>
	);
};

export default ProductInfo;
