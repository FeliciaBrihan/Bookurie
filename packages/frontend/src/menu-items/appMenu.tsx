// third-party
import { FormattedMessage } from 'react-intl';

// assets
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
// import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import { IconDashboard } from '@tabler/icons';
import CollectionsIcon from '@mui/icons-material/Collections';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import { NavItemType } from 'types';
// import CoPresentIcon from '@mui/icons-material/CoPresent';
// import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

// constant
const icons = {
	IconDashboard,
	SupervisorAccountIcon,
	// CurrencyExchangeIcon,
	SettingsIcon,
	DashboardIcon,
	BookIcon,
	// LibraryBooksTwoToneIcon,
	// CoPresentIcon,
	EngineeringTwoToneIcon,
	AutoStoriesTwoToneIcon,
	HowToRegIcon,
	ShoppingBagIcon,
	CollectionsIcon,
	ShuffleOnIcon,
	CardGiftcardIcon,
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
			icon: icons.AutoStoriesTwoToneIcon,
			breadcrumbs: false,
		},
		{
			id: 'loans',
			title: <FormattedMessage id="loans" />,
			type: 'item',
			url: '/loans',
			icon: icons.CollectionsIcon,
			breadcrumbs: false,
		},
		{
			id: 'purchases',
			title: <FormattedMessage id="purchases" />,
			type: 'item',
			url: '/purchases',
			icon: icons.ShoppingBagIcon,
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
			icon: icons.EngineeringTwoToneIcon,
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
			icon: icons.HowToRegIcon,
			breadcrumbs: false,
		},
		{
			id: 'raffles',
			title: <FormattedMessage id="raffles" />,
			type: 'item',
			url: '/raffles',
			icon: icons.ShuffleOnIcon,
			breadcrumbs: false,
		},
		{
			id: 'prize',
			title: <FormattedMessage id="prize" />,
			type: 'item',
			url: '/prize',
			icon: icons.CardGiftcardIcon,
			breadcrumbs: false,
		},
	],
};

export default appMenu;
