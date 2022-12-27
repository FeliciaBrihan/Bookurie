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
	Switch,
} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { TGetLoan, TSetLoan } from 'types/loan';
import { loanApi } from 'store/slices/loan';

interface ProductAddProps {
	handleCloseDialog: (e?: any) => void;
	data: TGetLoan;
}

// animation
const Transition = forwardRef((props: SlideProps, ref) => (
	<Slide direction="left" ref={ref} {...props} />
));

const LoanReturn = ({ handleCloseDialog, data }: ProductAddProps) => {
	const defaultValue = {
		isReturned: data.isReturned,
	};

	const [formValue, setFormValue] = useState<TSetLoan>(defaultValue);

	const handleUpdate = async () => {
		await loanApi.returnLoan(data.id, { sync: true });
		handleCloseDialog();
	};
	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...formValue,
			isReturned: event.target.checked,
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
			<DialogTitle>Loan #{data.id}</DialogTitle>
			<DialogContent>
				<Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Switch
									checked={formValue.isReturned || false}
									onChange={handleSwitchChange}
								/>
							}
							label="Return"
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<AnimateButton>
					<Button variant="contained" onClick={handleUpdate}>
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

export default LoanReturn;
