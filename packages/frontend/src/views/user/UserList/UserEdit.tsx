import * as React from 'react';
import { forwardRef, useState } from 'react';

// material-ui
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Grid,
	MenuItem,
	Slide,
	SlideProps,
	Switch,
	TextField,
} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useDispatch, useSelector } from 'store';

// assets
import { TGetRole } from 'types/roles';
import { roleApi } from 'store/slices/role';
import { TGetUser, TSetUser } from 'types/user';
import { userApi } from 'store/slices/user';

interface ProductAddProps {
	handleCloseDialog: (e?: any) => void;
	data: TGetUser;
}

// animation
const Transition = forwardRef((props: SlideProps, ref) => (
	<Slide direction="left" ref={ref} {...props} />
));

const BudgetRequestEdit = ({ handleCloseDialog, data }: ProductAddProps) => {
	const defaultValue = {
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		roleId: data.MRole?.id,
		active: data.active,
	};

	const dispatch = useDispatch();
	const [role, setRole] = useState<TGetRole[]>([]);
	const [formValue, setFormValue] = useState<TSetUser>(defaultValue);
	const { roles } = useSelector((state) => state.role);

	React.useEffect(() => {
		dispatch(roleApi.getAll());
	}, [dispatch]);
	React.useEffect(() => {
		setRole(roles);
	}, [roles]);

	const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...formValue,
			[event?.target.id]: event?.target.value,
		});
	};

	const handleSelectChange =
		(field: keyof typeof formValue) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setFormValue({ ...formValue, [field]: Number(event?.target.value) });
		};

	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...formValue,
			active: event.target.checked,
		});
	};

	const handleSave = async () => {
		await userApi.update(data.id, formValue, { sync: true });
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
			<DialogTitle>Add New User</DialogTitle>
			<DialogContent>
				<Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
					<Grid item xs={12}>
						<TextField
							id="firstName"
							required
							fullWidth
							defaultValue={formValue.firstName}
							label="Enter First Name"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="lastName"
							required
							fullWidth
							defaultValue={formValue.lastName}
							label="Enter Last Name"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="email"
							required
							fullWidth
							defaultValue={formValue.email}
							label="Enter Email"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="roleId"
							select
							required
							label="Select Role"
							fullWidth
							value={String(formValue.roleId || '')}
							onChange={handleSelectChange('roleId')}
						>
							{role.map((option) => (
								<MenuItem key={String(option.id)} value={option.id}>
									{option.name}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Switch
									checked={formValue.active || false}
									onChange={handleSwitchChange}
								/>
							}
							label="Active"
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

export default BudgetRequestEdit;
