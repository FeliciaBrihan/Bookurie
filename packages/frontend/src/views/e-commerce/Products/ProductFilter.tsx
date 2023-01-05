import { useEffect, useState } from 'react';

// material-ui
import {
	Button,
	CardContent,
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	Skeleton,
	Stack,
	Theme,
	useMediaQuery,
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Accordion from 'ui-component/extended/Accordion';
import { gridSpacing } from 'store/constant';
import { ProductsFilter } from 'types/e-commerce';

// ==============================|| PRODUCT GRID GENDER FILTER ||============================== //

// ==============================|| PRODUCT GRID - CATEGORIES FILTER ||============================== //

const Genre = ({
	genre,
	handelFilter,
}: {
	genre: string[];
	handelFilter: (type: string, params: string) => void;
}) => {
	const [isCategoriesLoading, setCategoriesLoading] = useState(true);
	useEffect(() => {
		setCategoriesLoading(false);
	}, []);

	return (
		<Grid container spacing={1}>
			{isCategoriesLoading ? (
				<Grid item xs={12}>
					<Skeleton variant="rectangular" width="100%" height={96} />
				</Grid>
			) : (
				<>
					<Grid item xs={6}>
						<FormControlLabel
							control={
								<Checkbox checked={genre.some((item) => item === 'fictiune')} />
							}
							onChange={() => handelFilter('genre', 'fictiune')}
							label="Fictiune"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={genre.some((item) => item === 'beletristica')}
								/>
							}
							onChange={() => handelFilter('genre', 'beletristica')}
							label="Beletristica"
						/>
					</Grid>
					<Grid item xs={6}>
						<FormControlLabel
							control={
								<Checkbox
									checked={genre.some(
										(item) => item === 'dezvoltare personala'
									)}
								/>
							}
							onChange={() => handelFilter('genre', 'dezvoltare personala')}
							label="Dezvoltare personala"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={genre.some((item) => item === 'filozofic')}
								/>
							}
							onChange={() => handelFilter('genre', 'filozofic')}
							label="Filozofic"
						/>
					</Grid>
				</>
			)}
		</Grid>
	);
};

const Price = ({
	price,
	handelFilter,
}: {
	price: number;
	handelFilter: (type: string, params: string) => void;
}) => {
	console.log(price);
	const [isPriceLoading, setPriceLoading] = useState(true);
	useEffect(() => {
		setPriceLoading(false);
	}, []);

	return (
		<>
			{isPriceLoading ? (
				<Skeleton variant="rectangular" width="100%" height={172} />
			) : (
				<FormControl component="fieldset">
					<RadioGroup
						row
						aria-label="layout"
						value={price}
						onChange={(e) => handelFilter('price', e.target.value)}
						name="row-radio-buttons-group"
					>
						<Grid container spacing={0.25}>
							<Grid item xs={6}>
								<FormControlLabel
									value={10}
									control={<Radio />}
									label="10 RON"
									sx={{
										'& .MuiSvgIcon-root': { fontSize: 28 },
										'& .MuiFormControlLabel-label': { color: 'grey.900' },
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel
									value={20}
									control={<Radio />}
									label="20 RON"
									sx={{
										'& .MuiSvgIcon-root': { fontSize: 28 },
										'& .MuiFormControlLabel-label': { color: 'grey.900' },
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel
									value={50}
									control={<Radio />}
									label="50 RON"
									sx={{
										'& .MuiSvgIcon-root': { fontSize: 28 },
										'& .MuiFormControlLabel-label': { color: 'grey.900' },
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel
									value={100}
									control={<Radio />}
									label="100 RON"
									sx={{
										'& .MuiSvgIcon-root': { fontSize: 28 },
										'& .MuiFormControlLabel-label': { color: 'grey.900' },
									}}
								/>
							</Grid>
						</Grid>
					</RadioGroup>
				</FormControl>
			)}
		</>
	);
};

// ==============================|| PRODUCT GRID - FILTER ||============================== //

const ProductFilter = ({
	filter,
	handelFilter,
}: {
	filter: ProductsFilter;
	handelFilter: (type: string, params: string, rating?: number) => void;
}) => {
	const matchDownLG = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down('xl')
	);

	const filterData = [
		{
			id: 'genre',
			defaultExpand: true,
			title: 'Categories',
			content: <Genre genre={filter.genre} handelFilter={handelFilter} />,
		},
		{
			id: 'price',
			defaultExpand: true,
			title: 'Price',
			content: <Price price={filter.price!} handelFilter={handelFilter} />,
		},
	];

	return (
		<MainCard
			border={!matchDownLG}
			content={false}
			sx={{ overflow: 'visible' }}
		>
			<CardContent sx={{ p: 1, height: matchDownLG ? '100vh' : 'auto' }}>
				<Grid container spacing={gridSpacing}>
					<Grid item xs={12}>
						<Accordion data={filterData} />
					</Grid>
					<Grid item xs={12} sx={{ m: 1 }}>
						<Stack direction="row" justifyContent="center" alignItems="center">
							<Button
								variant="contained"
								fullWidth
								color="error"
								onClick={() => handelFilter('reset', '')}
							>
								Clear All
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</CardContent>
		</MainCard>
	);
};

export default ProductFilter;
