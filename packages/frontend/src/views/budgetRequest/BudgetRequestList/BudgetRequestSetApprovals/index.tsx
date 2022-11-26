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
	Box,
	Chip,
	FormControl,
	InputLabel,
	OutlinedInput,
	Select,
	SelectChangeEvent,
} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useDispatch, useSelector } from 'store';

// assets
import { budgetRequestApi } from 'store/slices/budgetRequest';
import { userApi } from 'store/slices/user';
import { TGetUser } from 'types/user';

interface ProductAddProps {
	handleCloseDialog: (e?: any) => void;
	budgetRequestId: number;
	params?: { include: 'own' } | { type: 'approval' };
}

// animation
const Transition = forwardRef((props: SlideProps, ref) => (
	<Slide direction="left" ref={ref} {...props} />
));

const BudgetRequestSetApprovals = ({
	handleCloseDialog,
	budgetRequestId,
	params,
}: ProductAddProps) => {
	const dispatch = useDispatch();
	const [user, setUser] = useState<TGetUser[]>([]);
	const [approvals, setApprovals] = React.useState<string[]>([]);
	const [defaultApprovals, setDefaultApprovals] = React.useState<string[]>([]);
	const { activeUsers } = useSelector((state) => state.user);
	const { request } = useSelector((state) => state.budgetRequest);

	const handleSave = async () => {
		const position: { [x: string]: number } = {};
		approvals.map((email, index) => {
			position[email] = index;
		});
		const approvalsId = user
			.filter((ob) => approvals.includes(ob.email))
			.sort((a, b) => position[a.email] - position[b.email])
			.map((ob) => ob.id);
		await budgetRequestApi.update(
			budgetRequestId,
			{ approvalsId },
			{ sync: true, params }
		);
		handleCloseDialog();
	};

	const handleChange = (event: SelectChangeEvent<typeof approvals>) => {
		const { value } = event.target;
		setApprovals(typeof value === 'string' ? value.split(',') : value);
	};

	React.useEffect(() => {
		dispatch(userApi.getAll({ status: 'active' }));
		dispatch(budgetRequestApi.getById({ id: budgetRequestId }));
	}, [dispatch]);
	React.useEffect(() => {
		setUser(activeUsers);
	}, [activeUsers]);
	React.useEffect(() => {
		if (request) {
			setDefaultApprovals(
				request.approvals.map((approval) => approval.User.email)
			);
			setApprovals(defaultApprovals);
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
						<FormControl fullWidth>
							<InputLabel id="approval-user">Select Approval Users</InputLabel>
							<Select
								labelId="approval-user"
								id="select-approval-user"
								multiple
								value={approvals}
								onChange={handleChange}
								input={
									<OutlinedInput
										id="select-multiple-chip"
										label="Select Approval Users"
									/>
								}
								renderValue={(selected) => (
									<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
										{selected.map((value) => (
											<Chip key={value} label={value} />
										))}
									</Box>
								)}
							>
								{user.map((option) => (
									<MenuItem key={option.email} value={option.email}>
										{option.email}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<AnimateButton>
					<Button
						variant="contained"
						onClick={handleSave}
						disabled={
							JSON.stringify(defaultApprovals) === JSON.stringify(approvals) ||
							approvals.length === 0
						}
					>
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

export default BudgetRequestSetApprovals;
