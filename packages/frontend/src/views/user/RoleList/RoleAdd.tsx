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
	Slide,
	SlideProps,
	Stack,
	Switch,
	TextField,
	Typography,
} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { TSetRole } from 'types/roles';
import { roleApi } from 'store/slices/role';
import { TGetAction } from 'types/action';
import { useDispatch, useSelector } from 'store';
import { actionApi } from 'store/slices/action';

interface ProductAddProps {
	handleCloseDialog: (e?: any) => void;
}

// animation
const Transition = forwardRef((props: SlideProps, ref) => (
	<Slide direction="left" ref={ref} {...props} />
));

const defaultValue = {
	name: '',
	allowedAction: [],
};

const RoleAdd = ({ handleCloseDialog }: ProductAddProps) => {
	const dispatch = useDispatch();
	const [action, setAction] = useState<TGetAction[]>([]);
	const [formValue, setFormValue] = useState<TSetRole>(defaultValue);
	const { actions } = useSelector((state) => state.action);

	React.useEffect(() => {
		if (actions.length === 0) dispatch(actionApi.getAll());
	}, [dispatch]);
	React.useEffect(() => {
		setAction(actions);
	}, [actions]);

	const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...formValue,
			name: event?.target.value,
		});
	};

	const handleSave = async () => {
		await roleApi.create(
			{
				name: formValue.name,
				allowedAction: formValue.allowedAction,
			},
			{ sync: true }
		);
		handleCloseDialog();
	};

	const handleSwitchChange =
		(id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
			if (event.target.checked)
				setFormValue({
					...formValue,
					allowedAction: [...formValue.allowedAction, id],
				});
			else
				setFormValue({
					...formValue,
					allowedAction: formValue.allowedAction.filter((el) => el !== id),
				});
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
			<DialogTitle>Add New Role</DialogTitle>
			<DialogContent>
				<Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
					<Grid item xs={12}>
						<TextField
							id="name"
							required
							fullWidth
							label="Enter Role Name"
							onChange={handleValueChange}
						/>
					</Grid>
					<Grid item xs={12}>
						{action.map((el) => (
							<Stack direction="row" key={String(el.id)} spacing={1}>
								<Typography variant="subtitle1">{el.name}</Typography>
								<FormControlLabel
									control={
										<Switch
											checked={formValue.allowedAction.includes(el.id) || false}
											onChange={handleSwitchChange(el.id)}
										/>
									}
									label=""
								/>
							</Stack>
						))}
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

export default RoleAdd;
