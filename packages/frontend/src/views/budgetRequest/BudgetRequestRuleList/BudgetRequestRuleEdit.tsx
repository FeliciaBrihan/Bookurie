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
import { TGetRule, TSetRule } from 'types/budgetRequest';
import { TGetUser } from 'types/user';
import { DefaultRootStateProps } from 'types';

interface ProductAddProps {
	handleCloseDialog: (e?: any) => void;
	data: TGetRule;
}

// animation
const Transition = forwardRef((props: SlideProps, ref) => (
	<Slide direction="left" ref={ref} {...props} />
));

const BudgetRequestRuleEdit = ({
	handleCloseDialog,
	data,
}: ProductAddProps) => {
	const defaultValue = {
		userId: data.User.id,
		price: data.price,
	};
	const dispatch = useDispatch();
	const [user, setUser] = useState<TGetUser[]>([]);
	const [formValue, setFormValue] = useState<TSetRule>(defaultValue);
	const { users } = useSelector((state: DefaultRootStateProps) => state.user);

	React.useEffect(() => {
		dispatch(userApi.getAll({ status: 'all' }));
	}, [dispatch]);
	React.useEffect(() => {
		setUser(users);
	}, [users]);

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
		await budgetRequestApi.rule.update(data.id, formValue, { sync: true });
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
			<DialogTitle>Budget Request #{data.id}</DialogTitle>
			<DialogContent>
				<Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
					<Grid item xs={12}>
						<TextField
							id="userId"
							select
							required
							label="Select User"
							fullWidth
							defaultValue={formValue.userId}
							onChange={handleSelectChange('userId')}
						>
							{user
								.filter((option) => option.active || option.id === data.User.id)
								.map((option) => (
									<MenuItem
										key={String(option.id)}
										disabled={!option.active}
										value={option.id}
									>
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
							defaultValue={formValue.price}
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

export default BudgetRequestRuleEdit;
