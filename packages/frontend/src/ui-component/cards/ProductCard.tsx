import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import {
	Button,
	CardContent,
	CardMedia,
	Grid,
	// Rating,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';

// project import
import MainCard from './MainCard';
import SkeletonProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';
import { useDispatch, useSelector } from 'store';
import { addProduct } from 'store/slices/cart';
import { openSnackbar } from 'store/slices/snackbar';
import { ProductCardProps } from 'types/cart';
import { getUserPurchases } from 'store/slices/purchase';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Chip from 'ui-component/extended/Chip';
import { TGetPurchase } from 'types/purchase';

const prodImage = require.context('assets/images/e-commerce', true);

// ==============================|| PRODUCT CARD ||============================== //

const ProductCard = ({
	id,
	title,
	image,
	genre,
	author,
	price,
	stock,
	typeFormat,
	pricePromo,
}: ProductCardProps) => {
	const dispatch = useDispatch();

	const prodProfile = image && prodImage(`./${image}`);
	// const [productRating] = useState<number | undefined>(rating);
	const cart = useSelector((state) => state.cart);
	const { subscription } = useSelector((state) => state.subscription);
	const [purchases, setPurchases] = useState<TGetPurchase[]>([]);
	const purchasesState = useSelector((state) => state.purchase);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		dispatch(getUserPurchases());
	}, []);

	useEffect(() => {
		if (purchasesState?.userPurchases?.length > 0) {
			setPurchases(purchasesState.userPurchases);
			setLoading(false);
		} else setLoading(false);
	}, [purchasesState]);

	const bookInCart =
		cart.checkout.products.filter((prod) => prod.id === id).length > 0;

	const addCart = () => {
		const filteredProducts = cart.checkout.products.filter(
			(prod) => prod.id === id
		);
		const filteredOnlinePurchases = purchases
			? purchases.filter((purchase) => {
					if (typeFormat === 'online') return purchase.BookId === id;
			  })
			: [];
		if (filteredProducts.length === 0 && filteredOnlinePurchases.length === 0) {
			dispatch(
				addProduct(
					{
						id,
						title,
						image,
						genre,
						author,
						typeFormat,
						stock,
						price,
						pricePromo,
						quantity: 1,
					},
					cart.checkout.products
				)
			);
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
		<>
			{isLoading ? (
				<SkeletonProductPlaceholder />
			) : (
				<MainCard
					content={false}
					boxShadow
					sx={{
						'&:hover': {
							transform: 'scale3d(1.02, 1.02, 1)',
							transition: 'all .4s ease-in-out',
						},
					}}
				>
					<CardMedia
						sx={{
							height: 220,
							opacity: typeFormat === 'printed' && !stock ? 0.3 : 1,
							transition: 'opacity 0.3s ease-in-out',
						}}
						image={prodProfile}
						title={title}
						component={Link}
						to={`/books/${id}`}
					/>
					<CardContent sx={{ p: 2 }}>
						<Grid container spacing={2}>
							<Grid
								item
								xs={12}
								sx={{ display: 'flex', justifyContent: 'space-between' }}
							>
								<Typography
									component={Link}
									to={`/books/${id}`}
									variant="subtitle1"
									sx={{
										textDecoration: 'none',
										fontWeight: 'bold',
										maxWidth: '170px',
										textOverflow: 'ellipsis',
										overflow: 'hidden',
										whiteSpace: 'nowrap',
									}}
								>
									{title}
								</Typography>
								{typeFormat === 'online' ? (
									<Chip
										size="small"
										label="Online"
										chipcolor="primary"
										sx={{
											borderRadius: '4px',
											textTransform: 'capitalize',
										}}
									/>
								) : (
									<Chip
										size="small"
										label="Printed"
										chipcolor="secondary"
										sx={{
											borderRadius: '4px',
											textTransform: 'capitalize',
										}}
									/>
								)}
							</Grid>
							<Grid item xs={12}>
								<Typography
									component={Link}
									to={`/books/${id}`}
									variant="subtitle1"
									sx={{ textDecoration: 'none' }}
								>
									{author}
								</Typography>
							</Grid>

							{genre && (
								<Grid item xs={12}>
									<Typography
										variant="body2"
										sx={{
											overflow: 'hidden',
											height: 45,
										}}
									>
										{genre}
									</Typography>
								</Grid>
							)}
							<Grid item xs={12}>
								<Stack
									direction="row"
									justifyContent="space-between"
									alignItems="center"
								>
									<Grid container spacing={1}>
										<Grid>
											<Grid item>
												<Typography variant="h4">
													{subscription ? pricePromo : price} RON
												</Typography>
											</Grid>
											{subscription && (
												<Grid item>
													<Typography
														variant="h6"
														sx={{
															color: 'grey.500',
															textDecoration: 'line-through',
														}}
													>
														{price} RON
													</Typography>
												</Grid>
											)}
										</Grid>
									</Grid>
									{stock || typeFormat === 'online' ? (
										<Tooltip
											title={bookInCart ? 'Book In Cart' : 'Add To Cart'}
										>
											<span>
												<Button
													disabled={bookInCart ? true : false}
													variant="contained"
													sx={{ minWidth: 0 }}
													onClick={addCart}
												>
													<ShoppingCartTwoToneIcon fontSize="small" />
												</Button>
											</span>
										</Tooltip>
									) : (
										<Chip
											size="small"
											label={
												typeFormat === 'printed' ? `Out of stock` : 'Online'
											}
											chipcolor={typeFormat === 'printed' ? 'error' : 'primary'}
											sx={{
												borderRadius: '4px',
												textTransform: 'capitalize',
											}}
										/>
									)}
								</Stack>
							</Grid>
						</Grid>
					</CardContent>
				</MainCard>
			)}
		</>
	);
};

export default ProductCard;
