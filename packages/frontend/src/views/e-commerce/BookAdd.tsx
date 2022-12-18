import { forwardRef, useEffect, useRef, useState } from 'react';

// material-ui
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	InputLabel,
	MenuItem,
	Slide,
	SlideProps,
	TextField,
	Typography,
} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { bookApi } from 'store/slices/book';
import { TSetBook } from 'types/book';
import axios from 'axios';

// book type options
const types = [
	{
		value: 'online',
	},
	{
		value: 'printed',
	},
];

// animation
const Transition = forwardRef((props: SlideProps, ref) => (
	<Slide direction="left" ref={ref} {...props} />
));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

// ==============================|| PRODUCT ADD DIALOG ||============================== //

interface ProductAddProps {
	open: boolean;
	handleCloseDialog: () => void;
}
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

const BookAdd = ({ open, handleCloseDialog }: ProductAddProps) => {
	const [formValue, setFormValue] = useState<TSetBook>(defaultValue);
	const [file, setFile] = useState<File | undefined>();

	// handle category change dropdown
	const [typeFormat, setTypeFormat] = useState('printed');
	const handleSelectChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
	) => {
		event?.target.value && setTypeFormat(event?.target.value);
	};
	// set image upload progress
	const [progress, setProgress] = useState(0);
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const progressRef = useRef(() => {});
	useEffect(() => {
		progressRef.current = () => {
			if (progress > 100) {
				setProgress(0);
			} else {
				const diff = Math.random() * 10;
				setProgress(progress + diff);
			}
		};
	});

	useEffect(() => {
		const timer = setInterval(() => {
			progressRef.current();
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, []);

	const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...formValue,
			[event?.target.id]: event?.target.value,
		});
	};

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log('name', event.target.files![0].name);
		setFormValue({
			...formValue,
			coverImage: event.target.files![0].name,
		});
		setFile(event.target.files![0]);
	};

	const uploadFile = async () => {
		const formData: any = new FormData();
		formData.append('file', file);

		try {
			const result = await axios.post(
				'http://localhost:5000/upload',
				formData,
				{
					headers: { 'Content-Type': 'multipart/form-data' },
				}
			);
			console.log(result.data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSave = async () => {
		await uploadFile();
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
				typeFormat: typeFormat,
				price: formValue.price,
				stock: formValue.stock,
			},
			{ sync: true }
		);
		handleCloseDialog();
	};

	return (
		<Dialog
			open={open}
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
			{open && (
				<>
					<DialogTitle>Add Book</DialogTitle>
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
							<Grid item xs={6}>
								<TextField
									id="typeFormat"
									required
									select
									label="Select Book Format"
									value={typeFormat}
									fullWidth
									onChange={handleSelectChange}
								>
									{types.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.value}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="price"
									required
									fullWidth
									label="Price"
									onChange={handleValueChange}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="stock"
									type="number"
									required
									fullWidth
									label="Enter Book Stock"
									onChange={handleValueChange}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="pages"
									type="number"
									required
									fullWidth
									label="Enter Book Pages"
									onChange={handleValueChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="genre"
									fullWidth
									label="Enter Book Genre"
									onChange={handleValueChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="description"
									fullWidth
									multiline
									rows={3}
									label="Enter Book Description"
									onChange={handleValueChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="publishedYear"
									fullWidth
									label="Enter Book Published Year"
									onChange={handleValueChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="publishingHouse"
									fullWidth
									label="Enter Book Publishing House"
									onChange={handleValueChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<Typography variant="subtitle1" align="left">
											Book Image
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<div>
											<InputLabel>
												<input
													id="coverImage"
													type="file"
													onChange={handleImageUpload}
												/>
											</InputLabel>
										</div>
									</Grid>
								</Grid>
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
				</>
			)}
		</Dialog>
	);
};

export default BookAdd;
