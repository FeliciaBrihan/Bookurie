import * as React from 'react';
import { forwardRef } from 'react';

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
	Typography,
	Stack,
	TextField,
	Divider,
} from '@mui/material';

// assets
import { budgetRequestApi } from 'store/slices/budgetRequest';
import { useDispatch, useSelector } from 'store';
import Chip from 'ui-component/extended/Chip';
import { TEnumBudgetRequestStatus as TStatus } from 'types/budgetRequestStatus';

interface ProductAddProps {
	handleCloseDialog: (e?: any) => void;
	budgetRequestId: number;
	params?: { include: 'own' } | { type: 'approval' };
}

// animation
const Transition = forwardRef((props: SlideProps, ref) => (
	<Slide direction="left" ref={ref} {...props} />
));

const Text = ({
	label,
	value,
}: {
	label: string;
	value: string | number | undefined;
}) => (
	<Stack direction="row" spacing={1}>
		<Typography variant="subtitle1">{label} :</Typography>
		<Typography variant="body2" display="flex" alignItems="center">
			{value}
		</Typography>
	</Stack>
);

const statusColor: { [x: number]: string } = {
	[TStatus.Pending]: 'primary',
	[TStatus.InProgress]: 'warning',
	[TStatus.OnHold]: 'warning',
	[TStatus.Approved]: 'success',
	[TStatus.Rejected]: 'error',
};

const BudgetRequestDetails = ({
	handleCloseDialog,
	budgetRequestId,
}: ProductAddProps) => {
	const dispatch = useDispatch();
	const { request } = useSelector((state) => state.budgetRequest);

	React.useEffect(() => {
		dispatch(budgetRequestApi.getById({ id: budgetRequestId }));
	}, [dispatch]);

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
			<DialogTitle>{request?.title}</DialogTitle>
			<DialogContent>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Text label="ID" value={request?.id} />
					</Grid>
					<Grid item xs={12}>
						<Stack direction="column" spacing={1}>
							<Typography variant="subtitle1">Details :</Typography>
							<TextField
								id="details"
								fullWidth
								disabled
								multiline
								maxRows={10}
								label=""
								defaultValue={request?.details}
							/>
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<Text label="Payment Type" value={request?.PaymentType.name} />
					</Grid>
					<Grid item xs={12}>
						<Text label="Amount" value={request?.price} />
					</Grid>
					<Grid item xs={12}>
						<Text label="Currency" value={request?.Currency.name} />
					</Grid>
					<Grid item xs={12}>
						<Text label="Status" value={request?.BudgetRequestStatus.name} />
					</Grid>
					<Grid item xs={12}>
						<Text label="Created At" value={String(request?.createdAt)} />
					</Grid>
					<Grid item xs={12}>
						<Text label="Last Update" value={String(request?.updatedAt)} />
					</Grid>
					<Divider sx={{ width: '100%', marginTop: '20px' }}>Approvals</Divider>
					<Grid item xs={12}>
						{request &&
							request.approvals.map((approval) => (
								<Stack direction="row" key={approval.User.email} spacing={1}>
									<Typography variant="subtitle1">
										{approval.User.email}
									</Typography>
									<Chip
										label={approval.BudgetRequestStatus.name}
										size="small"
										chipcolor={statusColor[approval.BudgetRequestStatus.id]}
									/>
								</Stack>
							))}
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions
				sx={{
					display: 'flex',
					flexDirection: 'row-reverse',
					justifyContent: 'space-between',
				}}
			>
				<Button variant="text" color="primary" onClick={handleCloseDialog}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default BudgetRequestDetails;
