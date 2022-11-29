import * as React from 'react';
import { forwardRef, useState } from 'react';

// material-ui
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Slide,
	SlideProps,
	TextField,
} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { TSetBook } from 'types/book';
import { bookApi } from 'store/slices/book';

interface ProductAddProps {
	handleCloseDialog: (e?: any) => void;
}

// animation
const Transition = forwardRef((props: SlideProps, ref) => (
	<Slide direction="left" ref={ref} {...props} />
));

const defaultValue = {
	title: '',
	author: '',
	publishingHouse: '',
	publishedYear: undefined,
	coverImage: '',
	genre: '',
	description: '',
	pages: undefined,
	typeFormat: '',
	price: undefined,
	stock: undefined,
};

const BookAdd = ({ handleCloseDialog }: ProductAddProps) => {
	const [formValue, setFormValue] = useState<TSetBook>(defaultValue);

	const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...formValue,
			[event?.target.id]: event?.target.value,
		});
	};

	const handleSave = async () => {
		await bookApi.create(
			{
				title: formValue.title,
				author: formValue.author,
				publishingHouse: formValue.publishingHouse,
				publishedYear: formValue.publishedYear,
				coverImage: formValue.coverImage,
				genre: formValue.genre,
				description: formValue.description,
				pages: formValue.pages,
				typeFormat: formValue.typeFormat,
				price: formValue.price,
				stock: formValue.stock,
			},
			{ sync: true }
		);
		handleCloseDialog();
	};

	return (
		<Dialog
			open
			TransitionComponent={Transition}
			keepMounted
			onClose={handleCloseDialog}
			sx={{
				'&>div:nth-of-type(3)': {
					justifyContent: 'flex-end',
					'&>div': {
						m: 0,
						borderRadius: '0px',
						maxWidth: 450,
						maxHeight: '100%',
					},
				},
			}}
		>
			<DialogTitle>Add New Book</DialogTitle>
			<DialogContent>
				<Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
					<Grid item xs={12}>
						<TextField
							id="title"
							required
							fullWidth
							label="Enter Book Title"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="author"
							required
							fullWidth
							label="Enter Book Author"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="publishingHouse"
							required
							fullWidth
							label="Enter Book Publishing House"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="publishedYear"
							required
							fullWidth
							label="Enter Book Published Year"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="genre"
							required
							fullWidth
							label="Enter Book Genre"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="description"
							required
							fullWidth
							label="Enter Book Description"
							onChange={handleValueChange}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							id="pages"
							required
							fullWidth
							label="Enter Book Pages Number"
							onChange={handleValueChange}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							id="title"
							required
							fullWidth
							label="Enter Book Type Format"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="price"
							required
							fullWidth
							label="Enter Book Price"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="stock"
							required
							fullWidth
							label="Enter Book Stock"
							onChange={handleValueChange}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<AnimateButton>
					<Button variant="contained" onClick={handleSave}>
						Create
					</Button>
				</AnimateButton>
				<Button variant="text" color="error" onClick={handleCloseDialog}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default BookAdd;
