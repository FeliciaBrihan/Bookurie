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
	InputAdornment,
} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { currencyApi } from 'store/slices/currency';
import { PaymentTypeApi } from 'store/slices/paymentType';
import { useDispatch, useSelector } from 'store';

// assets
import PaymentsIcon from '@mui/icons-material/Payments';
import { budgetRequestApi } from 'store/slices/budgetRequest';
import { TSetBudgetRequest } from 'types/budgetRequest';
import { TCurrency } from 'types/currency';
import { TPaymentType } from 'types/paymentType';

interface ProductAddProps {
	handleCloseDialog: (e?: any) => void;
	budgetRequestId: number;
	params?: { include: 'own' } | { type: 'approval' };
}

// animation
const Transition = forwardRef((props: SlideProps, ref) => (
	<Slide direction="left" ref={ref} {...props} />
));

const BudgetRequestEdit = ({
	handleCloseDialog,
	budgetRequestId,
	params,
}: ProductAddProps) => {
	const defaultValue = {
		title: '',
		details: '',
		price: 0,
		currencyId: 0,
		paymentTypeId: 0,
	};

	const dispatch = useDispatch();
	const [currency, setCurrency] = useState<TCurrency[]>([]);
	const [paymentType, setPaymentType] = useState<TPaymentType[]>([]);
	const [formValue, setFormValue] = useState<TSetBudgetRequest>(defaultValue);
	const { currencies } = useSelector((state) => state.currency);
	const { paymentTypes } = useSelector((state) => state.paymentType);
	const { request } = useSelector((state) => state.budgetRequest);

	const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...formValue,
			[event?.target.id]:
				event?.target.id === 'price'
					? Number(event?.target.value)
					: event?.target.value,
		});
	};

	const handleSelectChange =
		(field: keyof typeof formValue) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setFormValue({ ...formValue, [field]: Number(event?.target.value) });
		};

	const handleSave = async () => {
		await budgetRequestApi.update(
			budgetRequestId,
			{ budgetRequest: formValue },
			{ sync: true, params }
		);
		handleCloseDialog();
	};

	React.useEffect(() => {
		dispatch(currencyApi.getAll());
		dispatch(PaymentTypeApi.getAll());
		dispatch(budgetRequestApi.getById({ id: budgetRequestId }));
	}, [dispatch]);
	React.useEffect(() => {
		setCurrency(currencies);
	}, [currencies]);
	React.useEffect(() => {
		setPaymentType(paymentTypes);
	}, [paymentTypes]);
	React.useEffect(() => {
		if (request) {
			setFormValue({
				title: request.title,
				details: request.details,
				price: request.price,
				currencyId: request.Currency.id,
				paymentTypeId: request.PaymentType.id,
			});
		}
	}, [request]);

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
			<DialogTitle>Budget Request #{budgetRequestId}</DialogTitle>
			<DialogContent>
				<Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
					<Grid item xs={12}>
						<TextField
							id="title"
							required
							fullWidth
							label="Enter Title"
							value={formValue.title}
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="details"
							required
							fullWidth
							multiline
							maxRows={15}
							label="Enter Details"
							value={formValue.details}
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="paymentTypeId"
							select
							required
							label="Select Payment Type"
							fullWidth
							value={formValue.paymentTypeId}
							onChange={handleSelectChange('paymentTypeId')}
						>
							{paymentType.map((option) => (
								<MenuItem key={String(option.id)} value={option.id}>
									{option.name}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item md={6} xs={12}>
						<TextField
							required
							label="Enter Amount"
							id="price"
							fullWidth
							type="number"
							value={formValue.price}
							onChange={handleValueChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PaymentsIcon />
									</InputAdornment>
								),
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item md={6} xs={12}>
						<TextField
							id="currencyId"
							select
							required
							label="Select Currency"
							fullWidth
							value={formValue.currencyId}
							onChange={handleSelectChange('currencyId')}
						>
							{currency.map((option) => (
								<MenuItem key={String(option.id)} value={option.id}>
									{option.name}
								</MenuItem>
							))}
						</TextField>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<AnimateButton>
					<Button variant="contained" onClick={handleSave}>
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

export default BudgetRequestEdit;
