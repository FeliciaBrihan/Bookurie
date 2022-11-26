import * as React from 'react';

// material-ui
import { CardContent, Typography } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

const Dashboard = () => {
	return (
		<MainCard title="Dashboard" content={false}>
			<CardContent>
				<Typography
					variant="subtitle1"
					sx={{ marginBottom: '20px', fontSize: '0.8rem' }}
				>
					Coming soon ..
				</Typography>
			</CardContent>
		</MainCard>
	);
};

export default Dashboard;
