import { useState, useEffect } from 'react';

// material-ui
import {
	Button,
	Dialog,
	DialogActions,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from 'store';
import { TGetBook } from 'types/book';
import { bookApi } from 'store/slices/book';

// assets
import { TGetPurchase } from 'types/purchase';

interface ProductAddProps {
	handleCloseDialog: (e?: any) => void;
	data: TGetPurchase[];
}

const PurchaseDetails = ({ handleCloseDialog, data }: ProductAddProps) => {
	const dispatch = useDispatch();
	const [books, setBooks] = useState<TGetBook[]>([]);
	const bookState = useSelector((state) => state.book);

	useEffect(() => {
		dispatch(bookApi.getAll());
	}, []);

	useEffect(() => {
		setBooks(bookState.books);
	}, [bookState]);

	const getBookTitle = (id: number) => {
		if (books.length > 0)
			return books.filter((book) => book.id === id)[0].title;
	};

	return (
		<Dialog open={true} onClose={handleCloseDialog}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Order ID</TableCell>
						<TableCell>Date</TableCell>
						<TableCell>User ID</TableCell>
						<TableCell>Book ID</TableCell>
						<TableCell>Book Title</TableCell>
						<TableCell sx={{ width: '100px' }}>Price</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((item, index) => (
						<TableRow key={index}>
							<TableCell>{item.orderId}</TableCell>
							<TableCell>
								{new Intl.DateTimeFormat('en-GB', {
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
									hour: '2-digit',
									minute: '2-digit',
									second: '2-digit',
								}).format(new Date(item.createdAt))}
							</TableCell>
							<TableCell>{item.UserId}</TableCell>
							<TableCell>{item.BookId}</TableCell>
							<TableCell>{getBookTitle(item.BookId)}</TableCell>
							<TableCell>{item.price} RON</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<DialogActions>
				<Button variant="text" color="primary" onClick={handleCloseDialog}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PurchaseDetails;
