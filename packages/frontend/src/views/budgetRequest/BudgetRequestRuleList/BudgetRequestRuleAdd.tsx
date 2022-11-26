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
import { userApi } from 'store/slices/user';
import { useDispatch, useSelector } from 'store';

// assets
import PaymentsIcon from '@mui/icons-material/Payments';
import { budgetRequestApi } from 'store/slices/budgetRequest';
import { TSetRule } from 'types/budgetRequest';
import { TGetUser } from 'types/user';
import { DefaultRootStateProps } from 'types';

interface ProductAddProps {
	handleCloseDialog: (e?: any) => void;
}

// animation
const Transition = forwardRef((props: SlideProps, ref) => (
	<Slide direction="left" ref={ref} {...props} />
));

const BudgetRequestRuleAdd = ({ handleCloseDialog }: ProductAddProps) => {
	const defaultValue = {
		userId: 0,
		price: 0,
	};
	const dispatch = useDispatch();
	const [user, setUser] = useState<TGetUser[]>([]);
	const [formValue, setFormValue] = useState<TSetRule>(defaultValue);
	const { activeUsers } = useSelector(
		(state: DefaultRootStateProps) => state.user
	);

	React.useEffect(() => {
		dispatch(userApi.getAll({ status: 'active' }));
	}, [dispatch]);
	React.useEffect(() => {
		setUser(activeUsers);
	}, [activeUsers]);

	const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...formValue,
			[event?.target.id]: Number(event?.target.value),
		});
	};

	const handleSelectChange =
		(field: keyof typeof formValue) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setFormValue({ ...formValue, [field]: Number(event?.target.value) });
		};

	const handleSave = async () => {
		await budgetRequestApi.rule.create(formValue, { sync: true });
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
			<DialogTitle>Add New Rule</DialogTitle>
			<DialogContent>
				<Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
					<Grid item xs={12}>
						<TextField
							id="userId"
							select
							required
							label="Select User"
							fullWidth
							defaultValue=""
							onChange={handleSelectChange('userId')}
						>
							{user.map((option) => (
								<MenuItem key={String(option.id)} value={option.id}>
									{option.email}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item md={6} xs={12}>
						<TextField
							required
							label="Enter Price"
							id="price"
							fullWidth
							type="number"
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

export default BudgetRequestRuleAdd;
