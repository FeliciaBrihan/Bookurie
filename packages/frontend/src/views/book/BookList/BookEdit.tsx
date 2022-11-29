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

const BookEdit = ({ handleCloseDialog, data }: ProductAddProps) => {
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
			<DialogTitle>Role #{data.id}</DialogTitle>
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
