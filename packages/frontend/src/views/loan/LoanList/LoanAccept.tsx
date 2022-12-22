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

const LoanAccept = ({ handleCloseDialog, data }: ProductAddProps) => {
	const defaultValue = {
		isAccepted: data.isAccepted,
	};

	const [formValue, setFormValue] = useState<TSetLoan>(defaultValue);

	const handleUpdate = async () => {
		await loanApi.update(
			data.id,
			{
				isAccepted: formValue.isAccepted,
			},
			{ sync: true }
		);
		handleCloseDialog();
	};
	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...formValue,
			isAccepted: event.target.checked,
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
									checked={formValue.isAccepted || false}
									onChange={handleSwitchChange}
								/>
							}
							label="Approve"
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

export default LoanAccept;
