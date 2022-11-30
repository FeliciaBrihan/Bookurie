// third-party
import { FormattedMessage } from 'react-intl';

// assets
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import { IconDashboard } from '@tabler/icons';
import { NavItemType } from 'types';

// constant
const icons = {
	IconDashboard,
	SupervisorAccountIcon,
	CurrencyExchangeIcon,
	SettingsIcon,
	DashboardIcon,
	BookIcon,
	LibraryBooksTwoToneIcon,
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const appMenu: NavItemType = {
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
			id: 'books',
			title: <FormattedMessage id="books" />,
			type: 'item',
			url: '/books',
			icon: icons.LibraryBooksTwoToneIcon,
			breadcrumbs: false,
		},
		{
			id: 'loans',
			title: <FormattedMessage id="loans" />,
			type: 'item',
			url: '/loans',
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
		{
			id: 'actions',
			title: <FormattedMessage id="actions" />,
			type: 'item',
			url: '/actions',
			icon: icons.SettingsIcon,
			breadcrumbs: false,
		},
		{
			id: 'permissions',
			title: <FormattedMessage id="permissions" />,
			type: 'item',
			url: '/permissions',
			icon: icons.SettingsIcon,
			breadcrumbs: false,
		},
	],
};

export default appMenu;
