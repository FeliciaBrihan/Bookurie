// material-ui
import { CardMedia, Grid } from '@mui/material';

// project import
import MainCard from 'ui-component/cards/MainCard';
import { TGetBook } from 'types/book';
import { gridSpacing } from 'store/constant';

// third-party

import useConfig from 'hooks/useConfig';

const prodImage = require.context('assets/images/e-commerce', true);

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({ product }: { product: TGetBook }) => {
	const { borderRadius } = useConfig();
	const initialImage = product.coverImage
		? prodImage(`./${product.coverImage}`)
		: '';

	return (
		<>
			<Grid
				container
				alignItems="center"
				justifyContent="center"
				spacing={gridSpacing}
			>
				<Grid item xs={12}>
					<MainCard content={false} sx={{ m: '0 auto' }}>
						<CardMedia
							component="img"
							image={initialImage}
							sx={{
								borderRadius: `${borderRadius}px`,
								overflow: 'hidden',
							}}
						/>
					</MainCard>
				</Grid>
			</Grid>
		</>
	);
};

export default ProductImages;
