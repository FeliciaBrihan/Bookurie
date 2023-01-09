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
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CameraIcon from '@mui/icons-material/Camera';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BadgeIcon from '@mui/icons-material/Badge';

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
	SubscriptionsIcon,
	CameraIcon,
	ShoppingCartIcon,
	LibraryBooksIcon,
	BadgeIcon,
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
			icon: icons.LibraryBooksIcon,
			breadcrumbs: false,
		},
		{
			id: 'purchases',
			title: <FormattedMessage id="purchases" />,
			type: 'item',
			url: '/purchases',
			icon: icons.ShoppingCartIcon,
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
			icon: icons.BadgeIcon,
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
			id: 'raffles',
			title: <FormattedMessage id="raffles" />,
			type: 'item',
			url: '/raffles',
			icon: icons.CameraIcon,
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
		{
			id: 'subscriptions',
			title: <FormattedMessage id="subscriptions" />,
			type: 'item',
			url: '/subscriptions',
			icon: icons.SubscriptionsIcon,
			breadcrumbs: false,
		},
	],
};

export default appMenu;
