// third-party
import { FormattedMessage } from 'react-intl';

// assets
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { IconDashboard } from '@tabler/icons';
import { NavItemType } from 'types';

// constant
const icons = {
	IconDashboard,
	SupervisorAccountIcon,
	CurrencyExchangeIcon,
	SettingsIcon,
	DashboardIcon
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const budgetRequest: NavItemType = {
	id: 'app-menu',
	title: <FormattedMessage id="app-menu" />,
	icon: icons.IconDashboard,
	type: 'group',
	children: [
		{
			id: 'dashboard',
			title: <FormattedMessage id="dashboard" />,
			type: 'item',
			url: '/dashboard',
			icon: icons.DashboardIcon,
			breadcrumbs: false,
		},
		{
			id: 'budget-request',
			title: <FormattedMessage id="budget-request" />,
			type: 'item',
			url: '/budget-request',
			icon: icons.CurrencyExchangeIcon,
			breadcrumbs: false,
		},
		{
			id: 'users',
			title: <FormattedMessage id="users" />,
			type: 'item',
			url: '/users',
			icon: icons.SupervisorAccountIcon,
			breadcrumbs: false,
		},
		{
			id: 'roles',
			title: <FormattedMessage id="roles" />,
			type: 'item',
			url: '/roles',
			icon: icons.SettingsIcon,
			breadcrumbs: false,
		},
	],
};

export default budgetRequest;
