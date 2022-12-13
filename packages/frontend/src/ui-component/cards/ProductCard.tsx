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
	Typography,
} from '@mui/material';

// project import
import MainCard from './MainCard';
import SkeletonProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';
import { useDispatch, useSelector } from 'store';
import { addProduct } from 'store/slices/cart';
import { openSnackbar } from 'store/slices/snackbar';
import { ProductCardProps } from 'types/cart';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

const prodImage = require.context('assets/images/e-commerce', true);

// ==============================|| PRODUCT CARD ||============================== //

const ProductCard = ({
	id,
	title,
	image,
	genre,
	author,
	price,
	typeFormat,
}: ProductCardProps) => {
	const dispatch = useDispatch();

	const prodProfile = image && prodImage(`./${image}`);
	// const [productRating] = useState<number | undefined>(rating);
	const cart = useSelector((state) => state.cart);

	const addCart = () => {
		dispatch(
			addProduct(
				{ id, title, image, genre, author, typeFormat, price, quantity: 1 },
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
				close: false,
			})
		);
	};

	const [isLoading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(false);
	}, []);

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
						sx={{ height: 220 }}
						image={prodProfile}
						title={title}
						component={Link}
						to={`/books/${id}`}
					/>
					<CardContent sx={{ p: 2 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography
									component={Link}
									to={`/books/${id}`}
									variant="subtitle1"
									sx={{ textDecoration: 'none' }}
								>
									{title}
								</Typography>
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
										<Grid item>
											<Typography variant="h4">{price} RON</Typography>
										</Grid>
										<Grid item>
											<Typography variant="h6" sx={{ color: 'grey.500' }}>
												{typeFormat}
											</Typography>
										</Grid>
									</Grid>
									<Button
										variant="contained"
										sx={{ minWidth: 0 }}
										onClick={addCart}
									>
										<ShoppingCartTwoToneIcon fontSize="small" />
									</Button>
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
