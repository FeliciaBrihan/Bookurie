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
	MenuItem,
	Slide,
	SlideProps,
	TextField,
} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { TGetBook, TSetBook } from 'types/book';
import { bookApi } from 'store/slices/book';

interface ProductAddProps {
	handleCloseDialog: (e?: any) => void;
	data: TGetBook;
}

// animation
const Transition = forwardRef((props: SlideProps, ref) => (
	<Slide direction="left" ref={ref} {...props} />
));

// type format options
const type = [
	{
		value: 'printed',
	},
	{
		value: 'online',
	},
];

const BookEdit = ({ handleCloseDialog, data }: ProductAddProps) => {
	const [currentType, setCurrentType] = useState(data.typeFormat);
	const defaultValue = {
		title: data.title,
		author: data.author,
		publishingHouse: data.publishingHouse,
		publishedYear: data.publishedYear,
		coverImage: data.coverImage,
		genre: data.genre,
		description: data.description,
		pages: data.pages,
		typeFormat: data.typeFormat,
		price: data.price,
		stock: data.stock,
	};

	const [formValue, setFormValue] = useState<TSetBook>(defaultValue);

	const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...formValue,

			[event?.target.id]: event?.target.value,
		});
	};
	const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentType(event.target.value);
	};

	const handleUpdate = async () => {
		await bookApi.update(
			data.id,
			{
				title: formValue.title,
				author: formValue.author,
				publishingHouse: formValue.publishingHouse,
				publishedYear: formValue.publishedYear,
				coverImage: formValue.coverImage,
				genre: formValue.genre,
				description: formValue.description,
				pages: formValue.pages,
				typeFormat: currentType,
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
			<DialogTitle>Book #{data.id}</DialogTitle>
			<DialogContent>
				<Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
					<Grid item xs={12}>
						<TextField
							id="title"
							required
							fullWidth
							defaultValue={formValue.title}
							label="Enter Book Title"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="author"
							required
							fullWidth
							defaultValue={formValue.author}
							label="Enter Book Author"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="price"
							required
							fullWidth
							defaultValue={formValue.price}
							label="Enter Book Price"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="typeFormat"
							select
							label="Select Book Format"
							defaultValue={formValue.typeFormat}
							fullWidth
							onChange={handleSelectChange}
						>
							{type.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.value}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="stock"
							required
							fullWidth
							defaultValue={formValue.stock}
							label="Enter Book Stock"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="publishedYear"
							required
							fullWidth
							defaultValue={formValue.publishedYear}
							label="Enter Book Published Year"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="publishingHouse"
							required
							fullWidth
							defaultValue={formValue.publishingHouse}
							label="Enter Book Publishing House"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="genre"
							required
							fullWidth
							defaultValue={formValue.genre}
							label="Enter Book Genre"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="image"
							required
							fullWidth
							defaultValue={formValue.coverImage}
							label="Enter Book Image Name"
							onChange={handleValueChange}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<AnimateButton>
					<Button variant="contained" onClick={handleUpdate}>
						Save
					</Button>
				</AnimateButton>
				<Button variant="text" color="error" onClick={handleCloseDialog}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default BookEdit;
