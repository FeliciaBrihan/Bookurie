import { useState, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Tab, Tabs } from '@mui/material';

// project imports
import AllRequestsList from './BudgetRequestAllRequestsList';
import MyRequestList from './BudgetRequestMyRequestList';
import MyApprovalList from './BudgetRequestMyApprovalList';
import RuleList from './BudgetRequestRuleList';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';

// types
import { TabsProps } from 'types';

// tabs panel
function TabPanel({ children, value, index, ...other }: TabsProps) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 0 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

// tabs option
const tabsOption = [
	{
		label: 'All Requests',
		icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
		url: 'all-requests',
	},
	{
		label: 'My Requests',
		icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
		url: 'my-requests',
	},
	{
		label: 'My Approvals',
		icon: <LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
		url: 'my-approvals',
	},
	{
		label: 'Rules',
		icon: <LockTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
		url: 'rules',
	},
];

// ==============================|| PROFILE 1 ||============================== //

const Profile1 = () => {
	const theme = useTheme();

	const defaultValue = {
		'#all-requests': 0,
		'#my-requests': 1,
		'#my-approvals': 2,
		'#rules': 3,
	};

	const [value, setValue] = useState<number>(
		defaultValue[window.location.hash as keyof typeof defaultValue] || 0
	);
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<MainCard>
			<Grid container spacing={gridSpacing}>
				<Grid item xs={12}>
					<Tabs
						value={value}
						indicatorColor="primary"
						textColor="primary"
						onChange={handleChange}
						aria-label="simple tabs example"
						variant="scrollable"
						sx={{
							mb: 3,
							'& a': {
								minHeight: 'auto',
								minWidth: 10,
								py: 1.5,
								px: 1,
								mr: 2.25,
								color: theme.palette.grey[600],
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
							},
							'& a.Mui-selected': {
								color: theme.palette.primary.main,
							},
							'& .MuiTabs-indicator': {
								bottom: 2,
							},
							'& a > svg': {
								marginBottom: '0px !important',
								mr: 1.25,
							},
						}}
					>
						{tabsOption.map((tab, index) => (
							<Tab
								key={index}
								component={Link}
								to={'#' + tab.url}
								icon={tab.icon}
								label={tab.label}
								{...a11yProps(index)}
							/>
						))}
					</Tabs>
					<TabPanel value={value} index={0}>
						<AllRequestsList />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<MyRequestList />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<MyApprovalList />
					</TabPanel>
					<TabPanel value={value} index={3}>
						<RuleList />
					</TabPanel>
				</Grid>
			</Grid>
		</MainCard>
	);
};

export default Profile1;
