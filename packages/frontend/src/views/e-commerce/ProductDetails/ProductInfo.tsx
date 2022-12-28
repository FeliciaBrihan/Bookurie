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
import { create } from 'store/slices/loan';
import { getProduct } from 'store/slices/book';

// assets
('@mui/icons-material/StarBorderTwoTone');
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { LOAN_DISCOUNT } from 'constant';

const validationSchema = yup.object({
	color: yup.string().required('Color selection is required'),
	size: yup.number().required('Size selection is required.'),
});

// ==============================|| COLORS OPTION ||============================== //

// const Increment = (props: string | FieldHookConfig<any>) => {
// 	const [field, , helpers] = useField(props);

// 	const { value } = field;
// 	const { setValue } = helpers;
// 	return (
// 		<ButtonGroup
// 			size="large"
// 			variant="text"
// 			color="inherit"
// 			sx={{ border: '1px solid', borderColor: 'grey.400' }}
// 		>
// 			<Button
// 				key="three"
// 				disabled={value <= 1}
// 				onClick={() => setValue(value - 1)}
// 				sx={{ pr: 0.75, pl: 0.75, minWidth: '0px !important' }}
// 			>
// 				<RemoveIcon fontSize="inherit" />
// 			</Button>
// 			<Button key="two" sx={{ pl: 0.5, pr: 0.5 }}>
// 				{value}
// 			</Button>
// 			<Button
// 				key="one"
// 				onClick={() => setValue(value + 1)}
// 				sx={{ pl: 0.75, pr: 0.75, minWidth: '0px !important' }}
// 			>
// 				<AddIcon fontSize="inherit" />
// 			</Button>
// 		</ButtonGroup>
// 	);
// };

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ product }: { product: TGetBook }) => {
	const dispatch = useDispatch();
	const history = useNavigate();

	const createLoan = async () => {
		await dispatch(create(product.id));
		await dispatch(getProduct(String(product.id)));
	};

	const cart = useSelector((state) => state.cart);
	const { subscription } = useSelector((state) => state.subscription);
	const discount = subscription ? subscription.everyBookDiscount / 100 : 0;

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			id: product.id,
			title: product.title,
			author: product.author,
			image: product.coverImage,
			price: product.price,
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

	const { values, handleSubmit } = formik;

	const addCart = () => {
		dispatch(addProduct(values, cart.checkout.products));
		dispatch(
			openSnackbar({
				open: true,
				message: 'Add To Cart Success',
				variant: 'alert',
				alert: {
					color: 'success',
				},
				close: false,
			})
		);
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
				{subscription && (
					<>
						<Stack direction="row" alignItems="center" spacing={1}>
							<Typography variant="body1">Buy for</Typography>
							<Typography variant="h3" color="primary">
								{Math.round(product.price - product.price * discount)} RON
							</Typography>
							<Typography
								variant="body1"
								sx={{ textDecoration: 'line-through' }}
							>
								{product.price} RON
							</Typography>
						</Stack>
						<Stack
							direction="row"
							alignItems="center"
							spacing={1}
							sx={{ marginTop: '50px' }}
						>
							<Typography variant="h5" color="secondary">
								* Loan for free
							</Typography>
						</Stack>
					</>
				)}
				{!subscription && (
					<>
						<Stack direction="row" alignItems="center" spacing={1}>
							<Typography variant="h2" color="primary">
								{product.price} RON
							</Typography>
						</Stack>
						<Stack
							direction="row"
							alignItems="center"
							spacing={1}
							sx={{ marginTop: '50px' }}
						>
							<Typography variant="h5" color="secondary">
								* Loan for{' '}
								{Math.round(product.price - product.price * LOAN_DISCOUNT)} RON
							</Typography>
						</Stack>
					</>
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
												fullWidth
												color="primary"
												variant="contained"
												size="large"
												startIcon={<ShoppingCartTwoToneIcon />}
												onClick={addCart}
											>
												Add to Cart
											</Button>
										</Grid>
										{product.typeFormat === 'printed' ? (
											<Grid item xs={6}>
												<Button
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
