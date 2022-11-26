import * as React from 'react';
import { forwardRef } from 'react';

// material-ui
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	Slide,
	SlideProps,
	Typography,
	Stack,
	Button,
	DialogActions,
} from '@mui/material';

// assets
import { TGetRule } from 'types/budgetRequest';

interface ProductAddProps {
	handleCloseDialog: (e?: any) => void;
	data: TGetRule;
}

// animation
const Transition = forwardRef((props: SlideProps, ref) => (
	<Slide direction="left" ref={ref} {...props} />
));

const Text = ({ label, value }: { label: string; value: string | number }) => (
	<Stack direction="row" spacing={1}>
		<Typography variant="subtitle1">{label} :</Typography>
		<Typography variant="body2" display="flex" alignItems="center">
			{value}
		</Typography>
	</Stack>
);

const BudgetRequestRuleDetails = ({
	handleCloseDialog,
	data,
}: ProductAddProps) => {
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
			<DialogTitle>{data.User.email}</DialogTitle>
			<DialogContent>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Text label="ID" value={data.id} />
					</Grid>
					<Grid item xs={12}>
						<Text label="Price" value={data.price} />
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-end',
				}}
			>
				<Button variant="text" color="primary" onClick={handleCloseDialog}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default BudgetRequestRuleDetails;
