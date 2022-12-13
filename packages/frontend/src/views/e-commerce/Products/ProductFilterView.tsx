// material-ui
import { useTheme } from '@mui/material/styles';
import {
	Button,
	CardContent,
	Grid,

	Typography,
	useMediaQuery,
} from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';

// assets
import CloseIcon from '@mui/icons-material/Close';
import { ProductsFilter } from 'types/e-commerce';

// ==============================|| PRODUCT GRID - FILTER VIEW ||============================== //

interface ProductFilterViewProps {
	filter: ProductsFilter;
	initialState: ProductsFilter;
	filterIsEqual: (
		initialState: ProductsFilter,
		filter: ProductsFilter
	) => boolean;
	handelFilter: (type: string, params: string, rating?: number) => void;
}

const ProductFilterView = ({
	filter,
	filterIsEqual,
	handelFilter,
	initialState,
}: ProductFilterViewProps) => {
	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

	return (
		<>
			{!filterIsEqual(initialState, filter) && (
				<Grid
					container
					spacing={gridSpacing}
					sx={{ pb: gridSpacing }}
					alignItems="center"
				>
					{!(initialState.search === filter.search) && (
						<Grid item>
							<SubCard content={false}>
								<CardContent sx={{ pb: '12px !important', p: 1.5 }}>
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<Chip
												size={matchDownMD ? 'small' : undefined}
												label={filter.search}
												chipcolor="secondary"
												onDelete={() => handelFilter('search', '')}
												sx={{
													borderRadius: '4px',
													textTransform: 'capitalize',
												}}
											/>
										</Grid>
									</Grid>
								</CardContent>
							</SubCard>
						</Grid>
					)}
					{!(initialState.sort === filter.sort) && (
						<Grid item>
							<SubCard content={false}>
								<CardContent sx={{ pb: '12px !important', p: 1.5 }}>
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<Typography variant="subtitle1">Sort</Typography>
										</Grid>
										<Grid item>
											<Chip
												size={matchDownMD ? 'small' : undefined}
												label={filter.sort}
												chipcolor="secondary"
												onDelete={() => handelFilter('sort', initialState.sort)}
												sx={{
													borderRadius: '4px',
													textTransform: 'capitalize',
												}}
											/>
										</Grid>
									</Grid>
								</CardContent>
							</SubCard>
						</Grid>
					)}
					{!(
						JSON.stringify(initialState.genre) === JSON.stringify(filter.genre)
					) &&
						filter.genre.length > 0 && (
							<Grid item>
								<SubCard content={false}>
									<CardContent sx={{ pb: '12px !important', p: 1.5 }}>
										<Grid container spacing={1} alignItems="center">
											<Grid item>
												<Typography variant="subtitle1">Categories</Typography>
											</Grid>
											{filter.genre.map((item: string, index: number) => (
												<Grid item key={index}>
													<Chip
														size={matchDownMD ? 'small' : undefined}
														label={item}
														onDelete={() => handelFilter('categories', item)}
														chipcolor="secondary"
														sx={{
															borderRadius: '4px',
															textTransform: 'capitalize',
														}}
													/>
												</Grid>
											))}
										</Grid>
									</CardContent>
								</SubCard>
							</Grid>
						)}
					<Grid item>
						<Button
							variant="outlined"
							startIcon={<CloseIcon />}
							color="error"
							onClick={() => handelFilter('reset', '')}
						>
							Clear All
						</Button>
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default ProductFilterView;
