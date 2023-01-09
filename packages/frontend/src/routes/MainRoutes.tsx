import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Products = Loadable(lazy(() => import('views/e-commerce/Products')));
const ProductDetails = Loadable(
	lazy(() => import('views/e-commerce/ProductDetails/'))
);
const ProductCheckout = Loadable(
	lazy(() => import('views/e-commerce/Checkout'))
);

const UserList = Loadable(lazy(() => import('views/user/UserList')));
const RoleList = Loadable(lazy(() => import('views/user/RoleList')));
const ActionList = Loadable(lazy(() => import('views/user/ActionList')));
const LoanList = Loadable(lazy(() => import('views/loan/LoanList')));
const PurchaseList = Loadable(
	lazy(() => import('views/purchase/PurchaseList'))
);
const BookList = Loadable(lazy(() => import('views/e-commerce/ProductList')));
const RaffleList = Loadable(lazy(() => import('views/raffle/RaffleList')));
const PrizeList = Loadable(lazy(() => import('views/prize')));
const SubscriptionList = Loadable(
	lazy(() => import('views/subscription/SubscriptionList'))
);
const Account = Loadable(lazy(() => import('views/account')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	element: (
		<AuthGuard>
			<MainLayout />
		</AuthGuard>
	),
	children: [
		{
			path: '/dashboard',
			element: <Products />,
		},
		{
			path: '/e-commerce/checkout',
			element: <ProductCheckout />,
		},
		{
			path: '/books',
			element: <BookList />,
		},
		{
			path: '/books/:id',
			element: <ProductDetails />,
		},
		{
			path: '/loans',
			element: <LoanList />,
		},
		{
			path: '/purchases',
			element: <PurchaseList />,
		},
		{
			path: '/users',
			element: <UserList />,
		},
		{
			path: '/roles',
			element: <RoleList />,
		},
		{
			path: '/actions',
			element: <ActionList />,
		},
		{
			path: '/raffles',
			element: <RaffleList />,
		},
		{
			path: '/prize',
			element: <PrizeList />,
		},
		{
			path: '/subscriptions',
			element: <SubscriptionList />,
		},
		{
			path: '/account',
			element: <Account />,
		},
	],
};

export default MainRoutes;
